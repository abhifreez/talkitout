 # TalkItOut Admin System

A comprehensive admin portal for managing users, doctors, customers, and appointments in the TalkItOut platform.

## Features

### 1. **Authentication**
- Secure login system for admin, therapists, and interns
- Role-based access control
- Protected routes

### 2. **User Management** (Admin Only)
- Create, read, update, and delete users
- Support for multiple roles: Admin, Therapist, Intern, Customer
- User activation status tracking

### 3. **Doctor Management** (Admin Only)
- Manage therapists and interns
- Support for doctor types: Therapist and Intern
- Track specializations and license numbers
- Assign interns to supervising therapists
- View intern assignments for each therapist

### 4. **Customer Management**
- Create and manage customer profiles
- Assign customers to interns
- Track customer details including:
  - Date of birth
  - Address
  - Emergency contact
  - Notes

### 5. **Appointment Booking**
- Schedule appointments for customers
- Assign appointments to doctors or interns
- Multiple time slots available throughout the day
- Update appointment status (Scheduled, Completed, Cancelled, No Show)
- Add notes to appointments

## Access & Permissions

### Role-Based Access:

| Feature | Admin | Therapist | Intern |
|---------|-------|-----------|--------|
| Dashboard | ✅ | ✅ | ✅ |
| User Management | ✅ | ❌ | ❌ |
| Doctor Management | ✅ | ❌ | ❌ |
| Customer Management | ✅ | ✅ | ✅ |
| Appointments | ✅ | ✅ | ✅ |

## Getting Started

### 1. Installation
```bash
npm install
# or
bun install
```

### 2. Run Development Server
```bash
npm run dev
# or
bun run dev
```

### 3. Access the Admin Portal
Navigate to: `http://localhost:5173/admin/login`

### 4. Demo Credentials

**Admin Account:**
- Email: `admin@talkitout.com`
- Password: `password123`

**Therapist Account:**
- Email: `therapist@talkitout.com`
- Password: `password123`

**Intern Account:**
- Email: `intern@talkitout.com`
- Password: `password123`

## Workflow Examples

### Creating a Complete Workflow

#### 1. Create Users (Admin)
1. Login as admin
2. Navigate to "Users" page
3. Click "Add User"
4. Create users with appropriate roles

#### 2. Create Doctor Profiles (Admin)
1. Navigate to "Doctors" page
2. Click "Add Doctor"
3. Select a user with "Therapist" or "Intern" role
4. Fill in specialization and license details
5. For interns, optionally assign a supervising therapist

#### 3. Assign Interns to Therapists (Admin)
1. Navigate to "Doctors" page
2. Click "Assign Intern"
3. Select an intern and a supervising therapist
4. Click "Assign"

#### 4. Create Customer Profiles
1. Navigate to "Customers" page
2. Click "Add Customer"
3. Select a user with "Customer" role
4. Fill in customer details
5. Optionally assign to an intern

#### 5. Assign Customers to Interns
1. In the "Customers" page, click "Assign Intern" for a customer
2. Select an intern from the list
3. Click "Assign"

#### 6. Schedule Appointments
1. Navigate to "Appointments" page
2. Click "Schedule Appointment"
3. Select a customer
4. Select a doctor or intern
5. Choose a date and time slot
6. Add optional notes
7. Click "Schedule Appointment"

#### 7. Manage Appointments
1. View all appointments in the "Appointments" page
2. Edit appointments to update details or change status
3. Cancel appointments when needed

## Technical Architecture

### Technology Stack
- **Frontend Framework:** React 18 + TypeScript
- **Routing:** React Router DOM v6
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS
- **Form Management:** React Hook Form + Zod
- **State Management:** React Context API
- **HTTP Client:** Fetch API (with mock service layer)

### Project Structure
```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx      # Main admin layout with sidebar
│   │   └── ProtectedRoute.tsx   # Route protection HOC
│   └── ui/                      # Reusable UI components
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── pages/
│   └── admin/
│       ├── Login.tsx            # Admin login page
│       ├── Dashboard.tsx        # Main dashboard
│       ├── Users.tsx            # User management
│       ├── Doctors.tsx          # Doctor management
│       ├── Customers.tsx        # Customer management
│       └── Appointments.tsx     # Appointment booking
├── services/
│   └── api.ts                   # API service layer (mock)
└── types/
    └── admin.ts                 # TypeScript type definitions
```

### Key Components

#### AuthContext
Manages user authentication state, login/logout functionality, and token persistence.

#### ProtectedRoute
HOC that restricts access to authenticated users and checks role-based permissions.

#### AdminLayout
Provides the main admin interface with:
- Responsive sidebar navigation
- Mobile-friendly hamburger menu
- User info display
- Logout functionality

### API Service Layer
The application uses a mock API service layer (`src/services/api.ts`) that simulates backend operations with:
- In-memory data storage
- Simulated network delays
- CRUD operations for all entities
- Relationship management

**Note:** In production, replace this with actual API calls to your backend.

## Customization

### Adding New Roles
1. Update `UserRole` type in `src/types/admin.ts`
2. Add role handling in `AuthContext`
3. Update `ProtectedRoute` to handle new role permissions
4. Add role-specific UI in components

### Adding New Features
1. Create new page component in `src/pages/admin/`
2. Add route in `src/App.tsx`
3. Add navigation item in `AdminLayout.tsx`
4. Add corresponding API methods in `src/services/api.ts`

### Connecting to Real Backend
Replace mock API calls in `src/services/api.ts` with actual HTTP requests:

```typescript
// Example: Replace mock with real API
export const usersApi = {
  getAll: async () => {
    const response = await fetch('/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },
  // ... other methods
};
```

## Security Considerations

### Current Implementation (Development)
- Token stored in localStorage
- Mock authentication
- No password hashing
- No HTTPS requirement

### Production Recommendations
1. **Authentication:**
   - Use secure token storage (httpOnly cookies)
   - Implement proper JWT validation
   - Add refresh token mechanism
   - Implement password hashing (bcrypt, argon2)

2. **Authorization:**
   - Validate permissions on backend
   - Implement role-based access control (RBAC)
   - Add audit logging

3. **Data Security:**
   - Use HTTPS only
   - Implement CSRF protection
   - Sanitize user inputs
   - Add rate limiting

4. **Session Management:**
   - Implement session timeout
   - Add "remember me" functionality
   - Handle concurrent sessions

## Future Enhancements

- [ ] Email notifications for appointments
- [ ] SMS reminders
- [ ] Recurring appointments
- [ ] Calendar view for appointments
- [ ] Doctor availability management
- [ ] Customer medical history
- [ ] Appointment notes and reports
- [ ] Search and filtering
- [ ] Export data to CSV/PDF
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode

## Support

For issues or questions, please contact the development team or create an issue in the project repository.

## License

This project is part of the TalkItOut platform.
