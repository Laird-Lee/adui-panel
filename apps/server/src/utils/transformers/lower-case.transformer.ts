import { TransformFnParams } from 'class-transformer';
import { MaybeType } from '../types/maybe.type';

/**
 * Transforms a string to lowercase and removes any leading or trailing whitespace.
 * @param {TransformFnParams} params - The parameters for the transformation.
 * @returns {MaybeType<string>} - The transformed string or null if the input string is null or undefined.
 */
export const lowerCaseTransformer = (
  params: TransformFnParams,
): MaybeType<string> => params.value?.toLowerCase().trim();
