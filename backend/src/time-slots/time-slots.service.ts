import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeSlotDto, BulkCreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class TimeSlotsService {
    constructor(private prisma: PrismaService) { }

    async create(createTimeSlotDto: CreateTimeSlotDto, requestingUser: any) {
        await this.checkDoctorAccess(createTimeSlotDto.doctorId, requestingUser);
        const slot = await this.prisma.timeSlot.create({
            data: createTimeSlotDto,
        });
        return { success: true, data: slot };
    }

    async bulkCreate(bulkCreateDto: BulkCreateTimeSlotDto, requestingUser: any) {
        await this.checkDoctorAccess(bulkCreateDto.doctorId, requestingUser);
        const { doctorId, startRange, endRange, durationMinutes, dayOfWeek } = bulkCreateDto;

        const slots = [];
        try {
            const [startHour, startMin] = startRange.split(':').map(Number);
            const [endHour, endMin] = endRange.split(':').map(Number);

            if (isNaN(startHour) || isNaN(startMin) || isNaN(endHour) || isNaN(endMin)) {
                throw new Error('Invalid time format. Please use HH:mm');
            }

            let currentTotalMinutes = startHour * 60 + startMin;
            const endTotalMinutes = endHour * 60 + endMin;

            if (currentTotalMinutes >= endTotalMinutes) {
                throw new Error('Start time must be before end time');
            }

            while (currentTotalMinutes + durationMinutes <= endTotalMinutes) {
                const h = Math.floor(currentTotalMinutes / 60);
                const m = currentTotalMinutes % 60;
                const startTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

                const nextTotalMinutes = currentTotalMinutes + durationMinutes;
                const nextH = Math.floor(nextTotalMinutes / 60);
                const nextM = nextTotalMinutes % 60;
                const endTime = `${String(nextH).padStart(2, '0')}:${String(nextM).padStart(2, '0')}`;

                slots.push({
                    doctorId,
                    startTime,
                    endTime,
                    dayOfWeek,
                    isAvailable: true,
                });

                currentTotalMinutes = nextTotalMinutes;
            }

            if (slots.length === 0) {
                return { success: true, count: 0, message: 'No slots could be generated in the given range' };
            }

            const result = await this.prisma.timeSlot.createMany({
                data: slots,
                skipDuplicates: true,
            });

            return { success: true, count: result.count };
        } catch (error: any) {
            console.error('Bulk create error:', error);
            throw error;
        }
    }

    async findByDoctorId(doctorId: string, user?: any) {
        if (user) {
            await this.checkDoctorAccess(doctorId, user);
        }

        const slots = await this.prisma.timeSlot.findMany({
            where: { doctorId },
            orderBy: [
                { dayOfWeek: 'asc' },
                { startTime: 'asc' },
            ],
        });
        return { success: true, data: slots };
    }

    async remove(id: string, requestingUser: any) {
        const slot = await this.prisma.timeSlot.findUnique({
            where: { id },
        });

        if (!slot) {
            throw new NotFoundException('Time slot not found');
        }

        await this.checkDoctorAccess(slot.doctorId, requestingUser);

        await this.prisma.timeSlot.delete({
            where: { id },
        });

        return { success: true, message: 'Time slot deleted successfully' };
    }

    private async checkDoctorAccess(doctorId: string, user: any) {
        if (!user) {
            throw new ForbiddenException('User session not found');
        }

        if (user.role === UserRole.admin) return;

        const requesterDoctor = await this.prisma.doctor.findUnique({
            where: { userId: user.id },
            include: { interns: true },
        });

        if (!requesterDoctor) {
            throw new ForbiddenException('Doctor profile not found');
        }

        if (requesterDoctor.id !== doctorId) {
            const isMyIntern = requesterDoctor.interns?.some((i) => i.id === doctorId);
            if (!isMyIntern) {
                throw new ForbiddenException('You are not authorized to manage slots for this doctor');
            }
        }
    }
}
