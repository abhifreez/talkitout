import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorsApi, timeSlotsApi, appointmentsApi } from '@/services/api';
import type { Doctor, TimeSlot } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatTime(time: string): string {
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = minuteStr || '00';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${String(displayHour).padStart(2, '0')}:${minute} ${ampm}`;
}

export default function BookAppointment() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);

    const [formData, setFormData] = useState({
        notes: '',
    });

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        setIsLoading(true);
        try {
            const response = await doctorsApi.getAll();
            if (response.success && response.data) {
                // Filter out interns if this is the main booking page
                // Or just show everyone as "Team"
                setDoctors(response.data.items);
            }
        } catch (error) {
            toast.error('Failed to load therapists');
        } finally {
            setIsLoading(false);
        }
    };

    const loadTimeSlots = async (doctorId: string) => {
        try {
            const response = await timeSlotsApi.getByDoctorId(doctorId);
            if (response.success && response.data) {
                setTimeSlots(response.data.filter((slot) => slot.isAvailable));
            } else {
                setTimeSlots([]);
            }
        } catch (error) {
            toast.error('Failed to load available slots');
            setTimeSlots([]);
        }
    };

    const handleDoctorSelect = async (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setSelectedSlot(null);
        await loadTimeSlots(doctor.id);
    };

    const handleSlotSelect = (slot: TimeSlot) => {
        if (!isAuthenticated) {
            toast.error('Please sign in or sign up to book an appointment');
            navigate(`/signup?redirect=/book-appointment`);
            return;
        }
        setSelectedSlot(slot);
        setShowBookingForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDoctor || !selectedSlot || !user) return;

        setIsSubmitting(true);
        try {
            // Fetch customer profile for the user
            const customersResponse = await customersApi.getAll();
            const customer = customersResponse.data?.items.find(c => c.userId === user.id);

            if (!customer) {
                toast.error('Customer profile not found. Please contact support.');
                return;
            }

            const appointmentData = {
                doctorId: selectedDoctor.id,
                timeSlotId: selectedSlot.id,
                date: new Date().toISOString(),
                notes: formData.notes,
                customerId: customer.id,
            };

            const response = await appointmentsApi.create(appointmentData);

            if (response.success) {
                toast.success('Appointment booked successfully!');
                setShowBookingForm(false);
                setSelectedDoctor(null);
                setSelectedSlot(null);
                setFormData({ notes: '' });
                // Refresh slots
                await loadTimeSlots(selectedDoctor.id);
            } else {
                toast.error(response.error || 'Failed to book appointment');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-background">
            <Header />

            <main className="section-padding pt-32">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                            Book Your Appointment
                        </h1>
                        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                            Choose a therapist or intern and select an available time slot that works for you
                        </p>
                    </div>

                    {/* Therapists/Interns Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {doctors.map((doctor) => (
                            <Card
                                key={doctor.id}
                                className={`cursor-pointer transition-all hover:shadow-lg ${selectedDoctor?.id === doctor.id ? 'ring-2 ring-primary' : ''
                                    }`}
                                onClick={() => handleDoctorSelect(doctor)}
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        {doctor.user.name}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground capitalize">
                                        {doctor.type}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    {doctor.specialization && (
                                        <p className="text-sm mb-2">
                                            <strong>Specialization:</strong> {doctor.specialization}
                                        </p>
                                    )}
                                    {doctor.type === 'intern' && doctor.assignedTo && (
                                        <p className="text-sm text-muted-foreground">
                                            Supervised by {doctor.assignedTo.user.name}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Available Time Slots */}
                    {selectedDoctor && (
                        <div className="mb-12">
                            <h2 className="font-heading text-2xl md:text-3xl font-light mb-6 text-center">
                                Available Time Slots for {selectedDoctor.user.name}
                            </h2>

                            {timeSlots.length === 0 ? (
                                <Card>
                                    <CardContent className="pt-6 text-center text-muted-foreground">
                                        No available time slots at the moment. Please check back later or contact us directly.
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {timeSlots.map((slot) => (
                                        <Button
                                            key={slot.id}
                                            variant={selectedSlot?.id === slot.id ? 'default' : 'outline'}
                                            className="h-auto py-4 flex flex-col items-start"
                                            onClick={() => handleSlotSelect(slot)}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <Calendar className="h-4 w-4" />
                                                <span className="font-semibold">{DAY_NAMES[slot.dayOfWeek]}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-sm">
                                                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                                </span>
                                            </div>
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Booking Form Dialog */}
                    <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Complete Your Booking</DialogTitle>
                                <DialogDescription>
                                    Please provide your details to confirm the appointment
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {!isAuthenticated ? (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-yellow-800 font-medium">Authentication Required</p>
                                            <p className="text-xs text-yellow-700 mt-1">
                                                Please <button type="button" onClick={() => navigate('/signup')} className="underline">sign up</button> or <button type="button" onClick={() => navigate('/admin/login')} className="underline">login</button> to book.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 mb-4">
                                        <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-green-800 font-medium">Booking as {user?.name}</p>
                                            <p className="text-xs text-green-700 mt-1">Your contact details from your profile will be used.</p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="notes">
                                        <MessageSquare className="h-4 w-4 inline mr-2" />
                                        Additional Notes (Optional)
                                    </Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={4}
                                        placeholder="Any specific concerns or questions you'd like to share before the session..."
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-blue-800">
                                        <strong>Selected Professional:</strong> {selectedDoctor?.user.name} ({selectedDoctor?.type})
                                        <br />
                                        <strong>Scheduled Time:</strong> {selectedSlot && `${DAY_NAMES[selectedSlot.dayOfWeek]} ${formatTime(selectedSlot.startTime)} - ${formatTime(selectedSlot.endTime)}`}
                                    </p>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        disabled={isSubmitting || !isAuthenticated}
                                    >
                                        {isSubmitting ? 'Confirming...' : 'Confirm My Appointment'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowBookingForm(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </main>

            <Footer />
        </div>
    );
}
