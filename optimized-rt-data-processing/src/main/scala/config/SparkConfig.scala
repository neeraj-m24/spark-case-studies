package config

import org.apache.spark.sql.SparkSession

object SparkConfig {
  def getSparkSession(appName: String): SparkSession = {
    SparkSession.builder()
      .appName(appName)
      .config("spark.hadoop.fs.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem")
      .config("spark.hadoop.fs.AbstractFileSystem.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFS")
      .config("spark.hadoop.google.cloud.auth.service.account.enable", "true")
      .config("spark.hadoop.google.cloud.auth.service.account.json.keyfile", "/Users/neerajkumarmilan/spark-gcs-key.json")
      .config("spark.driver.bindAddress", "127.0.0.1")
      .config("spark.driver.port", "6066")
      .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
      .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")

      .config("spark.kafka.consumer.fetch.max.wait.ms", "5000")
      .config("spark.kafka.consumer.request.timeout.ms", "10000")
      .config("spark.kafka.consumer.max.partition.fetch.bytes", "1048576")
      .master("local[*]")
      .getOrCreate()

  }
}