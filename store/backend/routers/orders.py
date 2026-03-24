"""
Order endpoints — place orders and query them.
Each order writes to BOTH the 'orders' and 'order_items' tables.
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi import APIRouter, HTTPException, Query
from models import Order, OrderCreate
from database import get_supabase

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", response_model=Order, status_code=201)
def create_order(body: OrderCreate):
    """
    Place a new order.
    1. Look up each product's price.
    2. Create the order row.
    3. Insert order_items rows.
    """
    sb = get_supabase()

    # ── resolve prices & compute total ──────────────────────
    total = 0.0
    resolved_items = []
    for item in body.items:
        prod = (
            sb.table("products")
            .select("price")
            .eq("id", item.product_id)
            .single()
            .execute()
        )
        if not prod.data:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found",
            )
        unit_price = prod.data["price"]
        total += unit_price * item.quantity
        resolved_items.append(
            {
                "product_id": item.product_id,
                "quantity": item.quantity,
                "unit_price": unit_price,
            }
        )

    # ── create order ────────────────────────────────────────
    order_resp = (
        sb.table("orders")
        .insert({"user_id": body.user_id, "total": total, "status": "pending"})
        .execute()
    )
    order = order_resp.data[0]

    # ── create order_items and update stock ─────────────────
    for ri in resolved_items:
        ri["order_id"] = order["id"]
        
        # safely decrement stock
        prod = sb.table("products").select("stock").eq("id", ri["product_id"]).single().execute()
        if prod.data and prod.data["stock"] is not None:
            new_stock = prod.data["stock"] - ri["quantity"]
            # To avoid negative stock in a naive way
            if new_stock < 0: new_stock = 0
            sb.table("products").update({"stock": new_stock}).eq("id", ri["product_id"]).execute()

    sb.table("order_items").insert(resolved_items).execute()

    # ── return combined object ──────────────────────────────
    items_resp = (
        sb.table("order_items")
        .select("*")
        .eq("order_id", order["id"])
        .execute()
    )
    order["items"] = items_resp.data
    return order


@router.get("/{order_id}", response_model=Order)
def get_order(order_id: str):
    """Fetch a single order with its line-items."""
    sb = get_supabase()
    order_resp = (
        sb.table("orders")
        .select("*")
        .eq("id", order_id)
        .single()
        .execute()
    )
    if not order_resp.data:
        raise HTTPException(status_code=404, detail="Order not found")

    items_resp = (
        sb.table("order_items")
        .select("*")
        .eq("order_id", order_id)
        .execute()
    )
    order = order_resp.data
    order["items"] = items_resp.data
    return order


@router.get("/", response_model=list[Order])
def list_orders(user_id: str | None = Query(default=None)):
    """List orders, optionally filtered by user_id."""
    sb = get_supabase()
    query = sb.table("orders").select("*")
    if user_id:
        query = query.eq("user_id", user_id)
    query = query.order("created_at", desc=True)
    orders = query.execute().data

    # attach items to each order
    for order in orders:
        items_resp = (
            sb.table("order_items")
            .select("*")
            .eq("order_id", order["id"])
            .execute()
        )
        order["items"] = items_resp.data
    return orders

@router.patch("/{order_id}/status", response_model=Order)
def update_order_status(order_id: str, new_status: str):
    """Admin endpoint to update order status."""
    sb = get_supabase()
    
    # Verify order exists
    order_resp = sb.table("orders").select("*").eq("id", order_id).single().execute()
    if not order_resp.data:
        raise HTTPException(status_code=404, detail="Order not found")
        
    update_resp = sb.table("orders").update({"status": new_status}).eq("id", order_id).execute()
    if not update_resp.data:
        raise HTTPException(status_code=500, detail="Failed to update order status")
        
    updated_order = update_resp.data[0]
    
    items_resp = sb.table("order_items").select("*").eq("order_id", order_id).execute()
    updated_order["items"] = items_resp.data
    return updated_order
