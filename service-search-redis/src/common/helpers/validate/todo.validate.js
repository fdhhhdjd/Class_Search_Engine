//* IMPORT
const ValidationUtils = require('.');

class TodoBuilder {
    build() {
        throw new Error('Method not implemented.');
    }

    constructor() {
        this.id = '';
        this.text = '';
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setText(text) {
        this.text = text;
        return this;
    }

    validateEmptyId(id) {
        return id;
    }

    validateEmptyText(text) {
        return text;
    }
}

class RDBuilder extends TodoBuilder {
    build() {
        ValidationUtils.validateField({
            value: this.id,
            fieldName: 'Id',
            validators: [
                {
                    validate: this.validateEmptyId,
                    message: 'is invalid',
                },
            ],
        });
    }
}

class CUBuilder extends TodoBuilder {
    build() {
        ValidationUtils.validateField({
            value: this.id,
            fieldName: 'Id',
            validators: [
                {
                    validate: this.validateEmptyId,
                    message: 'is invalid',
                },
            ],
        });
        ValidationUtils.validateField({
            value: this.text,
            fieldName: 'Text',
            validators: [
                {
                    validate: this.validateEmptyText,
                    message: 'is empty',
                },
            ],
        });
    }
}

const RDInputBuilder = new RDBuilder();
const CUInputBuilder = new CUBuilder();

module.exports = { RDInputBuilder, CUInputBuilder };
