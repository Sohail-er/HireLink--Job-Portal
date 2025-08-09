# Admin Dashboard Setup Guide

## Overview
The admin dashboard allows administrators to manage employers and job seekers by activating/deactivating their accounts.

## Admin User Credentials
- **Email:** admin@hirelink.com
- **Password:** Admin@123

## Features
1. **Dashboard Statistics**
   - Total Users
   - Total Employers
   - Total Job Seekers
   - Active Users

2. **User Management**
   - View all employers
   - View all job seekers
   - Activate/Deactivate users
   - Toggle user status with switch

3. **Security**
   - Admin-only access
   - Role-based authorization
   - Protected routes

## Database Changes
- Added `active` field to User entity (default: true)
- Added admin user creation on application startup
- Added repository methods for user filtering and counting

## API Endpoints
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/employers` - Get all employers
- `GET /api/admin/users/applicants` - Get all job seekers
- `PUT /api/admin/users/{userId}/activate` - Activate user
- `PUT /api/admin/users/{userId}/deactivate` - Deactivate user
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

## Frontend Components
- `AdminDashboard.tsx` - Main dashboard component
- `AdminDashboardPage.tsx` - Page wrapper
- `AdminService.tsx` - API service functions

## Navigation
- Admin Dashboard link appears in navigation for ADMIN users only
- Accessible at `/admin-dashboard` route

## Security Notes
- Only users with ADMIN role can access admin endpoints
- Deactivated users cannot login
- Admin user is automatically created on first application startup
