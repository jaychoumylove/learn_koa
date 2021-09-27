import { ObjectSchema } from 'joi'
import Parameter from '../exception/Parameter'

export default class Base {
    defaultSchema: ObjectSchema;

    set schema(value) {
        this.defaultSchema = value
    }

    get schema() {
        return this.defaultSchema
    }

    check(data, strict = false) {
        let validateData = data;
        if (!strict) {
            validateData = this.filterValidateData(validateData);
        }
        const { error } = this.schema.validate(validateData)
        if (error) {
            throw new Parameter({
                message: error.message,
            })
        }
    }

    filterValidateData(data) {
        const keys: string[] = this.schema.$_terms.keys.map(i => i.key);
        let validateData = {};
        Object.keys(data).map(key => {
            if (keys.includes(key)) {
                validateData[key] = data[key]
            }
        })

        return validateData;
    }
}