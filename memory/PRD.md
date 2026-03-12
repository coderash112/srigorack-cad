# SriGoRack Technologies - Product Requirements Document

## Original Problem Statement
Create a modern, premium, dark-themed e-commerce website for SriGoRack Technologies Pvt Ltd that provides CAD Design and Rendering services for diamond and jewelry manufacturers.

## Target Audience
- Diamond manufacturers
- Jewelry retailers
- Jewelry design studios

## Core Requirements (Static)
1. **Dark Luxury Theme**: Deep obsidian (#050505) with gold (#D4AF37) accents
2. **Multi-page Website**: Home, Designs, Pricing, About, Contact, Admin
3. **Gallery Management**: CMS-ready admin panel for uploading CAD/rendering images
4. **Contact Form**: Store submissions in database
5. **Subscription Pricing**: 3 tiers - Starter ($799), Professional ($1,299), Enterprise ($1,999)

## User Personas
1. **Jewelry Manufacturer**: Needs bulk CAD designs and renderings monthly
2. **Jewelry Retailer**: Needs occasional designs for new collections
3. **Design Studio**: Needs premium rendering services

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + shadcn/ui
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Authentication**: Basic Auth for Admin panel

## What's Been Implemented (Jan 2026)

### Pages
- ✅ Home Page with Hero, Services, Gallery Preview, Pricing Preview, CTA
- ✅ Designs Page with tabbed gallery (All/CAD/Rendering)
- ✅ Pricing Page with 3 subscription tiers
- ✅ About Us Page with company info and values
- ✅ Contact Page with form
- ✅ Admin Panel for gallery and contact management

### Features
- ✅ Responsive navigation with sticky header
- ✅ Lightbox for gallery image preview
- ✅ Contact form with database storage
- ✅ Admin authentication (Basic Auth)
- ✅ Gallery CRUD operations
- ✅ Contact submissions management
- ✅ Smooth animations with Framer Motion
- ✅ Mobile responsive design

### APIs
- GET /api/gallery - Fetch gallery images
- POST /api/admin/gallery - Add new image (auth required)
- PUT /api/admin/gallery/{id} - Update image (auth required)
- DELETE /api/admin/gallery/{id} - Delete image (auth required)
- POST /api/contact - Submit contact form
- GET /api/admin/contacts - View contact submissions (auth required)

## Test Coverage
- Backend: 20/20 tests passing (100%)
- Frontend: 40/40 tests passing (100%)

## Prioritized Backlog

### P0 (Critical) - Done
- [x] All pages implemented
- [x] Gallery management
- [x] Contact form

### P1 (High Priority) - Future
- [ ] Email notifications for contact form submissions
- [ ] Image upload to cloud storage (currently URL-based)
- [ ] SEO meta tags optimization

### P2 (Medium Priority) - Future
- [ ] Video showcase section
- [ ] Live chat integration
- [ ] Portfolio filtering by jewelry type

## Contact Information
- Email: ashrut@gorack.in
- Phone: +91-9981834205

## Admin Credentials
- Username: admin
- Password: srigorack2024
