import { useState, useEffect } from 'react';
import { timeSlotsApi, doctorsApi } from '@/services/api';
import type { TimeSlot, Doctor } from '@/types/admin';
import { useAuth } from '@/contexts/AuthContext';
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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Clock, Plus, Trash2, Layers } from 'lucide-react';
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

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatTime(time: string): string {
    if (!time) return '';
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = minuteStr || '00';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${String(displayHour).padStart(2, '0')}:${minute} ${ampm}`;
}

export default function TimeSlots() {
    const { user } = useAuth();
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [deleteSlot, setDeleteSlot] = useState<TimeSlot | null>(null);

    const [formData, setFormData] = useState({
        doctorId: '',
        startTime: '',
        endTime: '',
        dayOfWeek: '1', // Monday default
        duration: '60',
    });

    useEffect(() => {
        loadDoctors();
    }, [user]);

    useEffect(() => {
        if (selectedDoctorId) {
            loadTimeSlots(selectedDoctorId);
        }
    }, [selectedDoctorId]);

    const loadDoctors = async () => {
        if (!user) return;

        try {
            const response = await doctorsApi.getAll();
            if (response.success && response.data) {
                setDoctors(response.data.items);

                // If user is a therapist or intern, find their own doctor profile
                if (user.role === 'therapist' || user.role === 'intern') {
                    const myProfile = response.data.items.find(d => d.userId === user.id);
                    if (myProfile) {
                        setSelectedDoctorId(myProfile.id);
                        setFormData(prev => ({ ...prev, doctorId: myProfile.id }));
                    }
                } else if (user.role === 'admin' && !selectedDoctorId && response.data.items.length > 0) {
                    setSelectedDoctorId(response.data.items[0].id);
                    setFormData(prev => ({ ...prev, doctorId: response.data.items[0].id }));
                }
            }
        } catch (error) {
            toast.error('Failed to load doctors');
        } finally {
            setIsLoading(false);
        }
    };

    const loadTimeSlots = async (doctorId: string) => {
        setIsLoading(true);
        try {
            const response = await timeSlotsApi.getByDoctorId(doctorId);
            if (response.success && response.data) {
                setTimeSlots(response.data);
            }
        } catch (error) {
            toast.error('Failed to load time slots');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let response;
            if (isBulkMode) {
                response = await timeSlotsApi.bulkCreate({
                    doctorId: formData.doctorId,
                    startRange: formData.startTime,
                    endRange: formData.endTime,
                    durationMinutes: parseInt(formData.duration),
                    dayOfWeek: parseInt(formData.dayOfWeek),
                });
            } else {
                response = await timeSlotsApi.create({
                    doctorId: formData.doctorId,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    dayOfWeek: parseInt(formData.dayOfWeek),
                    isAvailable: true,
                });
            }

            if (response.success) {
                toast.success(isBulkMode ? 'Time slots generated successfully' : 'Time slot created successfully');
                loadTimeSlots(formData.doctorId);
                setIsDialogOpen(false);
                setFormData({
                    ...formData,
                    startTime: '',
                    endTime: '',
                });
            } else {
                toast.error(response.error || 'Failed to create time slot');
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to save time slot');
        }
    };

    const handleDelete = async () => {
        if (!deleteSlot) return;

        try {
            const response = await timeSlotsApi.delete(deleteSlot.id);
            if (response.success) {
                toast.success('Time slot deleted successfully');
                loadTimeSlots(selectedDoctorId);
            }
        } catch (error) {
            toast.error('Failed to delete time slot');
        } finally {
            setDeleteSlot(null);
        }
    };

    if (isLoading && doctors.length === 0) {
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
                    <h1 className="text-3xl font-bold text-slate-900">Time Slots</h1>
                    <p className="text-slate-600 mt-2">
                        Manage available consultation hours
                    </p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button disabled={!selectedDoctorId}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Slot
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Time Slot</DialogTitle>
                            <DialogDescription>
                                {isBulkMode
                                    ? 'Generate multiple slots over a time range.'
                                    : 'Create a single recurring time slot.'}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex items-center space-x-2 pb-4">
                            <Switch
                                id="bulk-mode"
                                checked={isBulkMode}
                                onCheckedChange={setIsBulkMode}
                            />
                            <Label htmlFor="bulk-mode" className="flex items-center gap-2 cursor-pointer">
                                <Layers className="h-4 w-4" />
                                Bulk Creation Mode
                            </Label>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {user?.role === 'admin' && (
                                <div className="space-y-2">
                                    <Label htmlFor="doctorId">Doctor/Intern</Label>
                                    <Select
                                        value={formData.doctorId}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, doctorId: value })
                                        }
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select doctor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {doctors.map((doctor) => (
                                                <SelectItem key={doctor.id} value={doctor.id}>
                                                    {doctor.user.name} ({doctor.type})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="dayOfWeek">Day of Week</Label>
                                <Select
                                    value={formData.dayOfWeek}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, dayOfWeek: value })
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select day" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DAY_NAMES.map((day, index) => (
                                            <SelectItem key={index} value={index.toString()}>
                                                {day}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startTime">
                                        {isBulkMode ? 'Start Range' : 'Start Time'}
                                    </Label>
                                    <Input
                                        id="startTime"
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) =>
                                            setFormData({ ...formData, startTime: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endTime">
                                        {isBulkMode ? 'End Range' : 'End Time'}
                                    </Label>
                                    <Input
                                        id="endTime"
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) =>
                                            setFormData({ ...formData, endTime: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {isBulkMode && (
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Slot Duration (minutes)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        min="1"
                                        value={formData.duration}
                                        onChange={(e) =>
                                            setFormData({ ...formData, duration: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            )}

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" className="flex-1">
                                    {isBulkMode ? 'Generate Slots' : 'Create Slot'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Select Doctor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Select
                                    value={selectedDoctorId}
                                    onValueChange={(value) => setSelectedDoctorId(value)}
                                    disabled={user?.role !== 'admin'}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doctor) => (
                                            <SelectItem key={doctor.id} value={doctor.id}>
                                                {doctor.user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {user?.role !== 'admin' && (
                                    <p className="text-xs text-slate-500 mt-2">
                                        You can only manage your own slots.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Time Slots for {doctors.find(d => d.id === selectedDoctorId)?.user.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center p-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Day</TableHead>
                                            <TableHead>Start Time</TableHead>
                                            <TableHead>End Time</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {timeSlots.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-slate-500 h-24">
                                                    No time slots found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            timeSlots.map((slot) => (
                                                <TableRow key={slot.id}>
                                                    <TableCell className="font-medium">
                                                        {DAY_NAMES[slot.dayOfWeek]}
                                                    </TableCell>
                                                    <TableCell>{formatTime(slot.startTime)}</TableCell>
                                                    <TableCell>{formatTime(slot.endTime)}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={slot.isAvailable ? "default" : "secondary"}>
                                                            {slot.isAvailable ? 'Available' : 'Booked'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => setDeleteSlot(slot)}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-600" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <AlertDialog
                open={!!deleteSlot}
                onOpenChange={() => setDeleteSlot(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Time Slot?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this time slot? This cannot be undone.
                            Existing appointments for this slot will not be affected, but the slot
                            will no longer be available for new bookings.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
