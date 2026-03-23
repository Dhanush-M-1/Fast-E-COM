"""
Product endpoints — full CRUD against the Supabase 'products' table.
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi import APIRouter, HTTPException
from models import Product, ProductCreate, ProductUpdate
from database import get_supabase

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/", response_model=list[Product])
def list_products():
    """Return every product in the store."""
    response = get_supabase().table("products").select("*").execute()
    return response.data


@router.get("/{product_id}", response_model=Product)
def get_product(product_id: str):
    """Fetch a single product by its ID."""
    response = (
        get_supabase()
        .table("products")
        .select("*")
        .eq("id", product_id)
        .single()
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Product not found")
    return response.data


@router.post("/", response_model=Product, status_code=201)
def create_product(body: ProductCreate):
    """Add a new product to the catalogue."""
    response = (
        get_supabase()
        .table("products")
        .insert(body.model_dump())
        .execute()
    )
    return response.data[0]


@router.put("/{product_id}", response_model=Product)
def update_product(product_id: str, body: ProductUpdate):
    """Update fields on an existing product."""
    # Only send fields the client actually set
    payload = body.model_dump(exclude_unset=True)
    if not payload:
        raise HTTPException(status_code=400, detail="No fields to update")

    response = (
        get_supabase()
        .table("products")
        .update(payload)
        .eq("id", product_id)
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Product not found")
    return response.data[0]


@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: str):
    """Remove a product from the catalogue."""
    get_supabase().table("products").delete().eq("id", product_id).execute()
    return None
