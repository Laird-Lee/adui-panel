import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDictDto {
  @ApiProperty({ example: 'sys_type' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: '系统类型' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '系统类型描述' })
  @IsString()
  @IsOptional()
  description?: string;
}
