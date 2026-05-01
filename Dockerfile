# ── Stage 1: Build React frontend ────────────────────────────────────────────
FROM node:20-slim AS frontend-builder

WORKDIR /app/frontend

# Install dependencies
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# Copy source and build
COPY frontend/ ./
RUN npm run build


# ── Stage 2: Python runtime ───────────────────────────────────────────────────
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies from root requirements.txt
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source (excludes backend/Lib via .dockerignore)
COPY backend/ ./backend/

# Copy built React frontend into a location the FastAPI app can serve
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

EXPOSE 8000

# Run uvicorn from the backend directory so relative imports resolve correctly.
# Railway injects $PORT at runtime; fall back to 8000 for local runs.
CMD ["sh", "-c", "cd /app/backend && uvicorn back:app --host 0.0.0.0 --port ${PORT:-8000}"]
