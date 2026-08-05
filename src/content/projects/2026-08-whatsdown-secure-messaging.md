---
title: "WHATSDOWN: Secure E2EE Messaging Platform"
date: 2026-08-05
type: technical
featured: false
tags: ["flask", "socketio", "cryptography", "e2ee", "security"]
summary: "End-to-End Encrypted (E2EE) 1:1 messaging service with 2FA and a zero-knowledge design."
images: []
pdfs: []
---

A secure 1:1 messenger with **E2EE**, **2FA**, and inbuilt usability and
security features.

## What it does

- **Flask + SocketIO backend** with TLS-secured communication
- **Client-side cryptographic operations** — a zero-knowledge design, so the
  server never sees plaintext keys or messages
- **Secure key exchange** using **X25519** and message encryption with
  **AES-256-GCM**

## Why it matters

End-to-end encryption done right means the server is just a courier, not a
confidant. This project made the practical side of modern cryptography
concrete — key agreement, authenticated encryption, and keeping the threat
surface small.
