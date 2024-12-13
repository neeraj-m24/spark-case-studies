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
    enrichedData.limit(10).write.mode("overwrite").partitionBy("Store", "Date").parquet("gs://spark_learning_1/final-project/case-study-4/enriched_data")
    println("Enriched data saved to GCP.")

    metrics.limit(10).write.mode("overwrite").json("gs://spark_learning_1/final-project/case-study-4/metrics")
    println("Metrics saved to GCP.")

    // Kafka Configuration Map
    val kafkaOptions = Map(
      "kafka.bootstrap.servers" -> "localhost:9092",
      "subscribe" -> "sales-updates",
      "startingOffsets" -> "latest",
      "fetch.max.wait.ms" -> "50000", // Increase fetch wait time
      "request.timeout.ms" -> "120000", // Increase request timeout
      "max.poll.records" -> "100" // Reduce batch size if needed
    )

    // Real-Time Simulation
    println("Starting real-time processing...")
    RealTimeProcessing.processRealTimeUpdates(spark, kafkaOptions)

    spark.stop()
    println("Spark session stopped.")
  }
}
