# Project 3D - Backend Service

Dedicated Node.js backend streaming API for the scroll-driven 3D landing page.

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service status, uptime, and timestamp |
| `GET` | `/api/video/stream` | RFC 7233 byte-range video stream (HTTP 206) |
| `GET` | `/api/video/metadata` | Video specifications, chapters & durations |
| `POST`| `/api/inquiries` | Save allocation reservation inquiries |
| `GET` | `/api/inquiries` | Retrieve list of saved inquiries |

## Run

```bash
npm start
# Runs by default on http://localhost:5001
```
