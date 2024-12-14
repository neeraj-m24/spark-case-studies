import org.apache.spark.sql.{Dataset, Row, SaveMode, SparkSession}
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._
import org.apache.spark.sql.streaming.Trigger

import java.util.concurrent.TimeUnit

object MovieDataProcessor {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder()
      .appName("RatingsProcessorWithMetadata")
      .config("spark.hadoop.fs.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem")
      .config("spark.hadoop.fs.AbstractFileSystem.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFS")
      .config("spark.hadoop.google.cloud.auth.service.account.enable", "true")
      .config("spark.hadoop.google.cloud.auth.service.account.json.keyfile", "/Users/neerajkumarmilan/spark-gcs-key.json")
      .master("local[*]")
      .getOrCreate()

    spark.sparkContext.setLogLevel("WARN")

    // Schema definition for incoming JSON ratings data
    val ratingsSchema = new StructType()
      .add("userId", IntegerType)
      .add("movieId", IntegerType)
      .add("rating", DoubleType)
      .add("timestamp", LongType)

    // Read streaming data from Kafka topic
    val incomingStreamDF = spark.readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "localhost:9092")
      .option("subscribe", "movie-ratings")
//      .option("subscribe", "ratings-topic")movie-ratings
      .option("startingOffsets", "latest")
      .load()

    // Parse the JSON data from Kafka topic
    val parsedRatingsDF = incomingStreamDF.selectExpr("CAST(value AS STRING) as jsonPayload")
      .select(from_json(col("jsonPayload"), ratingsSchema).as("parsed"))
      .select("parsed.*")

    // Output paths
    val enrichedDataPath = "gs://spark_learning_1/final-project/case-study-2/output/rating-enrichment/"
    val metricsBasePath = "gs://spark_learning_1/final-project/case-study-2/output/aggregated-metrics/"

    // Metric output paths
    val movieMetricsPath = s"$metricsBasePath/movie-metrics"
    val genreMetricsPath = s"$metricsBasePath/genre-metrics"
    val demographicMetricsPath = s"$metricsBasePath/demographics-metrics"

    parsedRatingsDF.writeStream.foreachBatch { (batchDF: Dataset[Row], batchId: Long) =>

        // Load supporting datasets
        val moviesMetadataDF = spark.read
          .option("header", "true")
          .csv("gs://spark_learning_1/final-project/case-study-2/datasets/movies.csv")
          .selectExpr("CAST(movieId AS INT) AS movieId", "title", "genres")
          .cache()

        val usersMetadataDF = spark.read
          .option("header", "true")
          .csv("gs://spark_learning_1/final-project/case-study-2/datasets/users.csv")
          .selectExpr("CAST(userId AS INT) AS userId", "firstName", "lastName", "age", "location", "gender")
          .cache()

        // Filter and validate ratings data
        val cleanRatingsDF = batchDF.filter(col("rating").between(0.5, 5.0))

        // Join with movie metadata
        val ratingsWithMoviesDF = cleanRatingsDF.join(moviesMetadataDF, "movieId")

        // Join with user metadata
        val enrichedRatingsDF = ratingsWithMoviesDF.join(usersMetadataDF, "userId")

        println("Successfully combined ratings with movie and user metadata")

        // Add a date column for partitioning
        val finalEnrichedDF = enrichedRatingsDF.withColumn("partitionDate", to_date(from_unixtime(col("timestamp") / 1000)))
        finalEnrichedDF.show(10, truncate = false)

        // Save enriched data
        finalEnrichedDF.write
          .mode(SaveMode.Append)
          .partitionBy("partitionDate")
          .parquet(enrichedDataPath)
        println("New enriched data written to cloud storage")

        // Aggregation by movie
        val movieMetricsDF = finalEnrichedDF.groupBy("movieId", "title", "genres")
          .agg(
            round(avg("rating"), 2).as("avgRating"),
            count("rating").as("ratingCount")
          )
        movieMetricsDF.show(10, truncate = false)
        movieMetricsDF.limit(10).write.mode("overwrite").parquet(movieMetricsPath)
        println("Movie metrics updated")

        // Aggregation by genre
        val genreMetricsDF = finalEnrichedDF.withColumn("genre", explode(split(col("genres"), "\\|")))
          .groupBy("genre")
          .agg(
            round(avg("rating"), 2).as("avgRating"),
            count("rating").as("ratingCount")
          )
        genreMetricsDF.show(10, truncate = false)
        genreMetricsDF.limit(10).write.mode("overwrite").parquet(genreMetricsPath)
        println("Genre metrics updated")

        // Aggregation by demographics
        val demographicMetricsDF = finalEnrichedDF.groupBy("age", "gender", "location")
          .agg(
            round(avg("rating"), 2).as("avgRating"),
            count("rating").as("ratingCount")
          )

        demographicMetricsDF.show(10, truncate = false)
        demographicMetricsDF.limit(10).write.mode("overwrite").parquet(demographicMetricsPath)
        println("Demographics metrics updated")

        println(s"Batch $batchId processed successfully")
      }
      .trigger(Trigger.ProcessingTime(120, TimeUnit.SECONDS))
      .start()
      .awaitTermination()

    spark.stop()
  }
}
