import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

/**
 * Validates a config object against a class constructor.
 * @param {Record<string, unknown>} config - The config object to validate.
 * @param {ClassConstructor<T>} envVariablesClass - The class constructor to validate against.
 * @returns {T} - The validated config object.
 * @throws {Error} - If validation errors occur, an error is thrown with the error messages.
 */
function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
): T {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export default validateConfig;
