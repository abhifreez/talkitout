import { useState, useEffect } from 'react';
import { doctorsApi, usersApi } from '@/services/api';
import type { Doctor, User, CreateDoctorForm } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Stethoscope, Pencil, Trash2, UserPlus, Users as UsersIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [therapists, setTherapists] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deleteDoctor, setDeleteDoctor] = useState<Doctor | null>(null);
  const [assigningIntern, setAssigningIntern] = useState<Doctor | null>(null);

  const [formData, setFormData] = useState<CreateDoctorForm>({
    userId: '',
    type: 'therapist',
    specialization: '',
    licenseNumber: '',
    assignedToId: '',
  });

  const [assignData, setAssignData] = useState({
    internId: '',
    therapistId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [doctorsRes, usersRes, therapistsRes] = await Promise.all([
        doctorsApi.getAll(),
        usersApi.getAll(),
        doctorsApi.getTherapists(),
      ]);

      if (doctorsRes.success && doctorsRes.data) {
        setDoctors(doctorsRes.data.items);
      }
      if (usersRes.success && usersRes.data) {
        setUsers(usersRes.data.items);
      }
      if (therapistsRes.success && therapistsRes.data) {
        setTherapists(therapistsRes.data);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const availableUsers = users.filter(
    (user) =>
      (user.role === 'therapist' || user.role === 'intern') &&
      !doctors.some((doc) => doc.userId === user.id)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingDoctor) {
        const response = await doctorsApi.update(editingDoctor.id, {
          ...formData,
          id: editingDoctor.id,
        });

        if (response.success) {
          toast.success('Doctor updated successfully');
          loadData();
        }
      } else {
        const response = await doctorsApi.create(formData);
        if (response.success) {
          toast.success('Doctor created successfully');
          loadData();
        }
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save doctor');
    }
  };

  const handleAssignIntern = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await doctorsApi.assignIntern(
        assignData.internId,
        assignData.therapistId
      );

      if (response.success) {
        toast.success('Intern assigned successfully');
        loadData();
        setIsAssignDialogOpen(false);
        setAssignData({ internId: '', therapistId: '' });
      }
    } catch (error) {
      toast.error('Failed to assign intern');
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      userId: doctor.userId,
      type: doctor.type,
      specialization: doctor.specialization || '',
      licenseNumber: doctor.licenseNumber || '',
      assignedToId: doctor.assignedToId || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteDoctor) return;

    try {
      const response = await doctorsApi.delete(deleteDoctor.id);
      if (response.success) {
        toast.success('Doctor deleted successfully');
        loadData();
      }
    } catch (error) {
      toast.error('Failed to delete doctor');
    } finally {
      setDeleteDoctor(null);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: '',
      type: 'therapist',
      specialization: '',
      licenseNumber: '',
      assignedToId: '',
    });
    setEditingDoctor(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const getTypeBadgeColor = (type: string) => {
    return type === 'therapist'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-green-100 text-green-800';
  };

  const interns = doctors.filter((d) => d.type === 'intern');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Doctors</h1>
          <p className="text-slate-600 mt-2">
            Manage therapists and interns
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isAssignDialogOpen}
            onOpenChange={setIsAssignDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <UsersIcon className="h-4 w-4 mr-2" />
                Assign Intern
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Intern to Therapist</DialogTitle>
                <DialogDescription>
                  Select an intern and assign them to a supervising therapist
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAssignIntern} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="intern">Intern</Label>
                  <Select
                    value={assignData.internId}
                    onValueChange={(value) =>
                      setAssignData({ ...assignData, internId: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select intern" />
                    </SelectTrigger>
                    <SelectContent>
                      {interns.map((intern) => (
                        <SelectItem key={intern.id} value={intern.id}>
                          {intern.user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="therapist">Supervising Therapist</Label>
                  <Select
                    value={assignData.therapistId}
                    onValueChange={(value) =>
                      setAssignData({ ...assignData, therapistId: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select therapist" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapists.map((therapist) => (
                        <SelectItem key={therapist.id} value={therapist.id}>
                          {therapist.user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Assign
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAssignDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Stethoscope className="h-4 w-4 mr-2" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingDoctor ? 'Edit Doctor' : 'Create New Doctor'}
                </DialogTitle>
                <DialogDescription>
                  {editingDoctor
                    ? 'Update doctor information'
                    : 'Add a new doctor to the system'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">User</Label>
                  <Select
                    value={formData.userId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, userId: value })
                    }
                    required
                    disabled={!!editingDoctor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="therapist">Therapist</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        licenseNumber: e.target.value,
                      })
                    }
                  />
                </div>

                {formData.type === 'intern' && (
                  <div className="space-y-2">
                    <Label htmlFor="assignedToId">Supervising Therapist</Label>
                    <Select
                      value={formData.assignedToId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, assignedToId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select therapist" />
                      </SelectTrigger>
                      <SelectContent>
                        {therapists.map((therapist) => (
                          <SelectItem key={therapist.id} value={therapist.id}>
                            {therapist.user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingDoctor ? 'Update' : 'Create'} Doctor
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDialogClose}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Interns</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">
                    {doctor.user.name}
                  </TableCell>
                  <TableCell>{doctor.user.email}</TableCell>
                  <TableCell>
                    <Badge className={getTypeBadgeColor(doctor.type)}>
                      {doctor.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{doctor.specialization || '-'}</TableCell>
                  <TableCell>{doctor.licenseNumber || '-'}</TableCell>
                  <TableCell>
                    {doctor.assignedTo?.user.name || '-'}
                  </TableCell>
                  <TableCell>
                    {doctor.type === 'therapist'
                      ? `${doctor.interns?.length || 0} interns`
                      : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(doctor)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDoctor(doctor)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!deleteDoctor}
        onOpenChange={() => setDeleteDoctor(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              doctor profile for {deleteDoctor?.user.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
