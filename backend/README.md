# TalkItOut Backend API

NestJS + PostgreSQL + Prisma backend for the TalkItOut Admin Portal.

## Features

- **Authentication**: JWT-based authentication with role-based access control
- **User Management**: CRUD operations for users
- **Doctor Management**: Manage therapists and interns, assign interns to therapists
- **Customer Management**: Manage customer profiles and assign to interns
- **Appointment System**: Book and manage appointments with time slots
- **API Documentation**: Swagger/OpenAPI documentation
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Request validation with class-validator
- **Security**: Password hashing with bcrypt

## Tech Stack

- **Framework**: NestJS 10
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5
- **Authentication**: JWT (passport-jwt)
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI

## Prerequisites

- Node.js 20+ or Bun
- PostgreSQL 16+
- Docker & Docker Compose (optional)

## Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
# or
bun install
```

### 2. Set Up Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/talkitout?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRATION="7d"
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database with initial data
npm run prisma:seed
```

### 4. Start Development Server

```bash
npm run start:dev
```

The API will be available at:
- **API**: http://localhost:3001/api
- **Documentation**: http://localhost:3001/api/docs

## Docker Setup

### Using Docker Compose

From the project root:

```bash
# Start all services (frontend, backend, database)
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Backend Only

```bash
cd backend

# Build image
docker build -t talkitout-backend .

# Run container
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://postgres:password@host.docker.internal:5432/talkitout" \
  -e JWT_SECRET="your-secret" \
  talkitout-backend
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `GET /api/auth/validate` - Validate token (requires auth)

### Users (Admin only)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Doctors (Admin only)

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/therapists` - Get all therapists
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create doctor profile
- `PATCH /api/doctors/:id` - Update doctor
- `POST /api/doctors/assign-intern` - Assign intern to therapist
- `DELETE /api/doctors/:id` - Delete doctor

### Customers

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create customer
- `PATCH /api/customers/:id` - Update customer
- `POST /api/customers/assign-intern` - Assign customer to intern
- `DELETE /api/customers/:id` - Delete customer

### Appointments

- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment
- `PATCH /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Demo Credentials

After seeding the database:

- **Admin**: admin@talkitout.com / password123
- **Therapist**: therapist@talkitout.com / password123
- **Intern**: intern@talkitout.com / password123

## Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **admin** | Full access to all endpoints |
| **therapist** | Access to customers, appointments |
| **intern** | Access to customers, appointments (limited) |
| **customer** | No API access (web portal only) |

## Database Schema

The database uses Prisma ORM with the following models:

- **User**: Base user with role (admin, therapist, intern, customer)
- **Doctor**: Doctor profile (linked to User)
- **Customer**: Customer profile (linked to User)
- **TimeSlot**: Available appointment slots
- **Appointment**: Scheduled appointments

See `prisma/schema.prisma` for the full schema.

## Development

### Useful Commands

```bash
# Development mode with hot-reload
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run tests
npm run test

# Generate Prisma Client after schema changes
npm run prisma:generate

# Create new migration
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Seed database
npm run prisma:seed

# Lint code
npm run lint

# Format code
npm run format
```

### Adding New Features

1. Generate a new module:
   ```bash
   nest g module feature-name
   nest g service feature-name
   nest g controller feature-name
   ```

2. Update Prisma schema if needed
3. Run migration
4. Update DTOs and entities
5. Implement service logic
6. Add controller endpoints
7. Update documentation

## Production Deployment

### Environment Variables

Set these in production:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="strong-random-secret"
JWT_EXPIRATION="7d"
PORT=3001
NODE_ENV="production"
CORS_ORIGIN="https://yourdomain.com"
```

### Security Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Use HTTPS only
- [ ] Enable rate limiting
- [ ] Set up database backups
- [ ] Enable logging and monitoring
- [ ] Review and update CORS settings
- [ ] Use environment-specific configs
- [ ] Enable helmet for security headers
- [ ] Implement request throttling

### Deployment Options

**Option 1: Docker**
```bash
docker-compose up -d
```

**Option 2: Traditional Server**
```bash
npm run build
npm run start:prod
```

**Option 3: Cloud Platforms**
- Heroku
- Railway
- Render
- AWS ECS/Fargate
- Google Cloud Run
- Azure App Service

## API Documentation

Interactive API documentation is available at:

http://localhost:3001/api/docs

The documentation is auto-generated using Swagger/OpenAPI and includes:
- All endpoints with descriptions
- Request/response schemas
- Authentication requirements
- Try-it-out functionality

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# View database logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d postgres
npm run prisma:migrate
npm run prisma:seed
```

### Prisma Issues

```bash
# Regenerate Prisma Client
npm run prisma:generate

# Reset database (⚠️ destructive)
npx prisma migrate reset
```

### Port Already in Use

```bash
# Change PORT in .env file or kill existing process
lsof -ti:3001 | xargs kill
```

## Contributing

1. Create feature branch
2. Make changes
3. Run tests and linting
4. Submit pull request

## License

This project is part of the TalkItOut platform.
