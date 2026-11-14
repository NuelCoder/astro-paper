---
title: "Architecting TutorIn: A Lock-Safe, Concurrent Booking System"
author: "Iseoluwa Emmanuel Badejo"
pubDatetime: 2026-11-14T00:00:00Z
slug: "tutorin-architecture"
featured: true
draft: false
tags:
  - "Java 17"
  - "Spring Boot 3"
  - "PostgreSQL"
  - "Apache Kafka"
  - "Concurrency"
  - "Docker"
description: "Designing a race-condition-free tutoring booking API using advanced database locks, Testcontainers, and event-driven notifications."
---

When building the **TutorIn** booking system, the primary engineering challenge was managing state and concurrency. In a live booking environment, multiple students might attempt to reserve the same tutoring time slot simultaneously, leading to race conditions and double-bookings.

As the backend engineer on this project, I architected a robust, lock-safe API using **Java 17 and Spring Boot 3**, backed by a modern, containerized infrastructure stack.

Here is a breakdown of the technical decisions and system architecture.

## 1. Concurrency Control & Lock-Safe Transactions

In a booking system, data integrity is paramount. If two users click "Book" at the exact same millisecond, the system must deterministically award the slot to one and reject the other.

To solve this, I engineered a lock-safe backend API utilizing **PostgreSQL**. By implementing strategic transaction isolation levels and concurrency locks (such as pessimistic write locks on specific time-slot rows), the system explicitly prevents race conditions. The database acts as the single source of truth, ensuring that once a session is in the process of being booked, no other thread can mutate that specific record until the transaction commits or rolls back.

## 2. Event-Driven Notifications with Apache Kafka & MailHog

Sending confirmation emails or notifications synchronously during the booking HTTP request creates unnecessary latency for the user and risks failing the transaction if the email server times out.

To decouple this logic, I integrated **Apache Kafka** for asynchronous processing.
*   **Decoupled Workflows:** Once a booking transaction is successfully committed to PostgreSQL, the Spring Boot application publishes a `BookingConfirmedEvent` to a Kafka topic. The HTTP response is returned to the user immediately.
*   **Reliable Local Testing:** A separate consumer service listens to this Kafka topic to dispatch emails. To ensure safe and reliable local testing without spamming real inboxes, I configured **MailHog** within the local development environment to trap and inspect these outbound notifications.

## 3. High-Performance Caching with Redis

To reduce database load, I integrated **Redis** to cache frequently queried, read-heavy data—such as available tutor schedules and public profile information. This ensures that the system can serve availability calendars in milliseconds, saving PostgreSQL's resources for the complex, transactional write operations.

## 4. Environment Orchestration with Docker Compose

A backend system with this many moving parts (Spring Boot, PostgreSQL, Redis, Zookeeper/Kafka, MailHog) can be a nightmare to set up locally. 

I orchestrated the entire development environment using **Docker Compose**. With a single `docker-compose up` command, the entire infrastructure spins up with the correct network configurations, ports, and environment variables, ensuring parity between local development and production environments.

## 5. Automated Integration Testing with Testcontainers

Unit tests with mocked dependencies are great, but they don't prove that your SQL queries or Kafka consumers actually work against real infrastructure.

To guarantee system reliability, I implemented automated integration testing using **Testcontainers**. During the build phase, Testcontainers automatically spins up lightweight, ephemeral Docker containers for PostgreSQL and Kafka, runs the Spring Boot test suite against these real database and broker instances, and tears them down afterward. This ensures absolute confidence in the lock-safe logic before deployment.

## Summary

By combining the modern language features of **Java 17 and Spring Boot 3** with the transactional safety of **PostgreSQL**, the asynchronous decoupling of **Apache Kafka**, and the developer experience of **Docker and Testcontainers**, the TutorIn system represents a highly resilient, scalable approach to building transactional backend APIs.