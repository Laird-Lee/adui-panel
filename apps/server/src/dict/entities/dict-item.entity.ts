import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Dict } from './dict.entity';

@Entity('pub_dict_item')
export class DictItem extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  value: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  text: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  textEn: string;

  @Column({
    type: 'int',
    default: 0,
  })
  seq: number;

  @ManyToOne(() => Dict, (dict) => dict.id)
  dict: Dict;
}
