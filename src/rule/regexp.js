import { CustomHelpers } from 'joi'

/**
 * HIGH ORDER FUNCTION
 * @param regexp
 * @returns {function(*=, *): *}
 */
const RegexpRule = (regexp) => {
    /**
     * @param value
     * @param {CustomHelpers} helpers
     * @returns {string|undefined|*|ErrorReport}
     */
    return (value, helpers) => {
        const regex = new RegExp(regexp)
        if (false === regex.test(value)) throw new Error('It\'s invalid!')
        return value
    }
}

export default RegexpRule