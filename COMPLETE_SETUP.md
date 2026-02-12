# 🎉 Complete TalkItOut Admin System

## Overview

A full-stack admin portal with:
- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: NestJS + PostgreSQL + Prisma
- **Infrastructure**: Docker Compose

---

## 📁 Project Structure

```
talkitout.com/
├── backend/                    # NestJS Backend API
│   ├── src/
│   │   ├── auth/              # JWT Authentication
│   │   ├── users/             # User Management
│   │   ├── doctors/           # Doctor Management  
│   │   ├── customers/         # Customer Management
│   │   ├── appointments/      # Appointment Booking
│   │   └── prisma/            # Database Service
│   ├── prisma/
│   │   ├── schema.prisma      # Database Schema
│   │   └── seed.ts            # Seed Data
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── src/                       # React Frontend
│   ├── components/
│   │   ├── admin/             # Admin Components
│   │   └── ui/                # UI Components (shadcn)
│   ├── contexts/
│   │   └── AuthContext.tsx    # Authentication Context
│   ├── pages/
│   │   └── admin/             # Admin Pages
│   ├── services/
│   │   ├── api.ts             # Mock API (Development)
│   │   └── api-real.ts        # Real API (Production)
│   └── types/
│       └── admin.ts           # TypeScript Types
│
├── docker-compose.yml         # Docker Configuration
├── BACKEND_SETUP.md           # Backend Setup Guide
├── ADMIN_SYSTEM.md            # Admin System Documentation
└── QUICK_START.md             # Quick Start Guide
```

---

## 🚀 Quick Start

### Option 1: Docker (Simplest)

```bash
# Start everything
docker-compose up -d

# Wait 30 seconds, then access:
# Admin Portal: http://localhost:5173/admin/login
# Backend API: http://localhost:3001/api/docs
```

### Option 2: Manual (Development)

**Terminal 1 - Database:**
```bash
docker run --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=talkitout \
  -p 5432:5432 -d postgres:16-alpine
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

**Terminal 3 - Frontend:**
```bash
npm install
npm run dev
```

Access: http://localhost:5173/admin/login

---

## 🔐 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@talkitout.com | password123 |
| **Therapist** | therapist@talkitout.com | password123 |
| **Intern** | intern@talkitout.com | password123 |

---

## ✨ Features

### 1. Authentication
- JWT-based authentication
- Role-based access control
- Protected routes
- Token persistence

### 2. User Management (Admin Only)
- Create, read, update, delete users
- Multiple roles: Admin, Therapist, Intern, Customer
- User activation/deactivation

### 3. Doctor Management (Admin Only)
- Manage therapists and interns
- Track specializations and licenses
- **Assign interns to therapists**
- View assigned interns per therapist

### 4. Customer Management
- Create customer profiles
- **Assign customers to interns**
- Emergency contact tracking
- Customer notes

### 5. Appointment System
- Schedule appointments
- **Therapist or admin can book slots**
- Time slot management
- Appointment status tracking
- Notes for each appointment

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Routing**: React Router DOM v6
- **UI**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **State**: React Context API
- **HTTP**: Fetch API

### Backend
- **Framework**: NestJS 10
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5
- **Authentication**: JWT (Passport)
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Web Server**: Nginx (production)

---

## 📊 Database Schema

```
┌─────────┐       ┌──────────┐       ┌────────────┐
│  User   │───────│  Doctor  │───────│  TimeSlot  │
└─────────┘       └──────────┘       └────────────┘
     │                 │                     │
     │                 │                     │
     │            ┌────────────┐            │
     └────────────│  Customer  │            │
                  └────────────┘            │
                        │                   │
                        │                   │
                  ┌─────────────┐          │
                  │ Appointment │──────────┘
                  └─────────────┘
```

**Relations:**
- User → Doctor (1:1)
- User → Customer (1:1)
- Doctor → Doctor (Therapist supervises Interns)
- Doctor → Customer (Intern assigned to Customers)
- Doctor → TimeSlot (1:N)
- Customer → Appointment (1:N)
- Doctor → Appointment (1:N)

---

## 🎯 Key Workflows

### 1. Create Complete User Flow
1. **Admin** creates a user with role "Customer"
2. **Admin** creates customer profile for that user
3. **Admin/Therapist** assigns customer to an intern
4. **Admin/Therapist/Intern** books appointment for customer

### 2. Manage Doctors
1. **Admin** creates user with role "Therapist"
2. **Admin** creates doctor profile (type: Therapist)
3. **Admin** creates user with role "Intern"
4. **Admin** creates doctor profile (type: Intern)
5. **Admin** assigns intern to supervising therapist

### 3. Book Appointments
1. **Anyone authorized** goes to Appointments page
2. Select customer and doctor/intern
3. Choose date and time slot
4. Add notes
5. Schedule appointment

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login`
- `GET /api/auth/validate`

### Users (Admin)
- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:id`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`

### Doctors (Admin)
- `GET /api/doctors`
- `GET /api/doctors/therapists`
- `POST /api/doctors`
- `POST /api/doctors/assign-intern`
- `PATCH /api/doctors/:id`
- `DELETE /api/doctors/:id`

### Customers
- `GET /api/customers`
- `POST /api/customers`
- `POST /api/customers/assign-intern`
- `PATCH /api/customers/:id`
- `DELETE /api/customers/:id`

### Appointments
- `GET /api/appointments`
- `POST /api/appointments`
- `PATCH /api/appointments/:id`
- `DELETE /api/appointments/:id`

**Full docs:** http://localhost:3001/api/docs

---

## 🔒 Security Features

### Implemented
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Input validation

### Production Recommendations
- [ ] Use HTTPS only
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Set up API throttling
- [ ] Enable security headers (Helmet)
- [ ] Implement refresh tokens
- [ ] Add audit logging
- [ ] Set up monitoring

---

## 🔄 Switching to Real Backend

Currently, the frontend uses mock data (`src/services/api.ts`). To switch to the real backend:

### Method 1: Replace Import
```typescript
// In your components, change:
import { usersApi } from '@/services/api';

// To:
import { usersApi } from '@/services/api-real';
```

### Method 2: Replace File
```bash
cd src/services
mv api.ts api-mock.ts
mv api-real.ts api.ts
```

### Method 3: Update Environment
Set `VITE_API_URL` in `.env` and update code to use config.

---

## 📚 Documentation

- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Complete backend setup guide
- **[ADMIN_SYSTEM.md](./ADMIN_SYSTEM.md)** - Admin system features
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide
- **[backend/README.md](./backend/README.md)** - Backend API docs

---

## 🐛 Common Issues

### Backend won't start
```bash
# Check PostgreSQL
docker ps | grep postgres

# Regenerate Prisma
cd backend
npm run prisma:generate
```

### Frontend can't connect
```bash
# Check backend is running
curl http://localhost:3001/api

# Check .env file
cat .env
```

### Database errors
```bash
# Reset database
cd backend
npm run prisma:migrate reset
npm run prisma:seed
```

---

## 🚢 Deployment

### Docker Compose (Simplest)
```bash
docker-compose up -d
```

### Separate Services

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
npm run build
# Serve dist/ folder with nginx/apache
```

### Cloud Platforms
- **Heroku**: Use buildpacks for Node.js
- **Railway**: Connect GitHub and deploy
- **Render**: Auto-deploy from Git
- **AWS**: ECS/Fargate + RDS PostgreSQL
- **Google Cloud**: Cloud Run + Cloud SQL
- **Azure**: App Service + PostgreSQL

---

## 📈 Next Steps

1. ✅ **System is ready** - Everything is set up
2. **Test features** - Login and explore all modules
3. **Customize** - Modify for your specific needs
4. **Add features** - Extend with new functionality
5. **Deploy** - Move to production

---

## 💡 Pro Tips

- Use **Prisma Studio** (`npm run prisma:studio`) for database GUI
- Check **Swagger docs** at `/api/docs` for API testing
- Enable **hot-reload** for faster development
- Use **Docker** for consistent environments
- Set up **Git hooks** for code quality (Husky + ESLint)

---

## 🎓 Learning Resources

- **NestJS**: https://docs.nestjs.com
- **Prisma**: https://www.prisma.io/docs
- **React**: https://react.dev
- **shadcn/ui**: https://ui.shadcn.com
- **Tailwind**: https://tailwindcss.com

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

Part of the TalkItOut platform.

---

## ✨ You're All Set!

Your complete admin system is ready. Start by logging in with the demo accounts and exploring the features!

**Access Points:**
- **Admin Portal**: http://localhost:5173/admin/login
- **API Docs**: http://localhost:3001/api/docs
- **Database GUI**: `npm run prisma:studio` (from backend/)

**Happy Coding! 🚀**
