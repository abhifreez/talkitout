# Quick Start Guide - Admin Portal

## 🚀 Get Started in 5 Minutes

### Step 1: Start the Development Server
```bash
npm run dev
# or
bun run dev
```

### Step 2: Access the Admin Portal
Open your browser and navigate to:
```
http://localhost:5173/admin/login
```

### Step 3: Login with Demo Credentials
Use any of these demo accounts:

**👨‍💼 Admin (Full Access)**
- Email: `admin@talkitout.com`
- Password: `password123`

**👨‍⚕️ Therapist (Limited Access)**
- Email: `therapist@talkitout.com`
- Password: `password123`

**👨‍🎓 Intern (Limited Access)**
- Email: `intern@talkitout.com`
- Password: `password123`

---

## 📋 Demo Workflow

### Scenario: Complete Patient Onboarding & Appointment Booking

#### As **Admin** (`admin@talkitout.com`):

**1. Create a Customer User** 
   - Go to **Users** → Click **"Add User"**
   - Fill in:
     - Name: `John Doe`
     - Email: `john.doe@example.com`
     - Password: `password123`
     - Role: `Customer`
   - Click **"Create User"**

**2. Create Customer Profile**
   - Go to **Customers** → Click **"Add Customer"**
   - Select: `John Doe` from users
   - Fill optional details (address, emergency contact, etc.)
   - Click **"Create Customer"**

**3. Assign Customer to Intern**
   - In **Customers** page, find `John Doe`
   - Click **"Assign Intern"**
   - Select: `John Smith (Intern)`
   - Click **"Assign"**

**4. Schedule an Appointment**
   - Go to **Appointments** → Click **"Schedule Appointment"**
   - Select Customer: `John Doe`
   - Select Doctor: `John Smith (intern)`
   - Choose Date: Tomorrow
   - Choose Time: `09:00 AM`
   - Add Note: `Initial consultation`
   - Click **"Schedule Appointment"**

✅ **Done!** You've created a complete workflow from user creation to appointment booking.

---

## 🎯 Key Features to Try

### 1. **User Management** (Admin Only)
- Create users for different roles
- Edit user information
- Deactivate users
- View all users in a table

### 2. **Doctor Management** (Admin Only)
- Add therapists and interns
- Assign interns to therapists
- View doctor details
- Track specializations

### 3. **Customer Management**
- Create customer profiles
- Assign customers to interns
- Add emergency contacts
- Track customer notes

### 4. **Appointment System**
- Schedule appointments
- View all bookings
- Update appointment status
- Cancel appointments

---

## 🔐 Role Permissions

| Feature | Admin | Therapist | Intern |
|---------|:-----:|:---------:|:------:|
| Dashboard | ✅ | ✅ | ✅ |
| Create Users | ✅ | ❌ | ❌ |
| Manage Doctors | ✅ | ❌ | ❌ |
| View Customers | ✅ | ✅ | ✅ |
| Book Appointments | ✅ | ✅ | ✅ |

---

## 🎨 UI Highlights

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with shadcn/ui components
- **Dark Sidebar**: Easy-to-navigate admin panel
- **Table Views**: Sortable, searchable data tables
- **Modal Dialogs**: Smooth create/edit experiences
- **Toast Notifications**: Real-time feedback for actions
- **Badge System**: Visual status indicators

---

## 🛠️ Testing Tips

### Test User Creation Flow:
1. Create a user with role "Intern"
2. Go to Doctors → Create doctor profile for that user
3. Assign the intern to a therapist

### Test Customer Assignment:
1. Create a customer user
2. Create customer profile
3. Use "Assign Intern" to link them

### Test Appointment Booking:
1. Ensure you have at least one customer and one doctor
2. Book an appointment
3. Edit the appointment to mark as "Completed"

---

## ⚡ Pro Tips

1. **Quick Navigation**: Use the sidebar to jump between sections
2. **Search Users**: Filter large tables using the search feature
3. **Bulk Operations**: Edit multiple appointments in sequence
4. **Status Updates**: Change appointment status without canceling
5. **Mobile Friendly**: Access admin panel from any device

---

## 🐛 Troubleshooting

**Issue: Can't see Users/Doctors menu**
- Solution: Make sure you're logged in as Admin

**Issue: Can't schedule appointments**
- Solution: Create at least one customer first

**Issue: Blank page after login**
- Solution: Check browser console for errors, refresh the page

---

## 📚 Next Steps

1. Read the full [ADMIN_SYSTEM.md](./ADMIN_SYSTEM.md) for detailed documentation
2. Customize the UI theme in `tailwind.config.ts`
3. Add your backend API endpoints in `src/services/api.ts`
4. Deploy to production with proper authentication

---

## 🎉 You're All Set!

The admin portal is fully functional with mock data. Start exploring and customizing it for your needs!

**Happy Managing! 🚀**
