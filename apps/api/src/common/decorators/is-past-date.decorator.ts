import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsPastDate(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "isPastDate",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: Date) {
                    if (!(value instanceof Date)) return false;
                    return value < new Date();
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a past date`;
                },
            },
        });
    };
}
