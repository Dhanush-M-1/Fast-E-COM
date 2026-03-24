"""
Fast-E-COM  —  FastAPI entry point.

Run locally:
    uvicorn main:app --reload

Swagger docs:
    http://127.0.0.1:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import products, orders, auth, upload

# ── App instance ────────────────────────────────────────────

app = FastAPI(
    title="Fast-E-COM API",
    description="E-commerce backend powered by FastAPI + Supabase",
    version="0.1.0",
)

# ── CORS (allow React dev server) ───────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ─────────────────────────────────────────────────

app.include_router(products.router)
app.include_router(orders.router)
app.include_router(auth.router)
app.include_router(upload.router)


# ── Health check ────────────────────────────────────────────

@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "Fast-E-COM API"}
