package utils

import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions._

object DataEnrichment {
  def enrichSalesData(salesDF: DataFrame, featuresDF: DataFrame, storesDF: DataFrame): DataFrame = {
    val cleanFeatures = featuresDF
      .withColumnRenamed("IsHoliday", "Feature_IsHoliday")
      .cache()

    val cleanStores = storesDF.cache()

    salesDF
      .join(cleanFeatures, Seq("Store", "Date"), "left")
      .join(cleanStores, Seq("Store"), "left")
      .drop("Feature_IsHoliday") // Keep only one 'IsHoliday' column
  }
}
