---
title: "Virtual File Management System (CVFS)"
date: 2025-04-08
type: technical
featured: false
tags: ["java", "systems", "file-systems"]
summary: "An in-memory virtual file system with directory management, file operations, search, and disk-state persistence."
images: []
pdfs: []
---

An in-memory **virtual file system** written in Java — CVFS.

## Features

- Directory management and file operations
- Search functionality across the virtual tree
- **Disk-state persistence** so the filesystem survives restarts
- Simulates real file-system behavior for fast, efficient operations without physical disk dependency

## Why it's cool

Building a file system from scratch makes you think in terms of data
structures and state — exactly the kind of low-level problem that sharpens
engineering instincts.
