import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_USER = 'admin'
ADMIN_PASS = 'srigorack2024'


class TestAPIHealth:
    def test_api_health(self):
        """API health check returns 200"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"

    def test_api_root(self):
        """API root returns service info"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "SriGoRack" in data.get("message", "")


class TestGalleryEndpoints:
    def test_get_all_gallery_images(self):
        """GET /api/gallery returns list of images"""
        response = requests.get(f"{BASE_URL}/api/gallery")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_get_gallery_images_cad_filter(self):
        """GET /api/gallery?category=cad returns only CAD images"""
        response = requests.get(f"{BASE_URL}/api/gallery?category=cad")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        for img in data:
            assert img["category"] == "cad"

    def test_get_gallery_images_rendering_filter(self):
        """GET /api/gallery?category=rendering returns only rendering images"""
        response = requests.get(f"{BASE_URL}/api/gallery?category=rendering")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        for img in data:
            assert img["category"] == "rendering"

    def test_gallery_image_has_required_fields(self):
        """Gallery images have required fields"""
        response = requests.get(f"{BASE_URL}/api/gallery")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            img = data[0]
            assert "id" in img
            assert "title" in img
            assert "category" in img
            assert "image_url" in img

    def test_get_specific_gallery_image(self):
        """GET /api/gallery/{id} returns specific image"""
        # First get all images to get an ID
        all_response = requests.get(f"{BASE_URL}/api/gallery")
        assert all_response.status_code == 200
        images = all_response.json()
        if len(images) > 0:
            image_id = images[0]["id"]
            response = requests.get(f"{BASE_URL}/api/gallery/{image_id}")
            assert response.status_code == 200
            assert response.json()["id"] == image_id

    def test_get_nonexistent_gallery_image_returns_404(self):
        """GET /api/gallery/{id} returns 404 for unknown ID"""
        response = requests.get(f"{BASE_URL}/api/gallery/nonexistent-id-12345")
        assert response.status_code == 404


class TestAdminGallery:
    def test_admin_create_gallery_image(self, admin_client, created_gallery_id):
        """Admin can create gallery image"""
        # created_gallery_id fixture already creates and we verify it exists
        response = admin_client.get(f"{BASE_URL}/api/gallery/{created_gallery_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == created_gallery_id

    def test_admin_update_gallery_image(self, admin_client, created_gallery_id):
        """Admin can update gallery image"""
        new_title = f"UPDATED_Title_{str(uuid.uuid4())[:6]}"
        response = admin_client.put(
            f"{BASE_URL}/api/admin/gallery/{created_gallery_id}",
            json={"title": new_title}
        )
        assert response.status_code == 200
        # Verify update persisted
        get_response = admin_client.get(f"{BASE_URL}/api/gallery/{created_gallery_id}")
        assert get_response.json()["title"] == new_title

    def test_admin_delete_gallery_image(self, admin_client):
        """Admin can delete gallery image"""
        unique_id = str(uuid.uuid4())[:8]
        # Create image
        create_resp = admin_client.post(f"{BASE_URL}/api/admin/gallery", json={
            "title": f"TEST_DELETE_{unique_id}",
            "category": "cad",
            "image_url": "https://example.com/delete-test.jpg"
        })
        assert create_resp.status_code == 200
        image_id = create_resp.json()["id"]
        # Delete it
        delete_resp = admin_client.delete(f"{BASE_URL}/api/admin/gallery/{image_id}")
        assert delete_resp.status_code == 200
        # Verify deleted
        get_resp = requests.get(f"{BASE_URL}/api/gallery/{image_id}")
        assert get_resp.status_code == 404

    def test_admin_gallery_requires_auth(self):
        """Admin gallery endpoint requires authentication"""
        response = requests.post(
            f"{BASE_URL}/api/admin/gallery",
            json={"title": "test", "category": "cad", "image_url": "http://test.com/img.jpg"}
        )
        assert response.status_code == 401

    def test_admin_wrong_credentials_rejected(self):
        """Wrong admin credentials are rejected"""
        response = requests.get(
            f"{BASE_URL}/api/admin/contacts",
            auth=("wrong", "credentials")
        )
        assert response.status_code == 401


class TestContactEndpoints:
    def test_create_contact_submission(self, api_client, created_contact_id):
        """Contact form submission works"""
        # created_contact_id fixture creates + verifies
        assert created_contact_id is not None

    def test_contact_submission_persists(self, api_client, created_contact_id):
        """Contact submissions are saved and retrievable by admin"""
        response = requests.get(
            f"{BASE_URL}/api/admin/contacts",
            auth=(ADMIN_USER, ADMIN_PASS)
        )
        assert response.status_code == 200
        contacts = response.json()
        ids = [c["id"] for c in contacts]
        assert created_contact_id in ids

    def test_contact_has_required_fields(self, api_client):
        """Contact submission response has required fields (Google Sheets backend - no is_read field)"""
        unique_id = str(uuid.uuid4())[:8]
        response = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": f"TEST_Fields_{unique_id}",
            "email": f"fields_{unique_id}@test.com",
            "message": "Testing required fields"
        })
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert "name" in data
        assert "email" in data
        assert "message" in data
        assert "created_at" in data
        # NOTE: is_read is NOT in POST response since contacts are stored in Google Sheets
        # is_read (always False) is only present in GET /admin/contacts response

    def test_contact_invalid_email_rejected(self, api_client):
        """Contact form rejects invalid email"""
        response = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "Test User",
            "email": "not-valid-email",
            "message": "Test message"
        })
        assert response.status_code == 422

    def test_admin_can_get_contacts(self):
        """Admin can retrieve contact submissions"""
        response = requests.get(
            f"{BASE_URL}/api/admin/contacts",
            auth=(ADMIN_USER, ADMIN_PASS)
        )
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    def test_admin_mark_contact_read_not_supported(self):
        """Mark-as-read endpoint removed: contacts stored in Google Sheets, read status not persisted"""
        response = requests.put(
            f"{BASE_URL}/api/admin/contacts/some-id/read",
            json={},
            auth=(ADMIN_USER, ADMIN_PASS)
        )
        # Endpoint no longer exists - returns 404
        assert response.status_code == 404

    def test_contacts_require_auth(self):
        """Admin contacts endpoint requires authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert response.status_code == 401
