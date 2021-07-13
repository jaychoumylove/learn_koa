import { writeErrorLog } from '../middleware/logger'
import { ObjectSchema } from 'joi';

export default class Base {
    set schema (value) {
        this.defaultSchema = value;
    }

    /**
     * @returns {ObjectSchema}
     */
    get schema () {
        return this.defaultSchema;
    }

    check (data) {
        const {value, error} = this.schema.validate(data);
        if (error) {
            writeErrorLog(error)
        } else {
            return true;
        }
    }
}