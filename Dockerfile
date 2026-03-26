FROM python:3.10-slim

WORKDIR /app

# System dependencies for OpenCV
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Application code
COPY . .

# Create required directories
RUN mkdir -p logs interface/uploads interface/results

# Environment
ENV PYTHONPATH=/app
ENV HOME=/app

EXPOSE 8000

# Production server via Uvicorn
CMD ["uvicorn", "interface.app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
