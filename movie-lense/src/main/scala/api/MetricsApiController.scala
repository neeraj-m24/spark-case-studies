package api

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.{ContentTypes, HttpEntity, HttpHeader}
import akka.http.scaladsl.model.StatusCodes.OK
import akka.http.scaladsl.model.headers._
import akka.http.scaladsl.server.Directives._
import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions.desc
import spray.json._

import scala.concurrent.ExecutionContextExecutor

// Case classes for metrics
case class MovieMetric(movieId: Int, title: String, genres: String, avgRating: Double, totalRatings: Long)
case class GenreMetric(genre: String, avgRating: Double, totalRatings: Long)
case class DemographicMetric(age: String, gender: String, location: String, avgRating: Double, totalRatings: Long)

// JSON serialization with Spray-json
object JsonProtocol extends DefaultJsonProtocol {
  implicit val movieMetricFormat = jsonFormat5(MovieMetric)
  implicit val genreMetricFormat = jsonFormat3(GenreMetric)
  implicit val demographicMetricFormat = jsonFormat5(DemographicMetric)
}

object MetricsApiController {
  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem = ActorSystem("MovieLensService")
    implicit val ec: ExecutionContextExecutor = system.dispatcher

    val spark = SparkSession.builder()
      .appName("MovieLensAPI")
      .config("spark.hadoop.fs.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem")
      .config("spark.hadoop.fs.AbstractFileSystem.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFS")
      .config("spark.hadoop.google.cloud.auth.service.account.enable", "true")
      .config("spark.hadoop.google.cloud.auth.service.account.json.keyfile", "/Users/neerajkumarmilan/spark-gcs-key.json")
      .master("local[*]")
      .getOrCreate()

    import JsonProtocol._

    val metricsBasePath = "gs://spark_learning_1/final-project/case-study-2/output/aggregated-metrics"
//
//    val movieMetricsPath = s"$metricsBasePath/per_movie_metrics"
//    val genreMetricsPath = s"$metricsBasePath/per_genre_metrics"
//    val demographicMetricsPath = s"$metricsBasePath/per_demographic_metrics"


    val movieMetricsPath = s"$metricsBasePath/movie-metrics"
    val genreMetricsPath = s"$metricsBasePath/genre-metrics"
    val demographicMetricsPath = s"$metricsBasePath/demographic-metrics"

    // Load DataFrame with error handling
    def loadMetrics(path: String): DataFrame = {
      try {
        spark.read.parquet(path)
      } catch {
        case ex: Exception =>
          println(s"Error loading metrics from $path: ${ex.getMessage}")
          spark.emptyDataFrame
      }
    }

    // CORS headers
    def corsHeaders: List[HttpHeader] = List(
      `Access-Control-Allow-Origin`.*,
      `Access-Control-Allow-Methods`(akka.http.scaladsl.model.HttpMethods.GET, akka.http.scaladsl.model.HttpMethods.POST),
      `Access-Control-Allow-Headers`("Content-Type", "Authorization")
    )

    // API Routes
    val routes =
      pathPrefix("api") {
        concat(
          path("movies") {
            get {
              val movieMetricsDF = loadMetrics(movieMetricsPath)
              val movieMetrics = movieMetricsDF.sort(desc("average_rating"))
                .collect()
                .map(row => MovieMetric(
                  row.getAs[Int]("movieId"),
                  row.getAs[String]("title"),
                  row.getAs[String]("genres"),
                  row.getAs[Double]("average_rating"),
                  row.getAs[Long]("total_ratings")
                )).toList.toJson.prettyPrint
              respondWithHeaders(corsHeaders) {
                complete(OK, HttpEntity(ContentTypes.`application/json`, movieMetrics))
              }
            }
          },
          path("genres") {
            get {
              val genreMetricsDF = loadMetrics(genreMetricsPath)
              val genreMetrics = genreMetricsDF.sort(desc("average_rating"))
                .collect()
                .map(row => GenreMetric(
                  row.getAs[String]("genre"),
                  row.getAs[Double]("average_rating"),
                  row.getAs[Long]("total_ratings")
                )).toList.toJson.prettyPrint
              respondWithHeaders(corsHeaders) {
                complete(OK, HttpEntity(ContentTypes.`application/json`, genreMetrics))
              }
            }
          },
          path("demographics") {
            get {
              val demographicMetricsDF = loadMetrics(demographicMetricsPath)
              val demographicMetrics = demographicMetricsDF.sort(desc("average_rating"))
                .collect()
                .map(row => DemographicMetric(
                  row.getAs[String]("age"),
                  row.getAs[String]("gender"),
                  row.getAs[String]("location"),
                  row.getAs[Double]("average_rating"),
                  row.getAs[Long]("total_ratings")
                )).toList.toJson.prettyPrint
              respondWithHeaders(corsHeaders) {
                complete(OK, HttpEntity(ContentTypes.`application/json`, demographicMetrics))
              }
            }
          }
        )
      }

    // Start the server
    val serverBinding = Http().newServerAt("localhost", 8080).bindFlow(routes)
    println("Server running at http://localhost:8080/")
    println("Press ENTER to stop the server...")

    scala.io.StdIn.readLine()
    serverBinding
      .flatMap(_.unbind())
      .onComplete(_ => system.terminate())
  }
}

