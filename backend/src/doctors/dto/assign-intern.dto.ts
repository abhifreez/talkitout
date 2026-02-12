import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignInternDto {
  @ApiProperty({ example: 'intern-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  internId: string;

  @ApiProperty({ example: 'therapist-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  therapistId: string;
}
