# 🕉️ Sai Baba Janmasthan - Temple Management System

Complete digital platform for Sai Baba Janmasthan temple in Pathri, Maharashtra.

## 🌟 Features

### For Devotees
- 📱 Book sevas online
- 💰 Make donations
- 📅 View events calendar
- 🎥 Watch live darshan
- 📸 Browse photo gallery
- 📍 Get directions
- 📞 Contact temple

### For Administrators
- 📊 Analytics dashboard
- 🎫 Manage bookings
- 🙏 Manage sevas
- 💸 Track donations
- 🖼️ Manage gallery
- 📈 Generate reports
- 📥 Export data (CSV)

## 🏗️ Architecture

### Platforms
- **Frontend Website** - Next.js 16 + React 19
- **Admin Panel** - Next.js 16 + Tailwind CSS
- **Backend API** - NestJS + Prisma + PostgreSQL
- **Mobile App** - Flutter 3.38.3

### Tech Stack
- TypeScript (Frontend, Backend, Admin)
- Dart (Mobile)
- PostgreSQL (Database)
- Prisma ORM
- Material Design 3

## 📦 Project Structure

```
sai_baba_pathri/
├── frontend/          # Public website (Next.js)
├── admin/             # Admin panel (Next.js)
├── backend/           # REST API (NestJS)
├── mobile/            # Mobile app (Flutter)
├── DEPLOYMENT.md      # Deployment guide
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Flutter 3.38+ (for mobile)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

### Frontend Setup
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
npm run dev
```

### Admin Setup
```bash
cd admin
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
npm run dev
```

### Mobile Setup
```bash
cd mobile
flutter pub get
flutter run
```

## 📱 Mobile App Screens

1. **Home** - Quick actions and temple info
2. **Book Seva** - Browse and book sevas
3. **My Bookings** - Search and view bookings
4. **Live Darshan** - YouTube livestream
5. **Events** - Upcoming events calendar
6. **Gallery** - Photo gallery with categories
7. **Donations** - Make donations online
8. **About** - Temple history and significance
9. **Contact** - Contact info and directions

## 🌐 API Endpoints

### Public
- `GET /sevas` - List active sevas
- `POST /bookings` - Create booking
- `GET /bookings/search` - Search bookings
- `POST /donations` - Create donation
- `GET /gallery` - List gallery images
- `GET /events` - List events

### Admin (Auth Required)
- `GET /analytics/dashboard` - Dashboard stats
- `GET /bookings` - List all bookings
- `PATCH /sevas/:id` - Update seva
- `GET /donations` - List donations
- `GET /bookings/export/csv` - Export CSV

[See full API documentation](./backend/README.md)

## 🔒 Security

- JWT authentication
- Role-based access control (RBAC)
- Password hashing (bcrypt)
- SQL injection prevention (Prisma)
- XSS protection
- CORS configuration
- Input validation

## 🎨 Design System

### Colors
- Primary: `#F97316` (Saffron)
- Secondary: `#EA580C` (Orange)
- Background: `#FFFBF5` (Cream)

### Typography
- Headers: Bold, 24-48px
- Body: Regular, 14-16px

## 📊 Database Schema

- Users (Admin, Staff)
- Devotees
- Sevas
- Bookings
- Events
- Donations
- Gallery
- Inventory
- Transactions

[See full schema](./backend/prisma/schema.prisma)

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guide.

### Quick Deploy

**Backend (Railway)**
```bash
railway init
railway add postgresql
railway up
```

**Frontend (Vercel)**
```bash
vercel
```

**Mobile (Android)**
```bash
flutter build apk --release
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm run test
```

### Mobile
```bash
cd mobile
flutter test
```

## 📝 Environment Variables

### Backend
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
RAZORPAY_KEY_ID=optional
MAILGUN_API_KEY=optional
```

### Frontend/Admin
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 🤝 Contributing

This is a private project for Sai Baba Janmasthan temple.

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For technical support:
- Email: tech@saibabajanmasthan.org
- Phone: +91 1234567890

## 👥 Authors

- **Yujiao Hou** - Co-Developer
- **Saiesh Singh** - Co-Developer

## 🙏 Acknowledgments

Built with devotion for Sai Baba Janmasthan, Pathri.

**Jai Sai Nath! 🙏**

---

## 📈 Stats

- **Total Lines of Code**: ~18,000+
- **Platforms**: 4 (Web, Admin, Mobile, API)
- **Features**: 50+
- **Screens/Pages**: 27
- **API Endpoints**: 40+
- **Database Models**: 15

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Status**: Production Ready ✅
