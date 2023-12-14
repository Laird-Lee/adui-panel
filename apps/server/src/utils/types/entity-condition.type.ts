import { FindOptionsWhere } from 'typeorm';

/**
 * Represents a condition to filter entities in a query.
 * @template T - The type of entity to filter.
 */
export type EntityCondition<T> = FindOptionsWhere<T>;
