# Software Requirements Specification
## Sai Baba Janmasthan Digital Platform, Pathri

### 1. Project Overview

**Name:** Digital Platform for Sai Baba Janmasthan, Pathri

**Goal:** End-to-end digital system to:
- Inform devotees about the temple
- Enable online booking of daily abhishekams & special poojas
- Provide daily livestream darshan
- Offer mobile access to all features
- Manage internal inventory for temple, kitchen, shop, and pooja items

---

### 2. User Roles

| Role | Access | Responsibilities |
|------|--------|------------------|
| **Devotee** | Public Website, Mobile App | View info, book sevas, watch livestream, donate |
| **Temple Staff** | Admin Panel, Tablet | View bookings, mark check-ins, track pooja completion |
| **Storekeeper** | Admin Panel | Manage stock, record purchases/donations, issue items |
| **Temple Manager** | Admin Panel | View reports, manage content, oversee operations |
| **System Admin** | Full Access | Configuration, deployment, security, user management |

---

### 3. Functional Modules

#### 3.1 Public Website
- Home
- About Temple & History
- Darshan & Aarti Timings
- Events/Utsav Calendar
- Book Seva / Pooja
- Live Darshan
- Donations
- How to Reach
- Gallery (Photos/Videos)
- Contact

#### 3.2 Mobile App (Devotee)
- Onboarding / Language selection
- Home dashboard
- Book Seva / Pooja
- My Bookings
- Live Darshan
- Events calendar
- Aarti Lyrics & Media
- Profile management
- Notifications center

#### 3.3 Admin Console (Web)
- Dashboard (bookings + inventory overview)
- Seva & Event Management
- Booking Management
- Livestream Management
- Inventory / Stock Management
- Content Management (pages, gallery, events)
- User & Role Management
- Reports & Exports

#### 3.4 Inventory System
- Item Master
- Location Master
- Stock Transactions (Inward/Transfer/Consumption/Sale/Adjustment)
- Daily Usage Templates (Pooja & Kitchen)
- Stock Dashboards & Low-stock Alerts
- Reports (Monthly usage, donations, purchases)

#### 3.5 Cross-cutting Services
- Authentication & Authorization
- Payment Gateway Integration
- Notifications (SMS/Email/Push)
- File Storage
- Logging & Audit

---

### 4. Key User Journeys

#### 4.1 Book Daily Abhishekam
1. Devotee opens website/app → "Book Seva"
2. Selects "Daily Abhishekam" + date
3. Enters details (name, gotra, phone, email)
4. Makes payment via gateway
5. Receives confirmation (SMS/Email/Push)
6. Staff marks check-in on arrival
7. Staff marks pooja completion

#### 4.2 Book Special Pooja (Festival)
1. Browse "Special Pooja / Events"
2. Select event and seva type
3. Enter details → payment → confirmation
4. Staff manages on event day

#### 4.3 Watch Livestream
1. Tap "Live Darshan"
2. System checks if live
3. Shows embedded player or next timing
4. Admin manages stream URL and status

#### 4.4 Inventory - Purchase & Donation
1. Storekeeper adds stock via admin
2. Records purchase or donation
3. Selects items, quantities, location
4. System creates transactions

#### 4.5 Inventory - Internal Issues
1. Transfer stock between locations
2. Record daily usage (pooja/kitchen)
3. System tracks consumption

---

### 5. Data Models

#### 5.1 Temple Core Entities

**Devotee/User**
- Personal info (name, phone, email, gotra, address)
- Login credentials (optional)

**Seva**
- Type (Daily Abhishekam, Special Pooja, Annadan, etc.)
- Flags (daily vs special, base amount, description)

**Seva Events**
- Special days (Guru Purnima, Janmotsav, etc.)
- Date/time, capacity, notes

**Bookings**
- Devotee reference
- Seva type, date/event
- Amount, payment status
- Check-in status, pooja status

**Livestream**
- Platform, URL, is_live flag
- Stream history

**Content**
- Pages (About, Timings, etc.)
- Events (calendar)
- Media (gallery)

#### 5.2 Inventory Entities

**Items**
- Name, category, unit, min stock

**Locations**
- MAIN_STORE, TEMPLE_POOJA_ROOM, KITCHEN, SHOP, OFFICE

**Transactions**
- From/to location
- Quantity, type (PURCHASE/DONATION/TRANSFER/CONSUMPTION/SALE/ADJUSTMENT)
- Timestamp, notes, user

**Suppliers/Donors**
- Contact info, history

---

### 6. Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend Web** | Next.js (React), Tailwind CSS |
| **Mobile App** | Flutter |
| **Backend** | Node.js (NestJS/Express) or Supabase |
| **Database** | PostgreSQL |
| **File Storage** | S3-compatible (Supabase/AWS) |
| **Payments** | Razorpay/PayU/CCAvenue |
| **SMS** | Twilio/Textlocal |
| **Email** | SendGrid/Mailgun |
| **Push Notifications** | Firebase Cloud Messaging |
| **Livestream** | YouTube Live (embed) |

---

### 7. Deployment & DevOps

**Environments:**
- `dev` - Development & testing
- `staging` - Pre-production
- `production` - Live system

**CI/CD:**
- Automatic build & deploy from main branch
- Database migrations
- Automated testing

**Monitoring:**
- Error tracking (Sentry)
- Performance metrics
- Uptime monitoring

**Backups:**
- Daily automated DB backups
- File storage snapshots

---

### 8. Phased Delivery

#### Phase 1 - Core Public Experience
- Website with content
- Live Darshan embed
- Basic Seva booking (pay at counter)

#### Phase 2 - Full Booking + Mobile
- Online payment integration
- Complete booking lifecycle
- Mobile app launch
- Push notifications

#### Phase 3 - Inventory System
- Items, locations, transactions
- Dashboards & alerts
- Daily usage templates
- Reports

#### Phase 4 - Optimization
- Advanced analytics
- Festival-specific features
- POS for shop (optional)
- Automated livestream scheduling

---

### 9. Security & Compliance

- SSL/TLS encryption
- Secure payment gateway integration
- Role-based access control (RBAC)
- Data backup & recovery
- PCI DSS compliance for payments
- GDPR-compliant data handling

---

### 10. Non-Functional Requirements

- **Performance:** Page load < 3 seconds
- **Availability:** 99.5% uptime
- **Scalability:** Support 1000+ concurrent users
- **Mobile Responsive:** All screens optimized for mobile
- **Accessibility:** WCAG 2.1 Level AA compliance
- **Browser Support:** Chrome, Firefox, Safari, Edge (latest 2 versions)
