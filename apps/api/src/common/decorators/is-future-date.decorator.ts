import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsFutureDate(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "isFutureDate",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: Date) {
                    if (!(value instanceof Date)) return false;
                    return value > new Date(); // Changed from < to >
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a future date`;
                },
            },
        });
    };
}
