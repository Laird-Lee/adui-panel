import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictItemsDto } from './dto/dict-items.dto';

@ApiTags('字典表')
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @ApiOperation({ summary: '创建字典表' })
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createDictDto: CreateDictDto) {
    return await this.dictService.create(createDictDto);
  }

  @Get()
  async findAll() {
    return await this.dictService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dictService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDictDto: UpdateDictDto) {
    return await this.dictService.update(+id, updateDictDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dictService.remove(+id);
  }

  @Post('item')
  async saveDictItems(@Body() dictItemsDto: DictItemsDto) {
    return await this.dictService.saveDictItems(dictItemsDto);
  }

  @Get('item/:dictId')
  async findDictItemsByDictId(@Param('dictId') dictId: string) {
    return await this.dictService.findDictItemsByDictId(+dictId);
  }
}
