"""
Sugarcane Disease & Insect Detection - FastAPI Web Application
Production-ready web interface with async REST API and Batch Processing
"""

import os
import json
import cv2
import base64
import logging
import asyncio
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
from io import BytesIO
from pathlib import Path
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from PIL import Image
from ultralytics import YOLO
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, Depends, status
from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from interface.database import get_db, User, ScanHistory, init_db, Session
from interface.auth import (
    get_current_user, 
    get_current_user_required, 
    get_password_hash, 
    verify_password, 
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
import numpy as np

# ---------------------------------------------------------
# Application Configuration & Logging setup
# ---------------------------------------------------------

# Load environment variables from .env
PROJECT_ROOT = Path(__file__).parent.parent.resolve()
load_dotenv(PROJECT_ROOT / ".env")

APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = os.getenv("LOG_FILE", "logs/app.log")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")

# Set up standard Python logging with rotating file handler
logger = logging.getLogger("sugarcane_api")
logger.setLevel(getattr(logging, LOG_LEVEL.upper(), logging.INFO))
log_formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(log_formatter)
logger.addHandler(stream_handler)

# Add file-based rotating log
log_dir = PROJECT_ROOT / Path(LOG_FILE).parent
os.makedirs(log_dir, exist_ok=True)
from logging.handlers import RotatingFileHandler
file_handler = RotatingFileHandler(
    str(PROJECT_ROOT / LOG_FILE), maxBytes=5*1024*1024, backupCount=3
)
file_handler.setFormatter(log_formatter)
logger.addHandler(file_handler)

# Construct base directory mapping so Uvicorn can run from anywhere
BASE_DIR = Path(__file__).parent.resolve()

UPLOAD_FOLDER = str(BASE_DIR / 'uploads')
RESULTS_FOLDER = str(BASE_DIR / 'results')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp', 'tiff'}
MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", "16"))
MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

MODEL_DIR = PROJECT_ROOT / "models"
DETECTION_MODEL_PATH = PROJECT_ROOT / os.getenv("DETECTION_MODEL_PATH", "models/yolov8.pt")
SEGMENTATION_MODEL_PATH = PROJECT_ROOT / os.getenv("SEGMENTATION_MODEL_PATH", "models/yolov8_seg.pt")

# Global state for models
models_state = {
    "detection_model": None,
    "segmentation_model": None,
    "available": []
}

# ---------------------------------------------------------
# Lifespan and Initialization
# ---------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    global CLASS_INFO
    logger.info("Initializing system context...")
    
    # Initialize DB
    init_db()

    # Load Disease Recommendations JSON
    json_path = BASE_DIR / "disease_recommendations.json"
    try:
        if json_path.exists():
            with open(json_path, 'r') as f:
                CLASS_INFO = json.load(f)
            logger.info(f"✓ Disease knowledge base loaded")
    except Exception as e:
        logger.error(f"Failed to load disease recommendations: {e}")
        CLASS_INFO = {}

    # We skip model loading here for faster startup
    logger.info("✓ API Ready (Models will lazy-load on first use)")

    yield
    
    logger.info("Shutting down. Releasing resources...")
    models_state.clear()

def load_models_lazy(model_type: str = 'detection'):
    """Helper to load models only when needed."""
    if model_type == 'detection' and models_state["detection_model"] is None:
        logger.info("Lazy-loading Detection Model...")
        models_state["detection_model"] = YOLO(str(DETECTION_MODEL_PATH))
        if "detection" not in models_state["available"]:
            models_state["available"].append("detection")
            
    if model_type == 'segmentation' and models_state["segmentation_model"] is None:
        logger.info("Lazy-loading Segmentation Model...")
        try:
            models_state["segmentation_model"] = YOLO(str(SEGMENTATION_MODEL_PATH))
            if "segmentation" not in models_state["available"]:
                models_state["available"].append("segmentation")
        except Exception as e:
            logger.warning(f"Segmentation loading failed: {e}")

app = FastAPI(
    title="Sugarcane Disease & Insect Detection API",
    version=APP_VERSION,
    description="Production-ready YOLO-powered sugarcane disease and pest detection API.",
    lifespan=lifespan
)

# CORS Middleware
cors_origins = [o.strip() for o in CORS_ORIGINS.split(",")] if CORS_ORIGINS != "*" else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security Headers Middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(self), microphone=()"
        return response

app.add_middleware(SecurityHeadersMiddleware)

app.mount("/static", StaticFiles(directory="interface/static"), name="static")
templates = Jinja2Templates(directory="interface/templates")


# ---------------------------------------------------------
# Pydantic Models for API
# ---------------------------------------------------------

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class DetectionDetail(BaseModel):
    cls_name: str
    count: int
    confidence: float
    color: str
    icon: str
    description: str
    severity: str
    treatment: List[str]
    prevention: List[str]
    area_pct: float

class AnalysisDetail(BaseModel):
    total_detections: int
    status: str
    message: str
    detections: List[DetectionDetail]
    treatments: List[str]
    preventions: List[str]
    health_index: float
    area_affected_pct: float
    model_type: Optional[str] = "detection"

class AnalysisResponse(BaseModel):
    success: bool
    image: Optional[str] = None
    heatmap: Optional[str] = None
    analysis: Optional[AnalysisDetail] = None
    scan_id: Optional[int] = None
    error: Optional[str] = None

class BatchAnalysisResponse(BaseModel):
    success: bool
    results: List[AnalysisResponse]
    error: Optional[str] = None

# ---------------------------------------------------------
# Authentication API
# ---------------------------------------------------------

@app.post("/api/signup")
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """Registers a new user."""
    # Check if email exists
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user_data.password)
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hashed_pwd
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"success": True, "message": "User registered successfully"}

@app.post("/api/login")
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """Authenticates user and returns JWT token."""
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {"name": user.name, "email": user.email}
    }

@app.get("/logout")
async def logout_redirect():
    """Redirects to login page (frontend handles token clearing)."""
    return RedirectResponse(url="/login")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    """Old UI / Main Interface."""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.get("/signup", response_class=HTMLResponse)
async def signup_page(request: Request):
    return templates.TemplateResponse("signup.html", {"request": request})

@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard_page(request: Request):
    """Redirect to the restored old UI (now the dashboard)."""
    return RedirectResponse(url="/")

@app.get("/about", response_class=HTMLResponse)
async def about_page(request: Request):
    """About & Contact Page."""
    return templates.TemplateResponse("about.html", {"request": request})

# ---------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------

def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def pil_to_base64(img: Image.Image) -> str:
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return f"data:image/png;base64,{img_str}"

def generate_spatial_heatmap(img_np: np.ndarray, detections) -> Image.Image:
    """
    Generates a thread-safe spatial activation heatmap proxy.
    True GradCAM requires loss.backward() which alters global model state, 
    preventing concurrent async inference on the same worker globally.
    """
    heatmap = np.zeros((img_np.shape[0], img_np.shape[1]), dtype=np.float32)
    for box in detections:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        conf = float(box.conf[0])
        
        cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
        sigma_x = max((x2 - x1) / 4.0, 1.0)
        sigma_y = max((y2 - y1) / 4.0, 1.0)
        
        y_grid, x_grid = np.ogrid[:img_np.shape[0], :img_np.shape[1]]
        
        g = np.exp(-(((x_grid - cx) ** 2) / (2 * sigma_x ** 2) + ((y_grid - cy) ** 2) / (2 * sigma_y ** 2)))
        heatmap += g * conf
        
    heatmap = np.clip(heatmap, 0, 1)
    heatmap_uint8 = np.uint8(255 * heatmap)
    
    heatmap_color = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(img_np, 0.5, heatmap_color, 0.5, 0)
    
    overlay_rgb = cv2.cvtColor(overlay, cv2.COLOR_BGR2RGB)
    return Image.fromarray(overlay_rgb)

def generate_analysis(detections, class_names, model_type, img_shape=None) -> AnalysisDetail:
    img_area = img_shape[0] * img_shape[1] if img_shape else 1.0
    
    if len(detections) == 0:
        return AnalysisDetail(
            total_detections=0,
            status='healthy',
            message='No issues detected! Your sugarcane appears healthy.',
            detections=[],
            treatments=CLASS_INFO.get('healthy', {}).get('treatment', []),
            preventions=CLASS_INFO.get('healthy', {}).get('prevention', []),
            health_index=100.0,
            area_affected_pct=0.0
        )
    
    class_counts = {}
    class_confidences = {}
    class_areas = {}
    total_affected_area = 0
    
    for box in detections:
        cls_id = int(box.cls[0])
        cls_name = class_names[cls_id]
        conf = float(box.conf[0])
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        box_area = (x2 - x1) * (y2 - y1)
        total_affected_area += box_area
        
        if cls_name not in class_counts:
            class_counts[cls_name] = 0
            class_confidences[cls_name] = []
            class_areas[cls_name] = 0
        
        class_counts[cls_name] += 1
        class_confidences[cls_name].append(conf)
        class_areas[cls_name] += box_area
    
    detection_details = []
    overall_severity = 'low'
    
    for cls_name, count in class_counts.items():
        avg_conf = sum(class_confidences[cls_name]) / count
        info = CLASS_INFO.get(cls_name, {})
        cls_area_pct = (class_areas[cls_name] / img_area) * 100
        
        detection_details.append(DetectionDetail(
            cls_name=cls_name,
            count=count,
            confidence=round(avg_conf * 100, 1),
            color=info.get('color', '#6b7280'),
            icon=info.get('icon', '•'),
            description=info.get('description', 'Unknown'),
            severity=info.get('severity', 'low'),
            treatment=info.get('treatment', []),
            prevention=info.get('prevention', []),
            area_pct=round(cls_area_pct, 2)
        ))
        
        if info.get('severity') == 'high':
            overall_severity = 'high'
        elif info.get('severity') == 'medium' and overall_severity != 'high':
            overall_severity = 'medium'
    
    agg_treatments = []
    agg_preventions = []
    
    # NEW: Safety Logic for Chemical Recommendations
    high_confidence_warning = "Confidence is below 75%; consult an expert before applying chemicals."
    is_high_conf = any(d.confidence >= 75.0 for d in detection_details)

    for det in detection_details:
        for t in det.treatment:
            # Only add specific chemical treatments if confidence is high
            if "(" in t and not is_high_conf:
                if high_confidence_warning not in agg_treatments:
                    agg_treatments.append(high_confidence_warning)
                continue

            if t not in agg_treatments and t != "No action needed.":
                agg_treatments.append(t)

        for p in det.prevention:
            if p not in agg_preventions and p != "Continue regular monitoring.":
                agg_preventions.append(p)

    if not agg_treatments and overall_severity == 'low':
        agg_treatments = CLASS_INFO.get('healthy', {}).get('treatment', ["No chemical action needed."])
    if not agg_preventions and overall_severity == 'low':
        agg_preventions = CLASS_INFO.get('healthy', {}).get('prevention', ["Continue regular monitoring."])
    
    status = 'critical' if overall_severity == 'high' else ('warning' if overall_severity == 'medium' else 'healthy')
    
    total_area_pct = (total_affected_area / img_area) * 100
    # Health Index Calculation: 100 - (Area Affected * Weight) - Penalty for severity
    severity_penalty = 20 if status == 'critical' else (10 if status == 'warning' else 0)
    health_index = max(0, 100 - (total_area_pct * 1.5) - severity_penalty)
    
    medical_note = "MEDICAL DISCLAIMER: Advice is based on visual analysis. Always verify with a local agronomist."
    if medical_note not in agg_treatments:
        agg_treatments.insert(0, medical_note)

    return AnalysisDetail(
        total_detections=len(detections),
        status=status,
        model_type=model_type,
        message=f'Detected {len(detections)} issue(s) affecting {round(total_area_pct, 1)}% of the sample',
        detections=detection_details,
        treatments=agg_treatments,
        preventions=agg_preventions,
        health_index=round(health_index, 1),
        area_affected_pct=round(total_area_pct, 1)
    )

def sync_process_image(image_bytes: bytes, model_type: str = 'detection', conf_threshold: float = 0.25) -> AnalysisResponse:
    """Synchronous core processing function for thread-pool offloading."""
    try:
        load_models_lazy(model_type)
        
        if model_type == 'segmentation' and models_state["segmentation_model"] is not None:
            model = models_state["segmentation_model"]
        else:
            # Fallback or primary detection
            if models_state["detection_model"] is None:
                load_models_lazy('detection')
            model = models_state["detection_model"]
            model_type = 'detection'
        
        if model is None:
            return AnalysisResponse(success=False, error="No models available.")
        
        # Load image from bytes efficiently
        img_np = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)

        logger.info(f"Running inference with {model_type} model at conf_threshold {conf_threshold}")
        results = model(img_np, conf=conf_threshold)
        
        # Plot and save output memory stream
        annotated_img = results[0].plot()
        annotated_img = cv2.cvtColor(annotated_img, cv2.COLOR_BGR2RGB)
        annotated_pil = Image.fromarray(annotated_img)
        
        detections = results[0].boxes
        analysis_detail = generate_analysis(detections, results[0].names, model_type, img_shape=img_np.shape)
        
        heatmap_pil = generate_spatial_heatmap(img_np, detections)

        return AnalysisResponse(
            success=True,
            image=pil_to_base64(annotated_pil),
            heatmap=pil_to_base64(heatmap_pil),
            analysis=analysis_detail
        )
    except Exception as e:
        logger.error(f"Error during image processing: {str(e)}")
        return AnalysisResponse(success=False, error=str(e))

def sync_process_frame(image_bytes: bytes, model_type: str = 'detection', conf_threshold: float = 0.25) -> AnalysisResponse:
    """Lightweight processing function optimized for webcam frames (bypasses Heatmaps)."""
    try:
        load_models_lazy(model_type)
        
        if model_type == 'segmentation' and models_state["segmentation_model"] is not None:
            model = models_state["segmentation_model"]
        else:
            if models_state["detection_model"] is None:
                load_models_lazy('detection')
            model = models_state["detection_model"]
            model_type = 'detection'
        
        if model is None:
            return AnalysisResponse(success=False, error="No models available.")
        
        img_np = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)
        results = model(img_np, conf=conf_threshold)
        detections = results[0].boxes
        analysis_detail = generate_analysis(detections, results[0].names, model_type, img_shape=img_np.shape)

        return AnalysisResponse(
            success=True,
            image=None,
            heatmap=None,
            analysis=analysis_detail
        )
    except Exception as e:
        logger.error(f"Error during live frame processing: {str(e)}")
        return AnalysisResponse(success=False, error=str(e))

# ---------------------------------------------------------
# API Endpoints
# ---------------------------------------------------------

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    """Render main page"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    """Render about & contact page"""
    return templates.TemplateResponse("about.html", {"request": request})

@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {
        'status': 'healthy',
        'version': APP_VERSION,
        'models_available': models_state["available"],
        'detection_model': str(DETECTION_MODEL_PATH) if models_state["detection_model"] else 'Not loaded',
        'segmentation_model': str(SEGMENTATION_MODEL_PATH) if models_state["segmentation_model"] else 'Not loaded'
    }

@app.get("/api/stats")
async def stats(db: Session = Depends(get_db), user: User = Depends(get_current_user_required)):
    """Aggregated statistics for the dashboard counters."""
    from sqlalchemy import func
    total = db.query(func.count(ScanHistory.id)).filter(ScanHistory.user_id == user.id).scalar() or 0
    diseases = db.query(func.count(ScanHistory.id)).filter(ScanHistory.user_id == user.id, ScanHistory.disease_label == 'disease').scalar() or 0
    insects = db.query(func.count(ScanHistory.id)).filter(ScanHistory.user_id == user.id, ScanHistory.disease_label == 'insect').scalar() or 0
    healthy = db.query(func.count(ScanHistory.id)).filter(ScanHistory.user_id == user.id, ScanHistory.disease_label == 'healthy').scalar() or 0
    healthy_pct = round((healthy / total) * 100, 1) if total > 0 else 100.0
    return {
        "total_scans": total,
        "diseases_found": diseases,
        "insects_found": insects,
        "healthy_rate": healthy_pct
    }

@app.get("/api/report/{scan_id}")
async def export_report(scan_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user_required)):
    """Generate a downloadable PDF report for a specific scan."""
    from reportlab.lib.pagesizes import A4
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

    scan = db.query(ScanHistory).filter(ScanHistory.id == scan_id, ScanHistory.user_id == user.id).first()
    if not scan:
        return JSONResponse(status_code=404, content={"error": "Scan not found"})

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, topMargin=40, bottomMargin=40)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('CustomTitle', parent=styles['Title'], fontSize=20, textColor=colors.HexColor('#1a1a2e'))
    subtitle_style = ParagraphStyle('Subtitle', parent=styles['Normal'], fontSize=10, textColor=colors.gray)

    elements = []
    elements.append(Paragraph("🌿 Sugarcane Disease Detection Report", title_style))
    elements.append(Spacer(1, 8))
    elements.append(Paragraph(f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')} | Scan ID: {scan.id}", subtitle_style))
    elements.append(Spacer(1, 20))

    data = [
        ["Field", "Value"],
        ["Disease Detected", scan.disease_label.upper()],
        ["Confidence Score", f"{scan.confidence:.1f}%"],
        ["Scan Timestamp", scan.timestamp.strftime('%Y-%m-%d %H:%M:%S')],
        ["Severity", CLASS_INFO.get(scan.disease_label, {}).get('severity', 'N/A').upper()],
    ]

    table = Table(data, colWidths=[200, 250])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e293b')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    elements.append(table)
    elements.append(Spacer(1, 24))

    # Add Chemical Specifics if high confidence
    info = CLASS_INFO.get(scan.disease_label, {})
    chemicals = [t for t in info.get('treatment', []) if "(" in t]
    
    if chemicals and scan.confidence >= 75.0:
        elements.append(Paragraph("🧪 Recommended Chemical Prescription", styles['Heading2']))
        chem_data = [["Medicine Name", "Dosage & Application"]]
        for c in chemicals:
            # Split "Medicine Name (Dosage)"
            parts = c.split(" (")
            name = parts[0]
            dosage = parts[1].replace(")", "") if len(parts) > 1 else "As directed"
            chem_data.append([name, dosage])
        
        chem_table = Table(chem_data, colWidths=[200, 250])
        chem_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#22c55e')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#22c55e')),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f0fdf4')),
        ]))
        elements.append(chem_table)
        elements.append(Spacer(1, 16))
    elif chemicals:
         elements.append(Paragraph("⚠️ Low Confidence Alert", styles['Heading3']))
         elements.append(Paragraph("Detection confidence is below 75%. Chemical application is NOT recommended without manual verification.", styles['Normal']))
         elements.append(Spacer(1, 12))

    elements.append(Paragraph("Management Guidelines", styles['Heading2']))
    manage_list = [t for t in info.get('treatment', []) if "(" not in t] + info.get('prevention', [])
    for m in manage_list:
        elements.append(Paragraph(f"• {m}", styles['Normal']))
    
    elements.append(Spacer(1, 40))
    elements.append(Paragraph("<b>Disclaimer:</b> This report is generated by an AI model for research purposes. Chemical usage should follow local regulations and label instructions.", subtitle_style))

    doc.build(elements)
    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=scan_report_{scan_id}.pdf"}
    )

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze(
    file: UploadFile = File(...),
    model_type: str = Form('detection'),
    conf_threshold: float = Form(0.25),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user_required)
):
    """API endpoint for single image analysis"""
    if not file.filename:
        return JSONResponse(status_code=400, content={"success": False, "error": "No file selected"})
    if not allowed_file(file.filename):
        return JSONResponse(status_code=400, content={"success": False, "error": "Invalid file type"})

    try:
        contents = await file.read()
        if len(contents) > MAX_FILE_SIZE:
             return JSONResponse(status_code=400, content={"success": False, "error": "File size exceeds 16MB limit"})
        
        # Offload blocking YOLO call to a separate thread
        result = await asyncio.to_thread(sync_process_image, contents, model_type, conf_threshold)
        
        if not result.success:
            return JSONResponse(status_code=500, content=result.model_dump())
            
        # Optional extension: Record top detection inside ScanHistory
        top_disease = "healthy"
        top_conf = 100.0
        
        if result.analysis and len(result.analysis.detections) > 0:
            # Sort by confidence descending and grab top primary anomaly
            d = sorted(result.analysis.detections, key=lambda x: x.confidence, reverse=True)[0]
            top_disease = d.cls_name
            top_conf = d.confidence

        if result.image:
            db_scan = ScanHistory(
                user_id=user.id,
                image_base64=result.image,
                disease_label=top_disease,
                confidence=top_conf
            )
            db.add(db_scan)
            db.commit()
            db.refresh(db_scan)
            result.scan_id = db_scan.id

        return result
    except Exception as e:
        logger.error(f"Endpoint error: {str(e)}")
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@app.get("/api/history")
async def get_history(limit: int = 10, offset: int = 0, db: Session = Depends(get_db), user: User = Depends(get_current_user_required)):
    """API endpoint for retrieving scan history."""
    scans = db.query(ScanHistory).filter(ScanHistory.user_id == user.id).order_by(ScanHistory.timestamp.desc()).limit(limit).offset(offset).all()
    
    results = []
    for s in scans:
        results.append({
            "id": s.id,
            "image": s.image_base64,
            "disease": s.disease_label,
            "confidence": s.confidence,
            "timestamp": s.timestamp.isoformat()
        })
    return {"success": True, "history": results}

@app.post("/api/live-analyze", response_model=AnalysisResponse)
async def live_analyze(
    file: UploadFile = File(...),
    model_type: str = Form('detection'),
    conf_threshold: float = Form(0.25)
):
    """API endpoint optimized for real-time webcam frame analysis without DB storage or heavy Heatmaps"""
    if not file.filename:
        return JSONResponse(status_code=400, content={"success": False, "error": "No frame provided"})

    try:
        contents = await file.read()
        
        # Offload YOLO call to avoid blocking async runtime globally during live streams
        result = await asyncio.to_thread(sync_process_frame, contents, model_type, conf_threshold)
        
        if not result.success:
            return JSONResponse(status_code=500, content=result.model_dump())
            
        return result
    except Exception as e:
        logger.error(f"Endpoint error: {str(e)}")
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@app.post("/api/analyze/batch", response_model=BatchAnalysisResponse)
async def analyze_batch(
    files: List[UploadFile] = File(...),
    model_type: str = Form('detection'),
    conf_threshold: float = Form(0.25)
):
    """API endpoint for batch image analysis"""
    logger.info(f"Received batch analysis request with {len(files)} files.")
    
    if not files or len(files) == 0:
        return JSONResponse(status_code=400, content={"success": False, "error": "No files uploaded"})
        
    responses = []
    
    # Fast path checking
    for file in files:
        if not file.filename or not allowed_file(file.filename):
            responses.append(AnalysisResponse(success=False, error=f"Invalid file: {file.filename}"))
            continue
            
        contents = await file.read()
        
        if len(contents) > MAX_FILE_SIZE:
             responses.append(AnalysisResponse(success=False, error=f"{file.filename} size exceeds 16MB limit"))
             continue
             
        # Dispatch each formally
        task = asyncio.to_thread(sync_process_image, contents, model_type, conf_threshold)
        responses.append(task)
    
    # Await all the thread requests concurrently
    try:
        raw_results = []
        for res in responses:
            if isinstance(res, AnalysisResponse): # Filtered prior due to validation errors natively
                raw_results.append(res)
            else:
                raw_results.append(await res)
                
        return BatchAnalysisResponse(success=True, results=raw_results)
    except Exception as e:
        logger.error(f"Batch processing error: {str(e)}")
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(
        "app:app",
        host=os.getenv("APP_HOST", "0.0.0.0"),
        port=int(os.getenv("APP_PORT", 8000)),
        reload=os.getenv("DEBUG", "false").lower() == "true"
    )
