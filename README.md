Production-grade Visitor Management System (VMS) application similar to a tablet-based kiosk app.

## 🧩 Tech Stack
Frontend:
- React (with TypeScript)
- Material UI (MUI) for UI components
- Responsive design optimized for tablet (10-inch screen)

Backend:
- Python FastAPI (or Node.js Express if preferred)
- REST APIs
- JWT authentication

Database:
- PostgreSQL

Storage:
- Cloud storage (AWS S3 or GCP Storage) for profile images & signatures

Deployment:
- Dockerized services
- Nginx for reverse proxy

---

## 📱 Core Features

### 1. Dashboard Screen
- Display 3 stats:
  - Visitors Today
  - Current Week Visitors
  - Current Month Visitors
- Grid menu with 6 options:
  - Guest Entry
  - Employee Entry
  - Checked-in Visitors
  - Visitor History
  - Manage Users
  - Reports

---

### 2. Guest Entry Flow
Create a form with:
- First Name (required)
- Last Name (required)
- Mobile Number (required, validation)
- Gender (Male/Female radio button)
- Company Name
- Email
- Person to Visit (required)
- Purpose of Visit (required)
- Upload Profile Picture (camera + upload)
- Signature Pad (draw + clear + save)

Buttons:
- Cancel
- Submit

On Submit:
- Save data in DB
- Generate unique Visitor ID
- Store image + signature
- Mark status = "Checked-In"
- Save timestamp (check-in time)

---

### 3. Employee Entry Flow
Fields:
- Employee Code (searchable)
- Auto-fill details after code match
- Mobile Number
- Gender
- Upload Profile Picture
- Signature

---

### 4. Checked-In Visitors Screen
- Table/List view
- Columns:
  - Name
  - Mobile
  - Person to Visit
  - Check-in Time
  - Status
- Actions:
  - Check-Out button
  - View Details

---

### 5. Visitor History
- Filter by:
  - Date range
  - Name
  - Mobile
- Show:
  - Check-in / Check-out time
  - Duration
  - Visit purpose

---

### 6. Reports Module
- Daily / Weekly / Monthly reports
- Export to:
  - CSV
  - PDF
- Metrics:
  - Total visitors
  - Peak hours
  - Frequent visitors

---

### 7. Manage Users (Admin)
- Add/Edit/Delete users
- Role-based access:
  - Admin
  - Receptionist

---

## 🔐 Security Features
- JWT Authentication
- Role-based access control
- Input validation (frontend + backend)
- Rate limiting APIs

---

## 🎨 UI/UX Requirements
- Clean modern UI (similar to kiosk apps)
- Large buttons for touch interaction
- Minimal typing (dropdowns where possible)
- Light theme with color-coded buttons:
  - Red → Guest
  - Blue → Checked-in
  - Purple → Employee
  - Green → Reports

---

## 📷 Special Features
- Camera integration for profile capture
- Signature pad using canvas
- Offline support (store locally & sync later)

---

## ⚙️ Backend API Design

Endpoints:

Auth:
- POST /login
- POST /register

Visitors:
- POST /visitors
- GET /visitors
- GET /visitors/:id
- PUT /visitors/:id/checkout

Reports:
- GET /reports/daily
- GET /reports/weekly
- GET /reports/monthly

Users:
- CRUD APIs

---

## 🗄️ Database Schema

Visitors Table:
- id
- first_name
- last_name
- mobile
- email
- gender
- company
- person_to_visit
- purpose
- check_in_time
- check_out_time
- status
- photo_url
- signature_url

Users Table:
- id
- name
- email
- password
- role

---

## 📦 Deliverables
- Full frontend + backend code
- Docker setup
- README with setup steps
- Sample data
- API documentation (Swagger)

---

## 💡 Bonus Features (if possible)
- QR code visitor pass
- SMS notification to employee
- Email confirmation
- Face recognition (optional)

---

Generate complete working code with folder structure and setup instructions.
