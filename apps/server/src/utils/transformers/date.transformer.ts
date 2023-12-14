import type { ValueTransformer } from 'typeorm';
import moment from 'moment';

/**
 * Represents the format string for date and time.
 * @type {string}
 */
const FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

/**
 * Formats the input value into a Date object.
 * @param {string | number | Date} value - The input value to format.
 * @return {Date} The formatted Date object.
 */
function createFormattedDate(value: string | number | Date): Date {
  return moment(value).toDate();
}

/**
 * Converts the given value to a formatted date and time string.
 * @param {string | number | Date} value - The value to be converted. Can be a string, number, or Date object.
 * @return {string} - The formatted date and time string.
 */
function formatValueToDateTime(value: string | number | Date): string {
  return moment(value).format(FORMAT);
}

/**
 * Value transformer for date conversion.
 * @property {function} to - Transform the date value to a date object.
 * @property {function} from - Transform the date object to a formatted date string.
 */
export const dateTransformer: ValueTransformer = {
  to: createFormattedDate,
  from: formatValueToDateTime,
};
