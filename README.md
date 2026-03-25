# 🌾 Sugarcane Disease & Insect Detection System

An AI-powered web application for early detection and classification of diseases and insect pests in sugarcane crops, built with **FastAPI**, **YOLOv8**, and a full user authentication system.

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110%2B-009688)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Overview

This project provides a production-ready solution for detecting and analyzing sugarcane diseases and insect damage using state-of-the-art computer vision. It includes a secure user authentication system, scan history tracking, PDF report generation, and real-time webcam analysis.

---

## ✨ Features

### 🤖 AI Detection
- **YOLOv8 Object Detection** — Fast bounding box detection
- **YOLOv8 Instance Segmentation** — Precise pixel-level masks
- **Spatial Heatmap Generation** — Confidence-weighted activation overlay
- **Live Webcam Analysis** — Real-time frame-by-frame detection
- **Batch Image Processing** — Analyze multiple images in one request

### 🔐 Authentication & User System
- User registration & login with **JWT tokens** (24-hour expiry)
- Passwords hashed with **pbkdf2_sha256** via Passlib
- Protected API endpoints with `Bearer` token authorization
- Per-user **scan history** stored in SQLite via SQLAlchemy

### 📊 Analysis & Reporting
- **Health Index** calculation based on area affected and severity
- **Chemical treatment recommendations** gated behind ≥75% confidence threshold
- Downloadable **PDF reports** per scan (via ReportLab)
- Aggregated **dashboard statistics**: total scans, diseases, insects, healthy rate

### 🌐 Web Interface
- Drag-and-drop image upload
- Adjustable confidence threshold (0.1–0.9)
- Side-by-side annotated result + heatmap view
- Scan history gallery
- Responsive, mobile-friendly design
- About & contact page

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- CUDA-capable GPU (recommended)
- 4 GB+ RAM

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/babuvinayn/sugarcane-disease-detection-system.git
   cd sugarcane-disease-detection-system
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and set your SECRET_KEY and any other values
   ```

4. **Run the server**
   ```bash
   uvicorn interface.app:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## 📁 Project Structure

```
sugarcane-disease-detection-system/
├── interface/                  # Web application (FastAPI)
│   ├── app.py                 # Main FastAPI app & all API routes
│   ├── auth.py                # JWT authentication logic
│   ├── database.py            # SQLAlchemy models (User, ScanHistory)
│   ├── disease_recommendations.json  # Treatment knowledge base
│   ├── templates/             # Jinja2 HTML templates
│   │   ├── index.html         # Main detection UI
│   │   ├── login.html         # Login page
│   │   ├── signup.html        # Registration page
│   │   ├── dashboard.html     # User dashboard
│   │   └── about.html         # About page
│   ├── static/                # CSS, JavaScript, assets
│   └── uploads/               # Temporary upload directory
├── models/                     # Trained YOLOv8 model files
│   ├── yolov8.pt              # Detection model
│   └── yolov8_seg.pt          # Segmentation model
├── inference/                  # CLI inference scripts
│   └── predict.py
├── training/                   # Model training scripts
│   ├── train_seg.py
│   └── setup_dataset.py
├── data/                       # Dataset configuration
│   └── dataset.yaml
├── .env.example               # Environment variable template
├── requirements.txt           # Python dependencies
└── Dockerfile                 # Container deployment config
```

---

## 🌐 API Reference

All protected endpoints require the `Authorization: Bearer <token>` header.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/signup` | ❌ | Register a new user |
| `POST` | `/api/login` | ❌ | Login and get JWT token |
| `GET` | `/logout` | ❌ | Redirect to login (clears client token) |
| `POST` | `/api/analyze` | ✅ | Single image analysis |
| `POST` | `/api/analyze/batch` | ❌ | Batch image analysis |
| `POST` | `/api/live-analyze` | ❌ | Lightweight webcam frame analysis |
| `GET` | `/api/history` | ✅ | Get user's scan history |
| `GET` | `/api/stats` | ✅ | Get aggregated dashboard statistics |
| `GET` | `/api/report/{scan_id}` | ✅ | Download PDF report for a scan |
| `GET` | `/api/health` | ❌ | Server & model health check |

### Example: Analyze an Image
```bash
curl -X POST http://localhost:8000/api/analyze \
  -H "Authorization: Bearer <your_token>" \
  -F "file=@image.jpg" \
  -F "model_type=detection" \
  -F "conf_threshold=0.25"
```

### Example: Get Auth Token
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "yourpassword"}'
```

---

## 🎯 Model Information

| Model | Type | Size | Output | Best For |
|-------|------|------|--------|----------|
| `yolov8.pt` | YOLOv8n Detection | 22.5 MB | Bounding boxes | Quick screening |
| `yolov8_seg.pt` | YOLOv8n Segmentation | 67.9 MB | Pixel masks | Detailed area analysis |

### Detection Classes
| Class | Description |
|-------|-------------|
| 🟢 **Healthy** | Normal, healthy sugarcane tissue |
| 🔴 **Disease** | Disease-affected areas (fungal, bacterial, viral) |
| 🟠 **Insect** | Insect pest damage or presence |

---

## ⚙️ Configuration (`.env`)

```env
SECRET_KEY=your-secret-key-here
APP_HOST=0.0.0.0
APP_PORT=8000
LOG_LEVEL=INFO
LOG_FILE=logs/app.log
MAX_FILE_SIZE_MB=16
CORS_ORIGINS=*
DETECTION_MODEL_PATH=models/yolov8.pt
SEGMENTATION_MODEL_PATH=models/yolov8_seg.pt
```

---

## 🐳 Docker Deployment

```bash
docker build -t sugarcane-detection .
docker run -p 8000:8000 sugarcane-detection
```

---

## 🛠️ Troubleshooting

**Models not loading**
- Verify `.pt` files exist in the `models/` directory
- Check `DETECTION_MODEL_PATH` / `SEGMENTATION_MODEL_PATH` in `.env`

**Port already in use**
```bash
uvicorn interface.app:app --port 8001
```

**Authentication errors (401)**
- Ensure you're sending `Authorization: Bearer <token>` header
- Tokens expire after 24 hours — log in again

**Large file warning (yolov8_seg.pt)**
- The segmentation model is ~68 MB. GitHub warns but still hosts it.
- Consider [Git LFS](https://git-lfs.github.com) for future model updates.

---

## 📚 Tech Stack

| Layer | Technology |
|-------|-----------|
| AI/ML | PyTorch, Ultralytics YOLOv8 |
| Backend | FastAPI, Uvicorn, Pydantic |
| Auth | python-jose (JWT), Passlib (pbkdf2_sha256) |
| Database | SQLite, SQLAlchemy |
| Computer Vision | OpenCV, Pillow, NumPy |
| PDF Reports | ReportLab |
| Frontend | HTML5, CSS3, JavaScript, Jinja2 |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes
4. Push and open a Pull Request

---

## ⚠️ Disclaimer

This is an AI-assisted agricultural tool designed to aid early detection. **Always verify results with a qualified agronomist** before applying chemical treatments. Chemical recommendations are only shown when model confidence is ≥ 75%.

---

## 👥 Author

Developed by [BabuVinay N](https://github.com/babuvinayn)

---

**Made with ❤️ for sustainable agriculture**
