import { EntityCondition } from './entity-condition.type';

/**
 * Represents the options for finding entities using the specified conditions.
 * @template T The type of the entity.
 */
export type FindOptions<T> = {
  where: EntityCondition<T>[] | EntityCondition<T>;
};
