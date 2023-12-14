import { PartialType } from '@nestjs/swagger';
import { CreateDictDto } from './create-dict.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDictDto extends PartialType(CreateDictDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
