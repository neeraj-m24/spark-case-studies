ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "2.13.15"

lazy val akkaVersion = "2.8.4"
lazy val akkaHttpVersion = "10.2.10" // Compatible with Akka 2.8.x
lazy val akkaStreamKafkaVersion = "2.1.1" // Latest available for Scala 2.13

lazy val root = (project in file("."))
  .settings(
    name := "optimized-rt-data-processing"
  )

libraryDependencies ++=
  Seq(
    "org.apache.spark"             %% "spark-core"           % "3.2.1",
    "org.apache.spark"             %% "spark-sql"            % "3.2.1",
    "org.apache.spark"             %% "spark-yarn"           % "3.2.1",
    "org.apache.spark"             %% "spark-sql-kafka-0-10" % "3.2.1", // Match Spark version
    "com.typesafe.akka" %% "akka-actor-typed" % akkaVersion,
    "com.typesafe.akka" %% "akka-stream" % akkaVersion,
    "com.typesafe.akka" %% "akka-stream-kafka" % akkaStreamKafkaVersion,
    "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
    "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
    "org.apache.kafka" % "kafka-clients" % "3.7.0",
    "org.slf4j" % "slf4j-api" % "2.0.9",

    // Spark Streaming library
    "org.apache.spark" %% "spark-streaming" % "3.3.0",



    // Spark Streaming Kafka integration library
    "org.apache.spark" %% "spark-streaming-kafka-0-10" % "3.3.0"

  )