import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignInternDto {
  @ApiProperty({ example: 'customer-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: 'intern-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  internId: string;
}
