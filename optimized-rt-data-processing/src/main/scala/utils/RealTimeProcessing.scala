package utils

import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._

object RealTimeProcessing {
  def processRealTimeUpdates(spark: SparkSession, kafkaBroker: String, topic: String): Unit = {
    // Define schema for the JSON data
    val salesSchema = new StructType()
      .add("Store", StringType)
      .add("Dept", StringType)
      .add("Date", StringType)
      .add("Weekly_Sales", DoubleType)
      .add("IsHoliday", BooleanType)

    // Read streaming data from Kafka
    val kafkaStream = spark.readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", kafkaBroker)
      .option("subscribe", topic)
      .load()

    // Extract the JSON data from Kafka value and apply schema
    val salesUpdates = kafkaStream.selectExpr("CAST(value AS STRING) AS json")
      .withColumn("data", from_json(col("json"), salesSchema))
      .select("data.*") // Extract individual fields
      .withColumn("EventTime", to_timestamp(col("Date"), "yyyy-MM-dd")) // Parse Date as Timestamp
      .withWatermark("EventTime", "1 day") // Set a watermark of 1 day

    // Process and update metrics in real-time
    val updatedMetrics = salesUpdates
      .groupBy(
        col("Store"),
        col("Dept"),
        window(col("EventTime"), "1 hour") // Use a sliding window of 1 hour
      )
      .agg(
        sum("Weekly_Sales").as("Total_Sales"),
        avg("Weekly_Sales").as("Avg_Sales")
      )
      .select(
        col("Store"),
        col("Dept"),
        col("window.start").as("Window_Start"),
        col("window.end").as("Window_End"),
        col("Total_Sales"),
        col("Avg_Sales")
      )

    // Write results to GCP in append mode
    val query = updatedMetrics.writeStream
      .outputMode("append") // Append mode for incremental writes
      .format("parquet")
      .option("path", "gs://spark_learning_1/final-project/case-study-4/real_time_metrics")
      .option("checkpointLocation", "gs://spark_learning_1/final-project/case-study-4/checkpoints")
      .start()

    query.awaitTermination()
  }
}
