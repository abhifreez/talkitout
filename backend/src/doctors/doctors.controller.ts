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
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AssignInternDto } from './dto/assign-intern.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) { }

  @Post()
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Create a new doctor profile (Admin only)' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.therapist, UserRole.intern)
  @ApiOperation({ summary: 'Get all doctors' })
  findAll(@Request() req) {
    return this.doctorsService.findAll(req.user);
  }

  @Get('therapists')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Get all therapists (Admin only)' })
  findTherapists() {
    return this.doctorsService.findTherapists();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.doctorsService.findOne(id, req.user);
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Update doctor (Admin only)' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Post('assign-intern')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Assign intern to therapist (Admin only)' })
  assignIntern(@Body() assignInternDto: AssignInternDto) {
    return this.doctorsService.assignIntern(assignInternDto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Delete doctor (Admin only)' })
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
