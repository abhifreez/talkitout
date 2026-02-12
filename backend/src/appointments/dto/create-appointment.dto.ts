import { IsNotEmpty, IsString, IsOptional, IsUUID, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'customer-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: 'doctor-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ example: '2024-12-25' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 'time-slot-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  timeSlotId: string;

  @ApiProperty({ enum: AppointmentStatus, example: AppointmentStatus.scheduled, required: false })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @ApiProperty({ example: 'Initial consultation', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
