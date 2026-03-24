"""
Auth endpoints — sign-up, sign-in, sign-out via Supabase Auth.
Uses email + password authentication.
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi import APIRouter, HTTPException
from models import UserSignUp, UserSignIn
from database import get_supabase

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup")
def sign_up(body: UserSignUp):
    """Register a new user with email + password."""
    try:
        response = get_supabase().auth.sign_up(
            {"email": body.email, "password": body.password}
        )
        return {
            "message": "User created successfully. Check your email for confirmation.",
            "user_id": response.user.id if response.user else None,
        }
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.post("/signin")
def sign_in(body: UserSignIn):
    """Log in with email + password. Returns a JWT access token."""
    try:
        response = get_supabase().auth.sign_in_with_password(
            {"email": body.email, "password": body.password}
        )
        if not response.session or not response.user:
            raise HTTPException(status_code=401, detail="Invalid credentials or session")
            
        return {
            "access_token": response.session.access_token,
            "refresh_token": response.session.refresh_token,
            "user": {
                "id": response.user.id,
                "email": response.user.email,
            },
        }
    except Exception as exc:
        raise HTTPException(status_code=401, detail=str(exc))


@router.post("/signout")
def sign_out():
    """Sign out the current user (invalidates the session server-side)."""
    try:
        get_supabase().auth.sign_out()
        return {"message": "Signed out successfully"}
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))
