"""
Pydantic data shapes for request / response bodies.
These mirror the Supabase PostgreSQL tables:
  users, products, orders, order_items
"""

from __future__ import annotations
from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime


# ── Products ────────────────────────────────────────────────

class ProductCreate(BaseModel):
    """Body sent when creating a new product."""
    name: str
    description: Optional[str] = None
    price: float = Field(gt=0, description="Price in USD, must be > 0")
    image_url: Optional[str] = None
    stock: int = Field(ge=0, default=0)


class ProductUpdate(BaseModel):
    """Body sent when updating a product (all fields optional)."""
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = Field(default=None, gt=0)
    image_url: Optional[str] = None
    stock: Optional[int] = Field(default=None, ge=0)


class Product(ProductCreate):
    """Full product record returned from the database."""
    id: str
    created_at: Optional[datetime] = None


# ── Orders ──────────────────────────────────────────────────

class OrderItemCreate(BaseModel):
    """A single line-item inside an order."""
    product_id: str
    quantity: int = Field(ge=1, default=1)


class OrderCreate(BaseModel):
    """Body sent when placing a new order."""
    user_id: str
    items: list[OrderItemCreate]


class OrderItem(OrderItemCreate):
    """Full order-item record returned from the database."""
    id: str
    order_id: str
    unit_price: float


class Order(BaseModel):
    """Full order record returned from the database."""
    id: str
    user_id: str
    status: str = "pending"
    total: float = 0.0
    created_at: Optional[datetime] = None
    items: list[OrderItem] = []


# ── Auth ────────────────────────────────────────────────────

class UserSignUp(BaseModel):
    """Body for user registration."""
    email: str
    password: str = Field(min_length=6)


class UserSignIn(BaseModel):
    """Body for user login."""
    email: str
    password: str
