import type { ValueTransformer } from 'typeorm';
import moment from 'moment';

/**
 * Represents a string format for date and time.
 * @type {string}
 */
const FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

/**
 * Formats the input value into a Date object.
 * @param {Date} value - The input value to format.
 * @return {Date} - The formatted Date object.
 */
function createFormattedDate(value: Date): Date {
  return value;
}

/**
 * Converts the given value to a formatted date and time string.
 * @param {string | number | Date} value - The value to be converted. Can be a string, number, or Date object.
 * @return {string} - The formatted date and time string.
 */
function formatValueToDateTime(value: string | number | Date): string {
  return value ? moment(value).format(FORMAT) : undefined;
}

/**
 * A value transformer for date conversion.
 * @property {Function} to - The function used to convert a value to a formatted date string.
 * @property {Function} from - The function used to convert a formatted date string to a value.
 */
export const dateTransformer: ValueTransformer = {
  to: createFormattedDate,
  from: formatValueToDateTime,
};
