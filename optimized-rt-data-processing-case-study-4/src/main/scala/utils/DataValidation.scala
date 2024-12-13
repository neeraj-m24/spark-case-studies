package utils

import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions._

object DataValidation {
  def validateSalesData(salesDF: DataFrame): DataFrame = {
    salesDF.filter(col("Weekly_Sales").isNotNull && col("Weekly_Sales") >= 0)
  }
}