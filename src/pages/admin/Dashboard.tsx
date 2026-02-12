import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usersApi, doctorsApi, customersApi, appointmentsApi } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Stethoscope, UserCog, Calendar } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    therapistCount: 0,
    internCount: 0,
    totalCustomers: 0,
    totalAppointments: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      try {
        const [usersRes, doctorsRes, customersRes, appointmentsRes] = await Promise.all([
          usersApi.getAll(),
          doctorsApi.getAll(),
          customersApi.getAll(),
          appointmentsApi.getAll(),
        ]);

        setStats({
          totalUsers: usersRes.success && usersRes.data ? usersRes.data.total : 0,
          totalDoctors: doctorsRes.success && doctorsRes.data ? doctorsRes.data.total : 0,
          therapistCount: doctorsRes.success && doctorsRes.data
            ? doctorsRes.data.items.filter((d) => d.type === 'therapist').length
            : 0,
          internCount: doctorsRes.success && doctorsRes.data
            ? doctorsRes.data.items.filter((d) => d.type === 'intern').length
            : 0,
          totalCustomers: customersRes.success && customersRes.data ? customersRes.data.total : 0,
          totalAppointments: appointmentsRes.success && appointmentsRes.data ? appointmentsRes.data.total : 0,
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      description: 'Registered users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Doctors',
      value: stats.totalDoctors,
      icon: Stethoscope,
      description: `${stats.therapistCount} Therapist${stats.therapistCount !== 1 ? 's' : ''}, ${stats.internCount} Intern${stats.internCount !== 1 ? 's' : ''}`,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Customers',
      value: stats.totalCustomers,
      icon: UserCog,
      description: 'Active customers',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      description: 'Scheduled appointments',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-slate-600 mt-2">
          Here's what's happening with your platform today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-12 bg-slate-200 animate-pulse rounded" />
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {user?.role === 'admin' && (
              <>
                <a
                  href="/admin/users"
                  className="block p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <p className="font-medium">Create New User</p>
                  <p className="text-sm text-slate-600">
                    Add users, doctors, or customers
                  </p>
                </a>
                <a
                  href="/admin/doctors"
                  className="block p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <p className="font-medium">Manage Doctors</p>
                  <p className="text-sm text-slate-600">
                    Assign interns to therapists
                  </p>
                </a>
              </>
            )}
            <a
              href="/admin/appointments"
              className="block p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <p className="font-medium">Schedule Appointment</p>
              <p className="text-sm text-slate-600">
                Book slots for customers
              </p>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Name:</span>
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Email:</span>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Role:</span>
              <span className="text-sm font-medium capitalize">
                {user?.role}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
