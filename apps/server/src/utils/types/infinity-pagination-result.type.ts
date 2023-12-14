/**
 * Represents the result of an infinity pagination.
 * @template T - The type of the data in the result.
 */
export type InfinityPaginationResultType<T> = Readonly<{
  data: T[];
  hasNextPage: boolean;
}>;
