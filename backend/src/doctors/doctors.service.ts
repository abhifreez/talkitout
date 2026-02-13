import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AssignInternDto } from './dto/assign-intern.dto';
import { DoctorType, UserRole } from '@prisma/client';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) { }

  async create(createDoctorDto: CreateDoctorDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createDoctorDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if doctor profile already exists for this user
    const existingDoctor = await this.prisma.doctor.findUnique({
      where: { userId: createDoctorDto.userId },
    });

    if (existingDoctor) {
      throw new BadRequestException('Doctor profile already exists for this user');
    }

    const doctor = await this.prisma.doctor.create({
      data: createDoctorDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            phone: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        assignedTo: {
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
        interns: {
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
      },
    });

    return { success: true, data: doctor };
  }

  async findAll(user?: any) {
    let whereClause: any = {};

    if (user && user.role !== UserRole.admin) {
      if (user.role === UserRole.therapist) {
        // Therapist sees own profile and interns' profiles
        const doctor = await this.prisma.doctor.findUnique({
          where: { userId: user.id },
        });
        if (doctor) {
          whereClause = {
            OR: [{ id: doctor.id }, { assignedToId: doctor.id }],
          };
        }
      } else if (user.role === UserRole.intern) {
        // Intern sees own profile
        whereClause = { userId: user.id };
      } else {
        whereClause = { userId: user.id };
      }
    } else if (!user) {
      // Public view: show all active doctors? 
      // For now, show all to match the user's "open endpoint" request
      whereClause = {};
    }

    const doctors = await this.prisma.doctor.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            phone: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        assignedTo: {
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
        interns: {
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
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: {
        items: doctors,
        total: doctors.length,
        page: 1,
        pageSize: doctors.length,
        totalPages: 1,
      },
    };
  }

  async findTherapists() {
    const therapists = await this.prisma.doctor.findMany({
      where: { type: DoctorType.therapist },
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
        interns: {
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
      },
    });

    return { success: true, data: therapists };
  }

  async findOne(id: string, user?: any) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            phone: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        assignedTo: {
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
        interns: {
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
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (user && user.role !== UserRole.admin) {
      if (user.role === UserRole.therapist || user.role === UserRole.intern) {
        const requesterDoctor = await this.prisma.doctor.findUnique({
          where: { userId: user.id },
          include: { interns: true },
        });

        if (requesterDoctor?.id !== id) {
          const isMyIntern = requesterDoctor?.interns.some((i) => i.id === id);
          if (!isMyIntern) {
            throw new ForbiddenException('You are not authorized to view this doctor profile');
          }
        }
      } else {
        if (doctor.userId !== user.id) {
          throw new ForbiddenException('You are not authorized to view this doctor profile');
        }
      }
    }

    return { success: true, data: doctor };
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    await this.findOne(id);

    const doctor = await this.prisma.doctor.update({
      where: { id },
      data: updateDoctorDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            phone: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        assignedTo: {
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
      },
    });

    return { success: true, data: doctor };
  }

  async assignIntern(assignInternDto: AssignInternDto) {
    const { internId, therapistId } = assignInternDto;

    // Verify intern exists and is of type intern
    const intern = await this.prisma.doctor.findUnique({
      where: { id: internId },
    });

    if (!intern) {
      throw new NotFoundException('Intern not found');
    }

    if (intern.type !== DoctorType.intern) {
      throw new BadRequestException('Selected doctor is not an intern');
    }

    // Verify therapist exists and is of type therapist
    const therapist = await this.prisma.doctor.findUnique({
      where: { id: therapistId },
    });

    if (!therapist) {
      throw new NotFoundException('Therapist not found');
    }

    if (therapist.type !== DoctorType.therapist) {
      throw new BadRequestException('Selected doctor is not a therapist');
    }

    // Assign intern to therapist
    const updatedIntern = await this.prisma.doctor.update({
      where: { id: internId },
      data: { assignedToId: therapistId },
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
        assignedTo: {
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
      },
    });

    return { success: true, data: updatedIntern };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.doctor.delete({
      where: { id },
    });

    return { success: true, message: 'Doctor deleted successfully' };
  }
}
