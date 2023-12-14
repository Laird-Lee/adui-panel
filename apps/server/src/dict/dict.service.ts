import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dict } from './entities/dict.entity';
import { Repository } from 'typeorm';
import { DictItem } from './entities/dict-item.entity';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { DictItemDto, DictItemsDto } from './dto/dict-items.dto';
import { partition } from 'lodash';

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private dictRepository: Repository<Dict>,
    @InjectRepository(DictItem)
    private dictItemRepository: Repository<DictItem>,
  ) {}

  async create(createDictDto: CreateDictDto): Promise<Dict> {
    const existingDict = await this.findByCode(createDictDto.code);
    if (existingDict) {
      throw new HttpException(
        '字典表已存在！',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const dict = this.dictRepository.create(createDictDto);
    return await this.saveDictionary(dict);
  }

  private async saveDictionary(dict: Dict): Promise<Dict> {
    return await this.dictRepository.save(dict);
  }

  async findByCode(code: string): Promise<Dict> {
    return await this.dictRepository.findOneBy({ code });
  }

  async findOne(id: number): Promise<Dict> {
    const dict = await this.dictRepository.findOneBy({ id });
    if (!dict) {
      throw new HttpException(
        '字典表未找到！',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return dict;
  }

  async findAll(): Promise<Dict[]> {
    return await this.dictRepository.find();
  }

  async update(id: number, updateDictDto: UpdateDictDto) {
    return await this.dictRepository.update(id, updateDictDto);
  }

  async remove(id: number): Promise<void> {
    const dict = await this.findOne(id);
    await this.dictRepository.remove(dict);
  }

  async findDictItemsByDictId(dictId: number) {
    return await this.dictItemRepository
      .createQueryBuilder('dict_item')
      .innerJoin('dict_item.dict', 'dict')
      .where('dict.id = :dictId', { dictId })
      .getMany();
  }

  async saveDictItems(dictItemsDto: DictItemsDto): Promise<void> {
    const { dictItems } = dictItemsDto;
    const [newItems, existingItems] = partition(dictItems, (x) => !x.id);

    await Promise.all(existingItems.map((x) => this.updateOrRemoveDictItem(x)));
    await Promise.all(newItems.map((x) => this.createDictItem(x)));
  }

  private async updateOrRemoveDictItem(itemDto: DictItemDto) {
    const dictItem = await this.findDictItemById(+itemDto.id);
    if (dictItem) {
      await this.updateItems(itemDto.id, itemDto as DictItem);
    } else {
      await this.removeItems(itemDto as DictItem);
    }
  }

  private async createDictItem(itemDto: DictItemDto) {
    const item = this.dictItemRepository.create(itemDto);
    await this.saveItems(item);
  }

  async findDictItemById(id: number) {
    return await this.dictItemRepository.findOneBy({ id });
  }

  async saveItems(item: DictItem) {
    return await this.dictItemRepository.save(item);
  }

  async updateItems(id: number, dictItem: DictItem) {
    return await this.dictItemRepository.update(id, dictItem);
  }

  async removeItems(dictItem: DictItem) {
    return await this.dictItemRepository.remove(dictItem);
  }
}
