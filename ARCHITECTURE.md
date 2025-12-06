# System Architecture
## Sai Baba Janmasthan Digital Platform

### 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTENDS                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Website    │  │  Mobile App  │  │ Admin Panel  │  │
│  │  (Next.js)   │  │  (Flutter)   │  │  (Next.js)   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │ HTTPS/REST
                    ┌────────▼────────┐
                    │   API Gateway   │
                    │   (REST/JSON)   │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   ┌──────▼──────┐  ┌────────▼────────┐  ┌─────▼──────┐
   │   Temple    │  │   Inventory     │  │  Payment   │
   │   Service   │  │   Service       │  │  Service   │
   └──────┬──────┘  └────────┬────────┘  └─────┬──────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                    ┌────────▼────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘

┌─────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Razorpay │  │ YouTube  │  │   SMS    │  │  Email  │ │
│  │ Payments │  │   Live   │  │ Gateway  │  │ Service │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### 2. Component Details

#### 2.1 Frontend Layer

**Public Website (Next.js)**
- Server-side rendering for SEO
- Static generation for content pages
- Responsive design (mobile-first)
- Progressive Web App (PWA) capabilities

**Mobile App (Flutter)**
- Cross-platform (iOS & Android)
- Native performance
- Offline-first architecture
- Push notification support

**Admin Panel (Next.js)**
- Role-based dashboards
- Real-time data updates
- Advanced filtering & reporting
- Responsive tablet/desktop UI

#### 2.2 Backend Services

**Temple Service**
- Seva management
- Booking lifecycle
- Livestream configuration
- Content management
- Event scheduling

**Inventory Service**
- Item & location management
- Stock transactions
- Usage tracking
- Low-stock alerts
- Report generation

**Payment Service**
- Gateway integration
- Transaction management
- Webhook handling
- Refund processing

**Notification Service**
- SMS delivery
- Email campaigns
- Push notifications
- Template management

**Auth Service**
- User authentication
- Role-based authorization
- Session management
- API key management

#### 2.3 Data Layer

**PostgreSQL Database**

Schema organization:
- `temple` schema: Devotees, Sevas, Bookings, Events, Content
- `inventory` schema: Items, Locations, Transactions
- `auth` schema: Users, Roles, Permissions
- `payments` schema: Transactions, Refunds

**File Storage (S3-compatible)**
- Gallery images
- Event photos
- User uploads
- Generated reports

---

### 3. API Design

#### 3.1 REST API Structure

**Base URL:** `https://api.saibaba-pathri.org/v1`

**Authentication:** Bearer token (JWT)

**Key Endpoints:**

```
Temple Core:
  GET    /sevas
  GET    /sevas/:id
  POST   /bookings
  GET    /bookings/:id
  PATCH  /bookings/:id/checkin
  PATCH  /bookings/:id/complete
  GET    /livestream/current
  POST   /donations

Inventory:
  GET    /inventory/items
  POST   /inventory/items
  GET    /inventory/locations
  POST   /inventory/transactions
  GET    /inventory/stock/:locationId
  GET    /inventory/reports/usage

Admin:
  GET    /admin/dashboard
  GET    /admin/bookings
  POST   /admin/events
  PATCH  /admin/livestream
  GET    /admin/reports

Payments:
  POST   /payments/initiate
  POST   /payments/webhook
  GET    /payments/:id/status
```

#### 3.2 Data Flow Examples

**Booking Flow:**
```
1. Client → POST /bookings (devotee info, seva, date)
2. Server → Create booking (status: PENDING)
3. Server → POST /payments/initiate
4. Server → Return payment URL
5. Client → Redirect to payment gateway
6. Gateway → POST /payments/webhook (success/failure)
7. Server → Update booking status (PAID/FAILED)
8. Server → Send confirmation (SMS/Email/Push)
```

**Inventory Transaction Flow:**
```
1. Client → POST /inventory/transactions
   {
     type: "TRANSFER",
     from: "MAIN_STORE",
     to: "KITCHEN",
     items: [{id: 1, quantity: 10}]
   }
2. Server → Validate stock availability
3. Server → Create transaction records
4. Server → Update stock levels
5. Server → Check low-stock thresholds
6. Server → Send alerts if needed
```

---

### 4. Database Schema (Key Tables)

#### Temple Schema

```sql
-- Devotees
CREATE TABLE devotees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(255),
  gotra VARCHAR(100),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sevas
CREATE TABLE sevas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  base_amount DECIMAL(10,2),
  is_daily BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true
);

-- Bookings
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  devotee_id INTEGER REFERENCES devotees(id),
  seva_id INTEGER REFERENCES sevas(id),
  event_id INTEGER REFERENCES events(id),
  booking_date DATE NOT NULL,
  amount DECIMAL(10,2),
  payment_status VARCHAR(20), -- PENDING, PAID, FAILED
  payment_id VARCHAR(255),
  checked_in BOOLEAN DEFAULT false,
  pooja_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  description TEXT,
  capacity INTEGER,
  is_active BOOLEAN DEFAULT true
);
```

#### Inventory Schema

```sql
-- Items
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50), -- KITCHEN, POOJA, SHOP, OTHER
  unit VARCHAR(20), -- KG, LITRE, PIECE, etc.
  min_stock DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true
);

-- Locations
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50), -- STORE, TEMPLE, KITCHEN, SHOP, OFFICE
  description TEXT
);

-- Transactions
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES items(id),
  from_location_id INTEGER REFERENCES locations(id),
  to_location_id INTEGER REFERENCES locations(id),
  quantity DECIMAL(10,2) NOT NULL,
  type VARCHAR(20), -- PURCHASE, DONATION, TRANSFER, CONSUMPTION, SALE, ADJUSTMENT
  notes TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Stock View (Computed)
CREATE VIEW stock_levels AS
SELECT 
  item_id,
  to_location_id as location_id,
  SUM(quantity) as current_stock
FROM transactions
GROUP BY item_id, to_location_id;
```

---

### 5. Security Architecture

#### 5.1 Authentication & Authorization

**JWT-based Authentication:**
- Access token (15 min expiry)
- Refresh token (7 days expiry)
- Secure HTTP-only cookies

**Role-Based Access Control (RBAC):**
```
Roles:
  - PUBLIC (devotees)
  - STAFF (counter/pooja team)
  - STOREKEEPER
  - MANAGER
  - ADMIN

Permissions:
  - bookings.view
  - bookings.create
  - bookings.update
  - inventory.view
  - inventory.manage
  - content.manage
  - reports.view
```

#### 5.2 Data Security

- All data encrypted at rest (AES-256)
- TLS 1.3 for data in transit
- PCI DSS compliance for payment data
- Regular security audits
- Input validation & sanitization
- SQL injection prevention (parameterized queries)
- XSS protection

---

### 6. Scalability & Performance

#### 6.1 Caching Strategy

**Redis Cache:**
- Seva list (1 hour TTL)
- Event calendar (30 min TTL)
- Livestream status (5 min TTL)
- Stock levels (10 min TTL)

**CDN:**
- Static assets (images, CSS, JS)
- Gallery media
- Public content pages

#### 6.2 Database Optimization

- Indexes on frequently queried columns
- Materialized views for reports
- Connection pooling
- Read replicas for analytics

#### 6.3 Load Balancing

- Horizontal scaling of API servers
- Auto-scaling based on traffic
- Health checks & failover

---

### 7. Monitoring & Observability

**Metrics:**
- API response times
- Error rates
- Database query performance
- Payment success rates
- Booking conversion rates

**Logging:**
- Structured JSON logs
- Centralized log aggregation
- Log retention (90 days)

**Alerts:**
- API downtime
- Payment failures
- Low stock levels
- Database connection issues

---

### 8. Disaster Recovery

**Backup Strategy:**
- Automated daily DB backups (retained 30 days)
- Weekly full backups (retained 1 year)
- File storage snapshots (daily)

**Recovery Plan:**
- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 24 hours
- Documented recovery procedures
- Regular DR drills

---

### 9. Development Workflow

**Version Control:**
- Git (GitHub/GitLab)
- Branch strategy: main, staging, feature branches
- Pull request reviews

**CI/CD Pipeline:**
```
1. Code push → GitHub
2. Run tests (unit, integration)
3. Build Docker images
4. Deploy to staging
5. Run E2E tests
6. Manual approval
7. Deploy to production
8. Run smoke tests
```

**Testing Strategy:**
- Unit tests (80% coverage)
- Integration tests
- E2E tests (critical flows)
- Load testing (before major releases)
