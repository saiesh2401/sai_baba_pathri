# Sai Baba Janmasthan Backend API

Backend API for the Sai Baba Janmasthan Digital Platform built with NestJS, Prisma, and PostgreSQL.

## Features

- 🔐 JWT Authentication
- 📿 Seva & Booking Management
- 📹 Livestream Configuration
- 📦 Inventory Management
- 💳 Payment Gateway (Sandbox Mode)
- 📚 API Documentation (Swagger)

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Set up database:**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database with initial data
npx prisma db seed
```

## Running the App

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Documentation

Swagger documentation is available at: `http://localhost:3000/api/docs`

## Default Credentials

After seeding, use these credentials to login:
- **Email:** admin@saibaba-pathri.org
- **Password:** admin123

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Sevas
- `GET /sevas` - List all sevas
- `POST /sevas` - Create seva (protected)
- `GET /sevas/:id` - Get seva details
- `PATCH /sevas/:id` - Update seva (protected)

### Bookings
- `POST /bookings` - Create booking
- `GET /bookings` - List bookings (protected)
- `GET /bookings/:id` - Get booking details
- `PATCH /bookings/:id/status` - Update booking status (protected)
- `GET /bookings/dashboard/stats` - Get dashboard stats (protected)

### Livestream
- `GET /livestream/current` - Get current stream status
- `PATCH /livestream` - Update stream config (protected)

### Inventory - Items
- `GET /inventory/items` - List items (protected)
- `POST /inventory/items` - Create item (protected)
- `GET /inventory/items/low-stock` - Get low stock items (protected)
- `GET /inventory/items/:id/stock` - Get item stock level (protected)

### Inventory - Locations
- `GET /inventory/locations` - List locations (protected)
- `POST /inventory/locations` - Create location (protected)

### Inventory - Transactions
- `GET /inventory/transactions` - List transactions (protected)
- `POST /inventory/transactions` - Create transaction (protected)
- `GET /inventory/transactions/dashboard/stats` - Get stats (protected)

### Payments (Sandbox)
- `POST /payments/initiate/:bookingId` - Initiate payment
- `POST /payments/verify` - Verify payment
- `GET /payments/sandbox/:bookingId` - Sandbox payment page
- `POST /payments/sandbox/:bookingId/success` - Mark as paid
- `POST /payments/sandbox/:bookingId/failure` - Mark as failed

## Database Schema

The database includes the following main entities:
- Users (Authentication)
- Devotees
- Sevas
- Events
- Bookings
- Livestream
- Content
- Items (Inventory)
- Locations (Inventory)
- Transactions (Inventory)

## Payment Gateway

Currently configured in **sandbox mode**. All payments are simulated.

To enable production payments:
1. Set `PAYMENT_MODE=production` in `.env`
2. Add Razorpay credentials
3. Implement actual Razorpay integration in `payment.service.ts`

## Development

```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Lint
npm run lint

# Format
npm run format
```

## License

MIT
