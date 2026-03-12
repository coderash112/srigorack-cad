from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from google.oauth2 import service_account
from googleapiclient.discovery import build
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (for gallery only)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Google Sheets configuration
GOOGLE_SHEETS_ID = os.environ.get('GOOGLE_SHEETS_ID', '1t02IpAjoh1dSOs-uixarqnYdJk5xHu9rVIFV3eT8Aqs')
SERVICE_ACCOUNT_FILE = ROOT_DIR / 'service_account.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# Initialize Google Sheets service
def get_sheets_service():
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    service = build('sheets', 'v4', credentials=credentials)
    return service

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBasic()

# Admin credentials
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'srigorack2024')

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# Define Models
class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = ""
    category: str
    image_url: str
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GalleryImageCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    category: str
    image_url: str
    order: Optional[int] = 0

class GalleryImageUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    order: Optional[int] = None

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: Optional[str] = ""
    email: EmailStr
    phone: Optional[str] = ""
    message: str
    package_interest: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    company: Optional[str] = ""
    email: EmailStr
    phone: Optional[str] = ""
    message: str
    package_interest: Optional[str] = ""

# Google Sheets Helper Functions
async def append_to_sheet(values: list):
    """Append a row to the Google Sheet"""
    def _append():
        service = get_sheets_service()
        body = {'values': [values]}
        result = service.spreadsheets().values().append(
            spreadsheetId=GOOGLE_SHEETS_ID,
            range='Sheet1!A:H',
            valueInputOption='RAW',
            insertDataOption='INSERT_ROWS',
            body=body
        ).execute()
        return result
    return await asyncio.to_thread(_append)

async def get_sheet_data():
    """Get all data from the Google Sheet"""
    def _get():
        service = get_sheets_service()
        result = service.spreadsheets().values().get(
            spreadsheetId=GOOGLE_SHEETS_ID,
            range='Sheet1!A:H'
        ).execute()
        return result.get('values', [])
    return await asyncio.to_thread(_get)

# Gallery Endpoints (using MongoDB)
@api_router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery_images(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    images = await db.gallery.find(query, {"_id": 0}).sort("order", 1).to_list(100)
    for img in images:
        if isinstance(img.get('created_at'), str):
            img['created_at'] = datetime.fromisoformat(img['created_at'])
        if isinstance(img.get('updated_at'), str):
            img['updated_at'] = datetime.fromisoformat(img['updated_at'])
    return images

@api_router.get("/gallery/{image_id}", response_model=GalleryImage)
async def get_gallery_image(image_id: str):
    image = await db.gallery.find_one({"id": image_id}, {"_id": 0})
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    if isinstance(image.get('created_at'), str):
        image['created_at'] = datetime.fromisoformat(image['created_at'])
    if isinstance(image.get('updated_at'), str):
        image['updated_at'] = datetime.fromisoformat(image['updated_at'])
    return image

@api_router.post("/admin/gallery", response_model=GalleryImage)
async def create_gallery_image(
    image_data: GalleryImageCreate,
    admin: str = Depends(verify_admin)
):
    gallery_image = GalleryImage(**image_data.model_dump())
    doc = gallery_image.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    await db.gallery.insert_one(doc)
    return gallery_image

@api_router.put("/admin/gallery/{image_id}", response_model=GalleryImage)
async def update_gallery_image(
    image_id: str,
    image_data: GalleryImageUpdate,
    admin: str = Depends(verify_admin)
):
    existing = await db.gallery.find_one({"id": image_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Image not found")
    
    update_data = {k: v for k, v in image_data.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.gallery.update_one({"id": image_id}, {"$set": update_data})
    updated = await db.gallery.find_one({"id": image_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    if isinstance(updated.get('updated_at'), str):
        updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
    return updated

@api_router.delete("/admin/gallery/{image_id}")
async def delete_gallery_image(
    image_id: str,
    admin: str = Depends(verify_admin)
):
    result = await db.gallery.delete_one({"id": image_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"message": "Image deleted successfully"}

# Contact Endpoints (using Google Sheets)
@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(contact_data: ContactSubmissionCreate):
    submission = ContactSubmission(**contact_data.model_dump())
    
    # Prepare row for Google Sheets
    row = [
        submission.id,
        submission.name,
        submission.company or "",
        submission.email,
        submission.phone or "",
        submission.package_interest or "",
        submission.message,
        submission.created_at.isoformat()
    ]
    
    try:
        await append_to_sheet(row)
        logger.info(f"Contact submission saved to Google Sheets: {submission.id}")
    except Exception as e:
        logger.error(f"Error saving to Google Sheets: {e}")
        raise HTTPException(status_code=500, detail="Failed to save contact submission")
    
    return submission

@api_router.get("/admin/contacts")
async def get_contact_submissions(admin: str = Depends(verify_admin)):
    try:
        rows = await get_sheet_data()
        
        # Skip header row if exists
        if rows and rows[0][0] == 'ID':
            rows = rows[1:]
        
        contacts = []
        for row in rows:
            # Ensure row has enough columns
            while len(row) < 8:
                row.append("")
            
            contacts.append({
                "id": row[0],
                "name": row[1],
                "company": row[2],
                "email": row[3],
                "phone": row[4],
                "package_interest": row[5],
                "message": row[6],
                "created_at": row[7] if row[7] else datetime.now(timezone.utc).isoformat(),
                "is_read": False  # Sheet doesn't track this, default to False
            })
        
        # Sort by created_at descending
        contacts.sort(key=lambda x: x['created_at'], reverse=True)
        return contacts
    except Exception as e:
        logger.error(f"Error reading from Google Sheets: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")

# Health check and root
@api_router.get("/")
async def root():
    return {"message": "SriGoRack Technologies API", "status": "operational"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "SriGoRack Technologies API"}

# Seed default gallery images
@api_router.post("/admin/seed-gallery")
async def seed_gallery(admin: str = Depends(verify_admin)):
    count = await db.gallery.count_documents({})
    if count > 0:
        return {"message": "Gallery already has images", "count": count}
    
    default_images = [
        {
            "id": str(uuid.uuid4()),
            "title": "Emerald Cut Three Stone Ring",
            "description": "Precision CAD model with detailed specifications for manufacturing",
            "category": "cad",
            "image_url": "https://customer-assets.emergentagent.com/job_af8d6258-1b8d-4c55-bb27-b46273a5e40c/artifacts/pqgbiijm_WhatsApp%20Image%202026-03-11%20at%2023.36.54%20%281%29.jpeg",
            "order": 1,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Classic Oval Solitaire Ring",
            "description": "Elegant gold solitaire design with oval diamond setting",
            "category": "cad",
            "image_url": "https://customer-assets.emergentagent.com/job_af8d6258-1b8d-4c55-bb27-b46273a5e40c/artifacts/10oaucsm_WhatsApp%20Image%202026-03-11%20at%2023.36.54.jpeg",
            "order": 2,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Oval Halo Diamond Ring",
            "description": "Photorealistic rendering with studio-quality lighting",
            "category": "rendering",
            "image_url": "https://customer-assets.emergentagent.com/job_af8d6258-1b8d-4c55-bb27-b46273a5e40c/artifacts/o1cvhe0a_WhatsApp%20Image%202026-03-11%20at%2023.36.56.jpeg",
            "order": 1,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Diamond Eternity Band",
            "description": "Full eternity band with micro-pave setting details",
            "category": "rendering",
            "image_url": "https://customer-assets.emergentagent.com/job_af8d6258-1b8d-4c55-bb27-b46273a5e40c/artifacts/78exm6be_WhatsApp%20Image%202026-03-11%20at%2023.36.54%20%282%29.jpeg",
            "order": 2,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.gallery.insert_many(default_images)
    return {"message": "Gallery seeded successfully", "count": len(default_images)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
