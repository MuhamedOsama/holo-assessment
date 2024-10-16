import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(expirationDate: any, args: ValidationArguments) {
    expirationDate = new Date(expirationDate);
    if (!(expirationDate instanceof Date)) {
      return false; // If it's not a valid date, validation fails
    }
    const currentDate = new Date();
    return expirationDate > currentDate; // Check if the expiration date is in the future
  }

  defaultMessage(args: ValidationArguments) {
    return 'Expiration date must be in the future';
  }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFutureDateConstraint,
    });
  };
}
