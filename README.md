# PROJECT 3D // Decoupled Frontend & Backend Architecture

This project is structured into **completely decoupled Frontend and Backend services**, purpose-built for high-performance scroll-driven video streaming and real-time telemetry.

```text
p3d1/
├── backend/                       # Dedicated Node.js Media & API Service
│   ├── media/                     # Stored video assets
│   │   └── gemini_generated_video_b8e50077.mp4
│   ├── data/                      # Inquiries JSON datastore
│   │   └── inquiries.json
│   ├── server.js                  # RFC 7233 range-streaming & REST API
│   ├── package.json
│   └── README.md
│
├── frontend/                      # Standalone UI & Scrollytelling Client
│   ├── index.html                 # Semantic markup & HUD overlay
│   ├── style.css                  # Cyber-glassmorphism & responsive layout
│   ├── app.js                     # RAF Dual-LERP scroll engine & API client
│   ├── dev-server.js              # Dedicated frontend dev server (port 3000)
│   ├── gemini_generated_video_b8e50077.mp4 # Local asset fallback
│   ├── package.json
│   └── README.md
│
├── start.mjs                      # Root service coordinator (starts both)
├── package.json                   # Root package with multi-service scripts
└── README.md                      # Architecture documentation
```

---

## 🚀 Running the Project

### Option A: Run Both Services Concurrently (One Command)
From the project root:
```bash
npm start
```
*or*
```bash
node start.mjs
```
This automatically boots:
- **Backend API**: `http://localhost:5001`
- **Frontend UI**: `http://localhost:3000`

---

### Option B: Run Services Separately

#### 1. Backend Service
```bash
cd backend
npm start
# ➜ Running on http://localhost:5001
```
**API Endpoints Provided:**
- `GET /api/health` — Service health & uptime
- `GET /api/video/stream` — HTTP 206 Partial Content (Range request video streaming)
- `GET /api/video/metadata` — Video dimensions, frame count, durations & chapter structure
- `POST /api/inquiries` — Reservation submission & allocation tracking
- `GET /api/inquiries` — List of stored inquiries

#### 2. Frontend Service
```bash
cd frontend
npm start
# ➜ Running on http://localhost:3000
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📡 Frontend ↔ Backend Communication

1. **Range-Streamed Background Video**:
   The frontend `<video>` stream is requested from `http://localhost:5001/api/video/stream`.
   The backend responds with `HTTP 206 Partial Content` and `Content-Range: bytes START-END/TOTAL`. This allows the browser hardware decoder to seek instantaneously on scroll without buffering delays.
2. **Metadata Synchronization**:
   On load, the frontend synchronizes video duration, FPS (24 fps), and chapter boundaries from `GET /api/video/metadata`.
3. **Telemetry & Status**:
   The top navigation header displays a real-time `BACKEND: ONLINE (PORT 5001)` badge with live status dot. If the backend is paused, the frontend gracefully falls back to local standalone mode.
4. **Pre-Order Reservations**:
   Submitting the Pre-Order modal sends a `POST /api/inquiries` request to the backend, which persists the reservation to `backend/data/inquiries.json` and returns a verified allocation code.
