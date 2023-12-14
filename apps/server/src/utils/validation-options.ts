import {
  HttpException,
  HttpStatus,
  type ValidationError,
  type ValidationPipeOptions,
} from '@nestjs/common';

/**
 * Generates an error object based on the given array of validation errors.
 * @param {ValidationError[]} errors - The array of validation errors.
 * @return {Object} - The error object.
 */
function generateError(errors: ValidationError[]): object {
  return errors.reduce((accumulator, currentValue) => ({
    ...accumulator,
    [currentValue.property]:
      (currentValue.children?.length ?? 0) > 0
        ? generateError(currentValue.children ?? [])
        : Object.values(currentValue.constraints ?? {}),
  }));
}

/**
 * validationOptions is an object that defines options for the validation pipe.
 */
const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    return new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: generateError(errors),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  },
};

export default validationOptions;
