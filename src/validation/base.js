import { ObjectSchema } from 'joi'
import Parameter from '../exception/parameter'

export default class Base {
    set schema (value) {
        this.defaultSchema = value
    }

    /**
     * @returns {ObjectSchema}
     */
    get schema () {
        return this.defaultSchema
    }

    check (data, strict = false) {
        let validateData = data;
        if (!strict) {
            validateData = this.filterValidateData(validateData);
        }
        const { error } = this.schema.validate(validateData)
        if (error) {
            throw new Parameter({
                message: error.message
            })
        }
    }

    filterValidateData (data) {
        /**
         * @var {Array} keys
         */
        const keys = this.schema['$_terms'].keys.map(i => i.key);
        let validateData = {};
        Object.keys(data).map(key => {
            if (keys.includes(key)) {
                validateData[key] = data[key]
            }
        })

        return validateData;
    }
}