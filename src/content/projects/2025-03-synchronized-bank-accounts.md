---
title: "Synchronized Bank Account Operations"
date: 2025-03-15
type: technical
featured: false
tags: ["java", "multithreading", "concurrency"]
summary: "Thread-safe deposit and withdrawal methods using wait()/notify()/notifyAll() to prevent race conditions."
images: []
pdfs: []
---

A concurrency project demonstrating **thread-safe** banking operations in Java.

## What it does

- Thread-safe deposit and withdrawal methods using `wait()`, `notify()`, and `notifyAll()`
- Prevents **race conditions** in a shared-resource environment
- Exercises classic producer-consumer and synchronization patterns

## Takeaway

Getting synchronization right — and reasoning about *why* it's needed — is
essential for any system with shared state and multiple threads.
