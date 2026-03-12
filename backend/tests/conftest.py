import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_USER = 'admin'
ADMIN_PASS = 'srigorack2024'


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture
def admin_client(api_client):
    api_client.auth = (ADMIN_USER, ADMIN_PASS)
    return api_client


@pytest.fixture
def created_contact_id(api_client):
    """Create a contact and return its ID. Note: Google Sheets backend - no delete endpoint available."""
    unique_id = str(uuid.uuid4())[:8]
    response = api_client.post(f"{BASE_URL}/api/contact", json={
        "name": f"TEST_User_{unique_id}",
        "company": "TEST_Company",
        "email": f"test_{unique_id}@example.com",
        "phone": "+1234567890",
        "message": "TEST automated test message",
        "package_interest": "Starter"
    })
    assert response.status_code == 200
    contact_id = response.json()["id"]
    yield contact_id
    # NOTE: Contact is stored in Google Sheets - no delete API available
    # Manual cleanup needed in the spreadsheet for TEST_ entries


@pytest.fixture
def created_gallery_id(admin_client):
    """Create a gallery image and return its ID for teardown"""
    unique_id = str(uuid.uuid4())[:8]
    response = admin_client.post(f"{BASE_URL}/api/admin/gallery", json={
        "title": f"TEST_Image_{unique_id}",
        "description": "TEST automated test image",
        "category": "cad",
        "image_url": "https://example.com/test-image.jpg",
        "order": 99
    })
    assert response.status_code == 200
    image_id = response.json()["id"]
    yield image_id
    # Cleanup
    admin_client.delete(f"{BASE_URL}/api/admin/gallery/{image_id}")
