import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) { }

  async create(createAppointmentDto: CreateAppointmentDto, scheduledBy: string) {
    // Verify customer exists
    const customer = await this.prisma.customer.findUnique({
      where: { id: createAppointmentDto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Verify doctor exists
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: createAppointmentDto.doctorId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // Verify time slot exists
    const timeSlot = await this.prisma.timeSlot.findUnique({
      where: { id: createAppointmentDto.timeSlotId },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    // Create appointment
    const appointment = await this.prisma.appointment.create({
      data: {
        ...createAppointmentDto,
        date: new Date(createAppointmentDto.date),
        scheduledBy,
      },
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
                phone: true,
              },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
              },
            },
          },
        },
        timeSlot: true,
      },
    });

    // Mark time slot as unavailable
    await this.prisma.timeSlot.update({
      where: { id: createAppointmentDto.timeSlotId },
      data: { isAvailable: false },
    });

    return { success: true, data: appointment };
  }

  async findAll(user: any) {
    let whereClause: any = {};

    if (user.role !== UserRole.admin) {
      if (user.role === UserRole.therapist) {
        const doctor = await this.prisma.doctor.findUnique({
          where: { userId: user.id },
          include: { interns: true },
        });

        if (doctor) {
          const internIds = doctor.interns.map((i) => i.id);
          whereClause = {
            doctorId: {
              in: [doctor.id, ...internIds],
            },
          };
        }
      } else if (user.role === UserRole.intern) {
        const doctor = await this.prisma.doctor.findUnique({
          where: { userId: user.id },
        });
        if (doctor) {
          whereClause = { doctorId: doctor.id };
        }
      } else if (user.role === UserRole.customer) {
        const customer = await this.prisma.customer.findUnique({
          where: { userId: user.id },
        });
        if (customer) {
          whereClause = { customerId: customer.id };
        }
      }
    }

    const appointments = await this.prisma.appointment.findMany({
      where: whereClause,
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
                phone: true,
              },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
              },
            },
          },
        },
        timeSlot: true,
      },
      orderBy: { date: 'desc' },
    });

    return {
      success: true,
      data: {
        items: appointments,
        total: appointments.length,
        page: 1,
        pageSize: appointments.length,
        totalPages: 1,
      },
    };
  }

  async findOne(id: string, user?: any) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
                phone: true,
              },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
              },
            },
          },
        },
        timeSlot: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (user && user.role !== UserRole.admin) {
      if (user.role === UserRole.therapist || user.role === UserRole.intern) {
        const doctor = await this.prisma.doctor.findUnique({
          where: { userId: user.id },
          include: { interns: true },
        });
        const internIds = doctor?.interns.map((i) => i.id) || [];
        const allowedDoctorIds = [doctor?.id, ...internIds].filter(Boolean);

        if (!allowedDoctorIds.includes(appointment.doctorId)) {
          throw new ForbiddenException('You are not authorized to view this appointment');
        }
      } else if (user.role === UserRole.customer) {
        const customer = await this.prisma.customer.findUnique({
          where: { userId: user.id },
        });
        if (appointment.customerId !== customer?.id) {
          throw new ForbiddenException('You are not authorized to view this appointment');
        }
      }
    }

    return { success: true, data: appointment };
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto, user: any) {
    const existingAppointment = await this.findOne(id, user);

    const updateData = {
      ...updateAppointmentDto,
      date: updateAppointmentDto.date ? new Date(updateAppointmentDto.date) : undefined,
    };

    // If changing time slot, free up old slot and mark new one as unavailable
    if (
      updateAppointmentDto.timeSlotId &&
      updateAppointmentDto.timeSlotId !== existingAppointment.data.timeSlotId
    ) {
      // Free old slot
      await this.prisma.timeSlot.update({
        where: { id: existingAppointment.data.timeSlotId },
        data: { isAvailable: true },
      });

      // Mark new slot as unavailable
      await this.prisma.timeSlot.update({
        where: { id: updateAppointmentDto.timeSlotId },
        data: { isAvailable: false },
      });
    }

    const appointment = await this.prisma.appointment.update({
      where: { id },
      data: updateData,
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
                phone: true,
              },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
              },
            },
          },
        },
        timeSlot: true,
      },
    });

    return { success: true, data: appointment };
  }

  async remove(id: string, user: any) {
    const appointment = await this.findOne(id, user);

    // Free up the time slot
    await this.prisma.timeSlot.update({
      where: { id: appointment.data.timeSlotId },
      data: { isAvailable: true },
    });

    await this.prisma.appointment.delete({
      where: { id },
    });

    return { success: true, message: 'Appointment deleted successfully' };
  }
}
