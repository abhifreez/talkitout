import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TimeSlotsService } from './time-slots.service';
import { CreateTimeSlotDto, BulkCreateTimeSlotDto } from './dto/create-time-slot.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('time-slots')
@Controller('time-slots')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TimeSlotsController {
    constructor(private readonly timeSlotsService: TimeSlotsService) { }

    @Post()
    @Roles(UserRole.admin, UserRole.therapist, UserRole.intern)
    @ApiOperation({ summary: 'Create a new time slot' })
    create(@Body() createTimeSlotDto: CreateTimeSlotDto, @Request() req) {
        return this.timeSlotsService.create(createTimeSlotDto, req.user);
    }

    @Post('bulk')
    @Roles(UserRole.admin, UserRole.therapist, UserRole.intern)
    @ApiOperation({ summary: 'Bulk create time slots from range' })
    bulkCreate(@Body() bulkCreateDto: BulkCreateTimeSlotDto, @Request() req) {
        return this.timeSlotsService.bulkCreate(bulkCreateDto, req.user);
    }

    @Get('doctor/:doctorId')
    @Public()
    @ApiOperation({ summary: 'Get all time slots for a doctor' })
    findByDoctorId(@Param('doctorId') doctorId: string, @Request() req) {
        return this.timeSlotsService.findByDoctorId(doctorId, req.user);
    }

    @Delete(':id')
    @Roles(UserRole.admin, UserRole.therapist, UserRole.intern)
    @ApiOperation({ summary: 'Delete a time slot' })
    remove(@Param('id') id: string, @Request() req) {
        return this.timeSlotsService.remove(id, req.user);
    }
}
