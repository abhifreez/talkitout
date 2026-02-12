import { IsString, IsNotEmpty, IsNumber, IsBoolean, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeSlotDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    doctorId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    startTime: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    endTime: string;

    @ApiProperty({ description: '0-6 (Sunday-Saturday)' })
    @IsNumber()
    @Min(0)
    @Max(6)
    dayOfWeek: number;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    isAvailable?: boolean;
}

export class BulkCreateTimeSlotDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    doctorId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    startRange: string; // HH:mm

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    endRange: string; // HH:mm

    @ApiProperty()
    @IsNumber()
    @Min(1)
    durationMinutes: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(6)
    dayOfWeek: number;
}
