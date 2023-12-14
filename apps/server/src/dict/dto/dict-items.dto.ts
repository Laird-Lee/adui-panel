import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DictItemDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ example: '系统类型' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 'System Type' })
  @IsString()
  @IsNotEmpty()
  textEn: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsOptional()
  seq: number;
}

export class DictItemsDto {
  @ApiProperty({ example: 12 })
  @IsNumber()
  @IsNotEmpty()
  dictId: number;

  @IsNotEmpty()
  dictItems: DictItemDto[];
}
