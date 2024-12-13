//package utils
//
//import org.apache.spark.sql.{DataFrame, SparkSession}
//import org.apache.spark.sql.functions._
//import org.apache.spark.sql.types._
//
//object RealTimeProcessing {
//  def processRealTimeUpdates(spark: SparkSession, kafkaOptions: Map[String, String]): Unit = {
//    // Define schema for the JSON data
//    val salesSchema = new StructType()
//      .add("Store", StringType)
//      .add("Dept", StringType)
//      .add("Date", StringType)
//      .add("Weekly_Sales", DoubleType)
//      .add("IsHoliday", BooleanType)
//
//    // Read streaming data from Kafka with options
//    val kafkaStream = spark.readStream
//      .format("kafka")
//      .options(kafkaOptions)
//      .load()
//
//    // Extract the JSON data from Kafka value and apply schema
//    val salesUpdates = kafkaStream.selectExpr("CAST(value AS STRING) AS json")
//      .withColumn("data", from_json(col("json"), salesSchema))
//      .select("data.*") // Extract individual fields
//      .withColumn("EventTime", to_timestamp(col("Date"), "yyyy-MM-dd")) // Parse Date as Timestamp
//      .withWatermark("EventTime", "1 day") // Set a watermark of 1 day
//
//    // Process and update metrics in real-time
//    val updatedMetrics = salesUpdates
//      .groupBy(
//        col("Store"),
//        col("Dept"),
//        window(col("EventTime"), "1 hour") // Use a sliding window of 1 hour
//      )
//      .agg(
//        sum("Weekly_Sales").as("Total_Sales"),
//        avg("Weekly_Sales").as("Avg_Sales")
//      )
//      .select(
//        col("Store"),
//        col("Dept"),
//        col("window.start").as("Window_Start"),
//        col("window.end").as("Window_End"),
//        col("Total_Sales"),
//        col("Avg_Sales")
//      )
//
//    // Write results to GCP in append mode
//    val query = updatedMetrics.writeStream
//      .outputMode("append") // Append mode for incremental writes
//      .format("parquet")
//      .option("path", "gs://spark_learning_1/final-project/case-study-4/real_time_metrics")
//      .option("checkpointLocation", "gs://spark_learning_1/final-project/case-study-4/checkpoints")
//      .start()
//
//    query.awaitTermination()
//  }
//}




//package utils
//
//import org.apache.spark.sql.{DataFrame, SparkSession}
//import org.apache.spark.sql.functions._
//import org.apache.spark.sql.types._
//
//object RealTimeProcessing {
//  def processRealTimeUpdates(spark: SparkSession, kafkaOptions: Map[String, String]): Unit = {
//    // Define schema for the JSON data
//    val salesSchema = new StructType()
//      .add("Store", StringType)
//      .add("Dept", StringType)
//      .add("Date", StringType)
//      .add("Weekly_Sales", DoubleType)
//      .add("IsHoliday", BooleanType)
//
//    // Read streaming data from Kafka with options
//    val kafkaStream = spark.readStream
//      .format("kafka")
//      .options(kafkaOptions)
//      .load()
//
//    // Extract the JSON data from Kafka value and apply schema
//    val salesUpdates = kafkaStream.selectExpr("CAST(value AS STRING) AS json")
//      .withColumn("data", from_json(col("json"), salesSchema))
//      .select("data.*") // Extract individual fields
//      .withColumn("EventTime", to_timestamp(col("Date"), "yyyy-MM-dd")) // Parse Date as Timestamp
//      .withWatermark("EventTime", "1 day") // Set a watermark of 1 day
//
//    // Write the raw streaming data to the console for debugging
//    val consoleQueryRaw = salesUpdates.writeStream
//      .outputMode("append") // Show only new data
//      .format("console")
//      .option("truncate", "false") // Avoid truncating the data in logs
//      .start()
//
//    // Process and update metrics in real-time
//    val updatedMetrics = salesUpdates
//      .groupBy(
//        col("Store"),
//        col("Dept"),
//        window(col("EventTime"), "1 hour") // Use a sliding window of 1 hour
//      )
//      .agg(
//        sum("Weekly_Sales").as("Total_Sales"),
//        avg("Weekly_Sales").as("Avg_Sales")
//      )
//      .select(
//        col("Store"),
//        col("Dept"),
//        col("window.start").as("Window_Start"),
//        col("window.end").as("Window_End"),
//        col("Total_Sales"),
//        col("Avg_Sales")
//      )
//
//    // Write the processed metrics to the console for debugging
//    val consoleQueryMetrics = updatedMetrics.writeStream
//      .outputMode("update") // Update mode for aggregations
//      .format("console")
//      .option("truncate", "false") // Avoid truncating the data in logs
//      .start()
//
//    // Wait for both queries to terminate
//    consoleQueryRaw.awaitTermination()
//    consoleQueryMetrics.awaitTermination()
//  }
//}

package utils
import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._

object RealTimeProcessing {
  def processRealTimeUpdates(spark: SparkSession, kafkaOptions: Map[String, String]): Unit = {
    // Define schema for the JSON data
    val salesSchema = new StructType()
      .add("Store", StringType)
      .add("Dept", StringType)
      .add("Date", StringType)
      .add("Weekly_Sales", DoubleType)
      .add("IsHoliday", BooleanType)

    // Read streaming data from Kafka with options
    val kafkaStream = spark.readStream
      .format("kafka")
      .options(kafkaOptions)
      .load()

    // Print raw Kafka data to console
    kafkaStream.selectExpr("CAST(value AS STRING) AS json")
      .writeStream
      .outputMode("append")
      .format("console")
      .option("truncate", "false")
      .start()

    // Extract the JSON data from Kafka value and apply schema
    val salesUpdates = kafkaStream.selectExpr("CAST(value AS STRING) AS json")
      .withColumn("data", from_json(col("json"), salesSchema))
      .select("data.*") // Extract individual fields
      .withColumn("EventTime", to_timestamp(col("Date"), "yyyy-MM-dd")) // Parse Date as Timestamp
      .withWatermark("EventTime", "1 day") // Set a watermark of 1 day

    // Print parsed data to console
    salesUpdates.writeStream
      .outputMode("append")
      .format("console")
      .option("truncate", "false")
      .start()

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

    // Print aggregated metrics to console
    updatedMetrics.writeStream
      .outputMode("update") // Update mode for metrics
      .format("console")
      .option("truncate", "false")
      .start()

    // Await termination to keep the application running
    spark.streams.awaitAnyTermination()
  }
}
