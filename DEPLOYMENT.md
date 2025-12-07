# Sai Baba Pathri - Complete Deployment Guide

## 🚀 Quick Start Deployment

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed
- Flutter 3.38+ installed (for mobile)
- Git installed

---

## 📦 Backend Deployment

### Option 1: Railway (Recommended - Easiest)

**1. Create Railway Account**
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

**2. Deploy Backend**
```bash
cd backend
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add PostgreSQL
railway add postgresql

# Deploy
railway up
```

**3. Set Environment Variables in Railway Dashboard**
```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-secret-key-min-32-chars
PORT=3000
NODE_ENV=production

# Optional - Payment
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx

# Optional - Email
MAILGUN_API_KEY=xxx
MAILGUN_DOMAIN=mg.yourdomain.com
MAILGUN_FROM_EMAIL=noreply@yourdomain.com

# Optional - SMS
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+1234567890
```

**4. Run Migrations**
```bash
railway run npx prisma migrate deploy
railway run npx prisma generate
```

**5. Get Your API URL**
- Copy the Railway URL (e.g., `https://your-app.railway.app`)

### Option 2: Manual VPS Deployment

**1. Server Setup (Ubuntu)**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2
```

**2. Database Setup**
```bash
sudo -u postgres psql
CREATE DATABASE sai_baba_pathri;
CREATE USER dbuser WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE sai_baba_pathri TO dbuser;
\q
```

**3. Deploy Application**
```bash
# Clone repository
git clone https://github.com/saiesh2401/sai_baba_pathri.git
cd sai_baba_pathri/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add all environment variables

# Run migrations
npx prisma migrate deploy
npx prisma generate

# Build
npm run build

# Start with PM2
pm2 start dist/main.js --name sai-baba-api
pm2 save
pm2 startup
```

**4. Setup Nginx**
```bash
sudo apt install nginx

# Create config
sudo nano /etc/nginx/sites-available/sai-baba-api

# Add configuration:
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/sai-baba-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**5. SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended - Easiest)

**1. Install Vercel CLI**
```bash
npm install -g vercel
```

**2. Deploy Frontend**
```bash
cd frontend

# Create .env.local
echo "NEXT_PUBLIC_API_URL=https://your-api-url.railway.app" > .env.local

# Deploy
vercel

# Follow prompts
# Set environment variable in Vercel dashboard
```

**3. Configure Domain**
- Add custom domain in Vercel dashboard
- Update DNS records

### Option 2: Manual Deployment

**1. Build**
```bash
cd frontend
npm install
npm run build
```

**2. Deploy with PM2**
```bash
pm2 start npm --name "sai-baba-frontend" -- start
pm2 save
```

**3. Nginx Configuration**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 👨‍💼 Admin Panel Deployment

**Same as Frontend - Deploy to Vercel or VPS**

```bash
cd admin

# Create .env.local
echo "NEXT_PUBLIC_API_URL=https://your-api-url.railway.app" > .env.local

# Deploy to Vercel
vercel
```

---

## 📱 Mobile App Deployment

### Android

**1. Update API URL**
```dart
// lib/services/api_service.dart
static const String baseUrl = 'https://your-api-url.railway.app';
```

**2. Build APK**
```bash
cd mobile

# Build release APK
flutter build apk --release

# APK location:
# build/app/outputs/flutter-apk/app-release.apk
```

**3. Distribute**
- Upload to Google Play Store
- Or distribute APK directly

### iOS (Requires Mac)

**1. Update API URL** (same as Android)

**2. Build**
```bash
flutter build ios --release
```

**3. Distribute**
- Open Xcode
- Archive and upload to App Store Connect
- Submit for review

---

## 🔧 Environment Variables Reference

### Backend (.env)
```env
# Database (Required)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Security (Required)
JWT_SECRET=your-secret-key-minimum-32-characters
PORT=3000
NODE_ENV=production

# Payment (Optional - for live payments)
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx

# Email (Optional - for notifications)
MAILGUN_API_KEY=xxx
MAILGUN_DOMAIN=mg.yourdomain.com
MAILGUN_FROM_EMAIL=noreply@yourdomain.com

# SMS (Optional - for SMS notifications)
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+1234567890
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Admin (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## 🧪 Testing Deployment

### Backend
```bash
curl https://your-api-url.railway.app/sevas
# Should return list of sevas
```

### Frontend
- Visit https://yourdomain.com
- Test booking flow
- Check all pages load

### Admin
- Visit https://admin.yourdomain.com
- Login with credentials
- Test CRUD operations

### Mobile
- Install APK on Android device
- Test all features
- Verify API connectivity

---

## 📊 Monitoring & Maintenance

### Backend Monitoring
```bash
# View logs (Railway)
railway logs

# View logs (PM2)
pm2 logs sai-baba-api

# Monitor processes
pm2 monit
```

### Database Backup
```bash
# Automated daily backup
pg_dump -U dbuser sai_baba_pathri > backup_$(date +%Y%m%d).sql

# Restore
psql -U dbuser sai_baba_pathri < backup_20231206.sql
```

### SSL Renewal
```bash
# Auto-renews with certbot
sudo certbot renew --dry-run
```

---

## 💰 Cost Estimate

### Minimal Setup (Recommended for Start)
- **Railway**: $5/month (Backend + Database)
- **Vercel**: Free (Frontend + Admin)
- **Domain**: $12/year
- **Total**: ~$6/month + $12/year

### Production Setup
- **Railway Pro**: $20/month
- **Vercel Pro**: $20/month
- **Domain**: $12/year
- **Total**: ~$40/month + $12/year

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check logs
railway logs
# or
pm2 logs

# Common issues:
# - DATABASE_URL not set
# - JWT_SECRET not set
# - Port already in use
```

### Frontend can't connect to API
```bash
# Check NEXT_PUBLIC_API_URL
echo $NEXT_PUBLIC_API_URL

# Verify CORS settings in backend
# Check browser console for errors
```

### Database migration fails
```bash
# Reset database (CAUTION: deletes data)
npx prisma migrate reset

# Or manually run migrations
npx prisma migrate deploy
```

---

## 📞 Support

For deployment issues:
1. Check logs first
2. Verify environment variables
3. Test API endpoints manually
4. Check firewall/security groups

---

**Deployment Complete! 🎉**

Your temple management system is now live and serving devotees worldwide!
