import { Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dict } from './entities/dict.entity';
import { DictItem } from './entities/dict-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dict, DictItem])],
  controllers: [DictController],
  providers: [DictService],
})
export class DictModule {}
