/**
 * HIGH ORDER FUNCTION
 * @param regexp
 * @returns {function(*=, *): *}
 */
const RegexpRule = (regexp) => {
    /**
     * @param value
     * @returns {string|undefined|*|ErrorReport}
     */
    return (value) => {
        const regex = new RegExp(regexp)
        if (false === regex.test(value)) throw new Error('It\'s invalid!')
        return value
    }
}

export default RegexpRule