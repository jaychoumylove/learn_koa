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

    check (data) {
        const { value, error } = this.schema.validate(data)
        if (error) {
            throw new Parameter({
                message: error.message
            })
        } else {
            return true
        }
    }
}