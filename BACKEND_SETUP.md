# Backend Setup Guide

Complete guide to set up and run the NestJS + PostgreSQL backend for TalkItOut Admin Portal.

## 📋 Prerequisites

- Node.js 20+ or Bun
- PostgreSQL 16+ (or Docker)
- Git

## 🚀 Quick Start (5 Minutes)

### Option 1: Using Docker Compose (Recommended)

This will start everything: Frontend, Backend, and Database.

```bash
# From project root
docker-compose up -d

# Wait for services to start (about 30 seconds)
docker-compose logs -f backend

# Once you see "Server is running on: http://localhost:3001"
# Access the admin portal at: http://localhost:5173/admin/login
```

Done! Skip to the [Testing](#testing) section.

---

### Option 2: Manual Setup (Development)

#### Step 1: Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

**Or use Docker:**
```bash
docker run --name talkitout-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=talkitout \
  -p 5432:5432 \
  -d postgres:16-alpine
```

#### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# In psql shell:
CREATE DATABASE talkitout;
\q
```

#### Step 3: Set Up Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install
# or
bun install

# Copy environment file
cp .env.example .env

# Edit .env if needed (default settings should work)
nano .env  # or use your preferred editor
```

#### Step 4: Initialize Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with demo data
npm run prisma:seed
```

You should see:
```
✅ Created admin user: admin@talkitout.com
✅ Created therapist: therapist@talkitout.com
✅ Created intern: intern@talkitout.com
✅ Created time slots for therapist
🎉 Seeding completed successfully!
```

#### Step 5: Start Backend Server

```bash
# Development mode (hot-reload)
npm run start:dev

# You should see:
# 🚀 Server is running on: http://localhost:3001
# 📚 API Documentation: http://localhost:3001/api/docs
```

#### Step 6: Update Frontend

```bash
# In a new terminal, go to project root
cd ..

# Create .env file for frontend
cp .env.example .env

# Start frontend
npm run dev
```

Access the admin portal at: **http://localhost:5173/admin/login**

---

## 🔧 Configuration

### Backend Environment Variables

Edit `backend/.env`:

```env
# Database Connection
DATABASE_URL="postgresql://postgres:password@localhost:5432/talkitout?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRATION="7d"

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS (Frontend URLs)
CORS_ORIGIN="http://localhost:5173"
```

### Frontend Environment Variables

Edit `.env` in project root:

```env
# API Backend URL
VITE_API_URL=http://localhost:3001/api

# Environment
VITE_ENV=development
```

---

## 🧪 Testing

### 1. Test Backend API

```bash
# Check health
curl http://localhost:3001/api

# View API documentation
open http://localhost:3001/api/docs
```

### 2. Test Authentication

```bash
# Login as admin
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@talkitout.com","password":"password123"}'

# You should get a response with a token
```

### 3. Test Admin Portal

1. Go to http://localhost:5173/admin/login
2. Login with: **admin@talkitout.com** / **password123**
3. You should see the dashboard

---

## 📊 Database Management

### View Database in GUI

```bash
cd backend
npm run prisma:studio
```

Opens Prisma Studio at http://localhost:5555

### Common Database Commands

```bash
# Reset database (⚠️ destructive)
npm run prisma:migrate reset

# Create new migration
npm run prisma:migrate dev --name your_migration_name

# Generate Prisma Client after schema changes
npm run prisma:generate

# Seed database
npm run prisma:seed
```

---

## 🔐 Demo Accounts

After seeding, you can login with:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@talkitout.com | password123 |
| Therapist | therapist@talkitout.com | password123 |
| Intern | intern@talkitout.com | password123 |

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error: `ECONNREFUSED ::1:5432`**
- PostgreSQL is not running
- Solution: `brew services start postgresql@16` (macOS) or start Docker container

**Error: `database "talkitout" does not exist`**
- Database not created
- Solution: `createdb talkitout` or run setup steps again

**Error: `Port 3001 already in use`**
- Another process is using port 3001
- Solution: `lsof -ti:3001 | xargs kill` or change PORT in .env

### Frontend Can't Connect to Backend

**Error: `Network Error` or `Failed to fetch`**
- Backend is not running
- Solution: Start backend with `npm run start:dev`

**Error: `CORS Error`**
- CORS origin mismatch
- Solution: Check `CORS_ORIGIN` in backend/.env matches your frontend URL

### Database Issues

**Prisma Client errors**
```bash
# Regenerate Prisma Client
npm run prisma:generate

# If still having issues, reset:
rm -rf node_modules
npm install
npm run prisma:generate
```

**Migration errors**
```bash
# Reset migrations (⚠️ will delete data)
npm run prisma:migrate reset

# Or manually:
dropdb talkitout
createdb talkitout
npm run prisma:migrate
npm run prisma:seed
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/validate` - Validate token

### Users (Admin only)
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Doctors (Admin only)
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/therapists` - List therapists
- `POST /api/doctors` - Create doctor
- `POST /api/doctors/assign-intern` - Assign intern

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create customer
- `POST /api/customers/assign-intern` - Assign to intern

### Appointments
- `GET /api/appointments` - List all appointments
- `POST /api/appointments` - Create appointment
- `PATCH /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

Full API documentation: http://localhost:3001/api/docs

---

## 🔄 Switching from Mock to Real API

The frontend is currently using mock data. To switch to the real backend:

1. Make sure backend is running
2. Update the frontend to use real API:

```typescript
// In your components, change:
import { usersApi } from '@/services/api';

// To:
import { usersApi } from '@/services/api-real';
```

Or replace the entire `src/services/api.ts` file with `api-real.ts`.

---

## 🚢 Production Deployment

### Environment Variables

Set these in production:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="strong-random-secret-use-openssl-rand-base64-32"
JWT_EXPIRATION="7d"
PORT=3001
NODE_ENV="production"
CORS_ORIGIN="https://yourdomain.com"
```

### Build for Production

```bash
cd backend
npm run build
npm run start:prod
```

### Deploy with Docker

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📚 Next Steps

1. ✅ Backend is running
2. ✅ Database is seeded
3. ✅ Frontend is connected
4. **Now**: Read [ADMIN_SYSTEM.md](./ADMIN_SYSTEM.md) for feature documentation
5. **Then**: Start customizing the system for your needs

---

## 💡 Tips

- Use **Prisma Studio** (`npm run prisma:studio`) to view/edit database
- Check **API docs** at `/api/docs` for request/response examples
- Enable **hot-reload** in dev mode for faster development
- Use **Docker** for consistent environment across team
- Set up **environment-specific** configs for dev/staging/prod

---

## 🆘 Need Help?

1. Check the [Troubleshooting](#troubleshooting) section
2. Review backend logs: `docker-compose logs -f backend`
3. Check database: `npm run prisma:studio`
4. Review API docs: http://localhost:3001/api/docs

---

**Happy Coding! 🎉**
