import { IsNotEmpty, IsString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DoctorType } from '@prisma/client';

export class CreateDoctorDto {
  @ApiProperty({ example: 'user-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ enum: DoctorType, example: DoctorType.therapist })
  @IsEnum(DoctorType)
  @IsNotEmpty()
  type: DoctorType;

  @ApiProperty({ example: 'Clinical Psychology', required: false })
  @IsString()
  @IsOptional()
  specialization?: string;

  @ApiProperty({ example: 'PSY-12345', required: false })
  @IsString()
  @IsOptional()
  licenseNumber?: string;

  @ApiProperty({ example: 'therapist-uuid-here', required: false })
  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}
