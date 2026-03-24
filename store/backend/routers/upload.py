"""
Image Upload endpoints — pushes files to Supabase Storage 'product-images' bucket.
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import uuid
from fastapi import APIRouter, File, UploadFile, HTTPException
from database import get_supabase

router = APIRouter(prefix="/upload", tags=["Uploads"])


@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    """
    Accepts an image file, uploads to the Supabase 'product-images' bucket,
    and returns the public URL.
    """
    # 1. Read file bytes
    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Empty file provided")

    # 2. Generate unique filename (keep original extension if possible)
    ext = ""
    if file.filename and "." in file.filename:
        ext = f".{file.filename.split('.')[-1]}"
    filename = f"{uuid.uuid4()}{ext}"

    # 3. Upload to Supabase
    sb = get_supabase()
    try:
        # Note: the file content-type should ideally be dynamic based on the file
        content_type = file.content_type or "image/jpeg"
        res = sb.storage.from_("product-images").upload(
            path=filename,
            file=file_bytes,
            file_options={"content-type": content_type}
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500, detail=f"Failed to upload to Supabase: {str(exc)}"
        )

    # 4. Get the public URL
    public_url = sb.storage.from_("product-images").get_public_url(filename)

    return {"image_url": public_url}
