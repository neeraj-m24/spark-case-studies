//import org.apache.spark.sql.SparkSession
//import org.apache.spark.sql.functions._
//import org.apache.spark.storage.StorageLevel
//import utils.{DataEnrichment, DataValidation, MetricsComputation, RealTimeProcessing}
//import config.SparkConfig
//
//object Main {
//  def main(args: Array[String]): Unit = {
//    val spark = SparkConfig.getSparkSession("OptimizedDataPipeline")
//
//    // Load the datasets
//    val trainDF = spark.read.option("header", "true").csv("src/resources/train.csv")
//    val featuresDF = spark.read.option("header", "true").csv("src/resources/features.csv")
//    val storesDF = spark.read.option("header", "true").csv("src/resources/stores.csv")
//
//    // Validate data
//    val validatedTrainDF = DataValidation.validateSalesData(trainDF)
//
//    // Enrich data with metadata
//    val enrichedData = DataEnrichment.enrichSalesData(validatedTrainDF, featuresDF, storesDF)
//
//    // Cache enriched datasets for reuse
//    enrichedData.cache()
//
//    // Compute metrics
//    val metrics = MetricsComputation.computeMetrics(enrichedData)
//
//    // Save data to GCP storage
//    enrichedData.limit(4).write.mode("overwrite").partitionBy("Store", "Date").parquet("gs://spark_learning_1/final-project/case-study-4/enriched_data")
//    metrics.limit(4).write.mode("overwrite").json("gs://spark_learning_1/final-project/case-study-4/metrics")
//
//    // Real-Time Simulation
//    RealTimeProcessing.processRealTimeUpdates(spark, "localhost:9092", "sales-updates")
//
//    spark.stop()
//  }
//}

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.storage.StorageLevel
import utils.{DataEnrichment, DataValidation, MetricsComputation, RealTimeProcessing}
import config.SparkConfig

object Main {
  def main(args: Array[String]): Unit = {
    val spark = SparkConfig.getSparkSession("OptimizedDataPipeline")

    // Load the datasets
    val trainDF = spark.read.option("header", "true").csv("src/resources/train.csv")
    val featuresDF = spark.read.option("header", "true").csv("src/resources/features.csv")
    val storesDF = spark.read.option("header", "true").csv("src/resources/stores.csv")

    println("Loaded Train DataFrame:")
    trainDF.show(5, truncate = false)
    println("Loaded Features DataFrame:")
    featuresDF.show(5, truncate = false)
    println("Loaded Stores DataFrame:")
    storesDF.show(5, truncate = false)

    // Validate data
    val validatedTrainDF = DataValidation.validateSalesData(trainDF)
    println("Validated Train DataFrame:")
    validatedTrainDF.show(5, truncate = false)

    // Enrich data with metadata
    val enrichedData = DataEnrichment.enrichSalesData(validatedTrainDF, featuresDF, storesDF)
    println("Enriched Data DataFrame:")
    enrichedData.show(5, truncate = false)

    // Cache enriched datasets for reuse
    enrichedData.cache()

    // Compute metrics
    val metrics = MetricsComputation.computeMetrics(enrichedData)
    println("Computed Metrics DataFrame:")
    metrics.show(5, truncate = false)

    // Save data to GCP storage
    enrichedData.limit(4).write.mode("overwrite").partitionBy("Store", "Date").parquet("gs://spark_learning_1/final-project/case-study-4/enriched_data")
    println("Enriched data saved to GCP.")

    metrics.limit(4).write.mode("overwrite").json("gs://spark_learning_1/final-project/case-study-4/metrics")
    println("Metrics saved to GCP.")

    // Real-Time Simulation
    println("Starting real-time processing...")
    RealTimeProcessing.processRealTimeUpdates(spark, "localhost:9092", "sales-updates")

    spark.stop()
    println("Spark session stopped.")
  }
}
