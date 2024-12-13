package utils

import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions._

object MetricsComputation {
  def computeMetrics(salesDF: DataFrame): DataFrame = {
    val storeMetrics = salesDF.groupBy("Store")
      .agg(
        sum("Weekly_Sales").as("Total_Sales"),
        avg("Weekly_Sales").as("Avg_Sales")
      )
      .withColumn("Dept", lit(null)) // Add a Dept column to match the schema

    val departmentMetrics = salesDF.groupBy("Store", "Dept")
      .agg(
        sum("Weekly_Sales").as("Total_Sales"),
        avg("Weekly_Sales").as("Avg_Sales")
      )

    // Ensure the columns are in the same order
    val storeMetricsAligned = storeMetrics.select("Store", "Dept", "Total_Sales", "Avg_Sales")
    val departmentMetricsAligned = departmentMetrics.select("Store", "Dept", "Total_Sales", "Avg_Sales")

    // Combine both metrics
    storeMetricsAligned.union(departmentMetricsAligned)
  }
}
