import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('appointments')
@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Post()
  @Roles(UserRole.admin, UserRole.therapist, UserRole.intern)
  @ApiOperation({ summary: 'Create a new appointment' })
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    return this.appointmentsService.create(createAppointmentDto, req.user.id);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.therapist, UserRole.intern)
  @ApiOperation({ summary: 'Get all appointments' })
  findAll(@Request() req) {
    return this.appointmentsService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.appointmentsService.findOne(id, req.user);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.therapist, UserRole.intern)
  @ApiOperation({ summary: 'Update appointment' })
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto, @Request() req) {
    return this.appointmentsService.update(id, updateAppointmentDto, req.user);
  }

  @Delete(':id')
  @Roles(UserRole.admin, UserRole.therapist, UserRole.intern)
  @ApiOperation({ summary: 'Delete appointment' })
  remove(@Param('id') id: string, @Request() req) {
    return this.appointmentsService.remove(id, req.user);
  }
}
