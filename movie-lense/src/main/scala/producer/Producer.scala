//package producer
//
//import akka.actor.ActorSystem
//import akka.kafka.ProducerSettings
//import akka.kafka.scaladsl.SendProducer
//import akka.stream.scaladsl.Source
//import spray.json._
//import org.apache.kafka.clients.producer.ProducerRecord
//import org.apache.kafka.common.serialization.StringSerializer
//
//import scala.concurrent.duration._
//import scala.util.Random
//
//// Case class representing a movie rating
//case class MovieRating(user: Int, movie: Int, score: Double, submittedAt: Long)
//
//// JSON serialization protocol for MovieRating
//object MovieRatingJsonProtocol extends DefaultJsonProtocol {
//  implicit val movieRatingFormat: RootJsonFormat[MovieRating] = jsonFormat4(MovieRating)
//}
//
//object Producer {
//  def main(args: Array[String]): Unit = {
//    implicit val actorSystem: ActorSystem = ActorSystem("MovieRatingProducer")
//    import actorSystem.dispatcher
//    import MovieRatingJsonProtocol._ // Import the implicit JSON format here
//
//    // Kafka topic for movie ratings
//    val ratingsTopic = "movie-ratings"
//
//    // Kafka producer configuration
//    val kafkaProducerSettings = ProducerSettings(actorSystem, new StringSerializer, new StringSerializer)
//      .withBootstrapServers("localhost:9092")
//
//    // Initialize Kafka producer
//    val kafkaProducer = SendProducer(kafkaProducerSettings)
//
//    // Source generating random movie ratings and publishing to Kafka every 50 ms
//    val ratingsStream = Source
//      .tick(initialDelay = 0.millis, interval = 50.millis, tick = ())
//      .map(_ => createRandomRating())
//      .map { rating =>
//        val ratingJson = rating.toJson.compactPrint
//        new ProducerRecord[String, String](ratingsTopic, ratingJson)
//      }
//
//    // Running the stream
//    val streamCompletion = ratingsStream.runForeach(record => kafkaProducer.send(record))
//
//    // Handle stream completion and termination
//    streamCompletion.onComplete {
//      case scala.util.Success(_) =>
//        println("Stream completed successfully.")
//        actorSystem.terminate()
//      case scala.util.Failure(exception) =>
//        println(s"Stream failed with error: ${exception.getMessage}")
//        actorSystem.terminate()
//    }
//  }
//
//  // Function to generate a random movie rating
//  def createRandomRating(): MovieRating = {
//    val userId = Random.nextInt(1000) + 1
//    val movieId = Random.nextInt(1000) + 1
//    val score = BigDecimal(Random.nextDouble() * 4.5 + 0.5)
//      .setScale(1, BigDecimal.RoundingMode.HALF_UP)
//      .toDouble // Generate rating between 0.5 and 5.0
//    val timestamp = System.currentTimeMillis()
//    MovieRating(user = userId, movie = movieId, score = score, submittedAt = timestamp)
//  }
//}
//

//==========================================

//package producer
//
//import akka.actor.ActorSystem
//import akka.kafka.ProducerSettings
//import akka.kafka.scaladsl.SendProducer
//import akka.stream.scaladsl.Source
//import spray.json._
//import org.apache.kafka.clients.producer.ProducerRecord
//import org.apache.kafka.common.serialization.StringSerializer
//
//import scala.concurrent.duration._
//import scala.util.Random
//
//// Case class representing a movie rating
//case class MovieRating(user: Int, movie: Int, score: Double, submittedAt: Long)
//
//// JSON serialization protocol for MovieRating
//object MovieRatingJsonProtocol extends DefaultJsonProtocol {
//  implicit val movieRatingFormat: RootJsonFormat[MovieRating] = jsonFormat4(MovieRating)
//}
//
//object Producer {
//  def main(args: Array[String]): Unit = {
//    implicit val actorSystem: ActorSystem = ActorSystem("MovieRatingProducer")
//    import actorSystem.dispatcher
//    import MovieRatingJsonProtocol._ // Import the implicit JSON format here
//
//    // Kafka topic for movie ratings
//    val ratingsTopic = "movie-ratings"
//
//    // Kafka producer configuration
//    val kafkaProducerSettings = ProducerSettings(actorSystem, new StringSerializer, new StringSerializer)
//      .withBootstrapServers("localhost:9092")
//
//    // Initialize Kafka producer
//    val kafkaProducer = SendProducer(kafkaProducerSettings)
//
//    // Source generating random movie ratings and publishing to Kafka every 50 ms
//    val ratingsStream = Source
//      .tick(initialDelay = 0.millis, interval = 50.millis, tick = ())
//      .map(_ => createRandomRating())
//      .map { rating =>
//        // Print the rating to the console before producing to Kafka
//        println(s"Producing Rating: ${rating}")
//
//        val ratingJson = rating.toJson.compactPrint
//        new ProducerRecord[String, String](ratingsTopic, ratingJson)
//      }
//
//    // Running the stream
//    val streamCompletion = ratingsStream.runForeach(record => kafkaProducer.send(record))
//
//    // Handle stream completion and termination
//    streamCompletion.onComplete {
//      case scala.util.Success(_) =>
//        println("Stream completed successfully.")
//        actorSystem.terminate()
//      case scala.util.Failure(exception) =>
//        println(s"Stream failed with error: ${exception.getMessage}")
//        actorSystem.terminate()
//    }
//  }
//
//  // Function to generate a random movie rating
//  def createRandomRating(): MovieRating = {
//    val userId = Random.nextInt(1000) + 1
//    val movieId = Random.nextInt(1000) + 1
//    val score = BigDecimal(Random.nextDouble() * 4.5 + 0.5)
//      .setScale(1, BigDecimal.RoundingMode.HALF_UP)
//      .toDouble // Generate rating between 0.5 and 5.0
//    val timestamp = System.currentTimeMillis()
//    MovieRating(user = userId, movie = movieId, score = score, submittedAt = timestamp)
//  }
//}


package producer

import akka.actor.ActorSystem
import akka.kafka.ProducerSettings
import akka.kafka.scaladsl.SendProducer
import akka.stream.scaladsl.Source
import spray.json._
import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.common.serialization.StringSerializer

import scala.concurrent.duration._
import scala.util.Random

// Case class representing a movie rating
case class MovieRating(userId: Int, movieId: Int, rating: Double, timestamp: Long)

// JSON serialization protocol for MovieRating
object MovieRatingJsonProtocol extends DefaultJsonProtocol {
  implicit val movieRatingFormat: RootJsonFormat[MovieRating] = jsonFormat4(MovieRating)
}

object Producer {
  def main(args: Array[String]): Unit = {
    implicit val actorSystem: ActorSystem = ActorSystem("MovieRatingProducer")
    import actorSystem.dispatcher
    import MovieRatingJsonProtocol._ // Import the implicit JSON format here

    // Kafka topic for movie ratings
    val ratingsTopic = "movie-ratings"

    // Kafka producer configuration
    val kafkaProducerSettings = ProducerSettings(actorSystem, new StringSerializer, new StringSerializer)
      .withBootstrapServers("localhost:9092")

    // Initialize Kafka producer
    val kafkaProducer = SendProducer(kafkaProducerSettings)

    // Source generating random movie ratings and publishing to Kafka every 50 ms
    val ratingsStream = Source
      .tick(initialDelay = 0.millis, interval = 50.millis, tick = ())
      .map(_ => createRandomRating())
      .map { rating =>
        // Print the rating to the console before producing to Kafka
        println(s"Producing Rating: $rating")

        val ratingJson = rating.toJson.compactPrint
        new ProducerRecord[String, String](ratingsTopic, ratingJson)
      }

    // Running the stream
    val streamCompletion = ratingsStream.runForeach(record => kafkaProducer.send(record))

    // Handle stream completion and termination
    streamCompletion.onComplete {
      case scala.util.Success(_) =>
        println("Stream completed successfully.")
        actorSystem.terminate()
      case scala.util.Failure(exception) =>
        println(s"Stream failed with error: ${exception.getMessage}")
        actorSystem.terminate()
    }
  }

  // Function to generate a random movie rating
  def createRandomRating(): MovieRating = {
    val userId = Random.nextInt(1000) + 1
    val movieId = Random.nextInt(1000) + 1
    val rating = BigDecimal(Random.nextDouble() * 4.5 + 0.5)
      .setScale(1, BigDecimal.RoundingMode.HALF_UP)
      .toDouble // Generate rating between 0.5 and 5.0
    val timestamp = System.currentTimeMillis()
    MovieRating(userId = userId, movieId = movieId, rating = rating, timestamp = timestamp)
  }
}
