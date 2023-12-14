/**
 * Represents a type that is either of type `T` or `never`.
 * @template T - The type that can be either of type `T` or `never`.
 */
export type OrNeverType<T> = T | never;
