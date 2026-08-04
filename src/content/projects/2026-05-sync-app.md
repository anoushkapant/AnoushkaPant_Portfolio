---
title: "Sync — A Local-First Notes App"
date: 2026-05-20
type: technical
featured: false
tags: ["typescript", "react", "indexeddb", "offline-first", "pwa"]
summary: "An offline-first notes app with CRDT-based sync across devices. Type-safe end to end, ships as a PWA, no accounts required."
images:
  - /uploads/photos/sync-app.png
pdfs: []
githubUrl: "https://github.com/yourusername/sync"
liveUrl: "https://example.com"
---

This is a sample project — replace me with your own work.

## The problem

Notes apps either store everything in the cloud or force a conflict-riddled
sync story. I wanted local-first storage with eventual consistency, so notes
feel instant even on a plane.

## What I built

- **IndexedDB** as the source of truth, with an in-memory cache on top
- **CRDTs** so edits from two devices merge without data loss
- A **PWA** shell with offline boot and background sync
- Zero login — devices pair by sharing a short code

## Technical notes

The sync engine is the interesting part. I wrote a small conflict-free
replicated data type for note text and a lightweight wire protocol on top of
WebSockets. The whole thing is typed end to end with shared types between the
client and server.

_Edit `src/content/projects/2026-05-sync-app.md` to make this your own._
