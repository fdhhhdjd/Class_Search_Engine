//* IMPORT
const { BadRequestRequestError } = require('../../../cores/error.response.js');

class ValidationUtils {
    static validateField({ value, fieldName, validators }) {
        const invalidValidator = validators.find(({ validate }) => !validate(value));
        if (invalidValidator) {
            const { message } = invalidValidator;
            throw new BadRequestRequestError({
                message: `${fieldName} ${message}`,
            });
        }
    }
}

module.exports = ValidationUtils;
