import { config } from '@/lib/config';
import type {
  User,
  Doctor,
  Customer,
  Appointment,
  CreateUserForm,
  CreateDoctorForm,
  CreateCustomerForm,
  CreateAppointmentForm,
  LoginCredentials,
  AuthUser,
  ApiResponse,
  PaginatedResponse,
  TimeSlot,
} from '@/types/admin';

const API_URL = config.apiUrl;

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('auth_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'An error occurred',
      };
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Authentication API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> => {
    return apiRequest<AuthUser>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  validateToken: async (token: string): Promise<ApiResponse<AuthUser>> => {
    return apiRequest<AuthUser>('/auth/validate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Users API
export const usersApi = {
  getAll: async (): Promise<ApiResponse<PaginatedResponse<User>>> => {
    return apiRequest<PaginatedResponse<User>>('/users');
  },

  getById: async (id: string): Promise<ApiResponse<User>> => {
    return apiRequest<User>(`/users/${id}`);
  },

  create: async (data: CreateUserForm): Promise<ApiResponse<User>> => {
    return apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
    return apiRequest<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Doctors API
export const doctorsApi = {
  getAll: async (): Promise<ApiResponse<PaginatedResponse<Doctor>>> => {
    return apiRequest<PaginatedResponse<Doctor>>('/doctors');
  },

  getById: async (id: string): Promise<ApiResponse<Doctor>> => {
    return apiRequest<Doctor>(`/doctors/${id}`);
  },

  getTherapists: async (): Promise<ApiResponse<Doctor[]>> => {
    return apiRequest<Doctor[]>('/doctors/therapists');
  },

  create: async (data: CreateDoctorForm): Promise<ApiResponse<Doctor>> => {
    return apiRequest<Doctor>('/doctors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<Doctor>): Promise<ApiResponse<Doctor>> => {
    return apiRequest<Doctor>(`/doctors/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  assignIntern: async (internId: string, therapistId: string): Promise<ApiResponse<Doctor>> => {
    return apiRequest<Doctor>('/doctors/assign-intern', {
      method: 'POST',
      body: JSON.stringify({ internId, therapistId }),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/doctors/${id}`, {
      method: 'DELETE',
    });
  },
};

// Customers API
export const customersApi = {
  getAll: async (): Promise<ApiResponse<PaginatedResponse<Customer>>> => {
    return apiRequest<PaginatedResponse<Customer>>('/customers');
  },

  getById: async (id: string): Promise<ApiResponse<Customer>> => {
    return apiRequest<Customer>(`/customers/${id}`);
  },

  create: async (data: CreateCustomerForm): Promise<ApiResponse<Customer>> => {
    return apiRequest<Customer>('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<Customer>): Promise<ApiResponse<Customer>> => {
    return apiRequest<Customer>(`/customers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  assignToIntern: async (customerId: string, internId: string): Promise<ApiResponse<Customer>> => {
    return apiRequest<Customer>('/customers/assign-intern', {
      method: 'POST',
      body: JSON.stringify({ customerId, internId }),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/customers/${id}`, {
      method: 'DELETE',
    });
  },
};

// Appointments API
export const appointmentsApi = {
  getAll: async (): Promise<ApiResponse<PaginatedResponse<Appointment>>> => {
    return apiRequest<PaginatedResponse<Appointment>>('/appointments');
  },

  create: async (data: CreateAppointmentForm): Promise<ApiResponse<Appointment>> => {
    return apiRequest<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<Appointment>): Promise<ApiResponse<Appointment>> => {
    return apiRequest<Appointment>(`/appointments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};

// Time Slots API
export const timeSlotsApi = {
  getByDoctorId: async (doctorId: string): Promise<ApiResponse<TimeSlot[]>> => {
    return apiRequest<TimeSlot[]>(`/time-slots/doctor/${doctorId}`);
  },

  create: async (slot: Omit<TimeSlot, 'id'>): Promise<ApiResponse<TimeSlot>> => {
    return apiRequest<TimeSlot>('/time-slots', {
      method: 'POST',
      body: JSON.stringify(slot),
    });
  },

  bulkCreate: async (data: any): Promise<ApiResponse<any>> => {
    return apiRequest<any>('/time-slots/bulk', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/time-slots/${id}`, {
      method: 'DELETE',
    });
  },
};
