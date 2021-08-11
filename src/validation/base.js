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
        const { value, error } = this.schema.validate(validateData)
        if (error) {
            throw new Parameter({
                message: error.message
            })
        } else {
            return true
        }
    }

    filterValidateData (data) {
        const keys = this.schema['$_terms'].keys.map(i => i.key);
        let validateData = {};
        Object.keys(data).map(key => {
            if (keys.indexOf(key) > -1) {
                validateData[key] = data[key]
            }
        })

        return validateData;
    }
}