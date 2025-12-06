# Backend API

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL database (you can use Docker):
```bash
docker run --name pathri-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=pathri_db -p 5432:5432 -d postgres:14
```

Or install PostgreSQL locally and create a database named `pathri_db`.

3. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Seed the database:
```bash
npx prisma db seed
```

5. Start the server:
```bash
npm run start:dev
```

6. Access API documentation:
Open http://localhost:3000/api/docs

## Login Credentials

- Email: admin@saibaba-pathri.org
- Password: admin123

## Next Steps

After backend is running, we'll create:
- Frontend website (Next.js)
- Admin panel (Next.js)
- Mobile app (Flutter)
