// User roles
export type UserRole = 'admin' | 'therapist' | 'intern' | 'customer';

// Doctor types
export type DoctorType = 'therapist' | 'intern';

// Appointment status
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// Doctor interface
export interface Doctor {
  id: string;
  userId: string;
  user: User;
  type: DoctorType;
  specialization?: string;
  licenseNumber?: string;
  assignedToId?: string; // For interns - ID of supervising doctor
  assignedTo?: Doctor; // Supervising doctor (only for interns)
  interns?: Doctor[]; // List of interns (only for therapists)
  availableSlots?: TimeSlot[];
  createdAt: string;
  updatedAt: string;
}

// Customer interface
export interface Customer {
  id: string;
  userId: string;
  user: User;
  assignedInternId?: string;
  assignedIntern?: Doctor;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Time slot interface
export interface TimeSlot {
  id: string;
  doctorId: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
}

// Appointment interface
export interface Appointment {
  id: string;
  customerId: string;
  customer: Customer;
  doctorId: string;
  doctor: Doctor;
  scheduledBy: string; // User ID of who scheduled it
  scheduledByUser: User;
  date: string;
  timeSlotId: string;
  timeSlot: TimeSlot;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Authentication types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Form types
export interface CreateUserForm {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
}

export interface CreateDoctorForm {
  userId: string;
  type: DoctorType;
  specialization?: string;
  licenseNumber?: string;
  assignedToId?: string;
}

export interface CreateCustomerForm {
  userId: string;
  assignedInternId?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  notes?: string;
}

export interface CreateAppointmentForm {
  customerId: string;
  doctorId: string;
  date: string;
  timeSlotId: string;
  notes?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
