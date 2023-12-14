import {
  AfterLoad,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { dateTransformer } from './transformers/date.transformer';

/**
 * Helper class for entities.
 * @class EntityHelper
 * @extends BaseEntity
 */
export class EntityHelper extends BaseEntity {
  __entity?: string;

  @CreateDateColumn({
    transformer: dateTransformer,
  })
  createTime: Date;

  @UpdateDateColumn({
    transformer: dateTransformer,
  })
  updateTime: Date;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
