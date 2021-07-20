import RegexpRule from './regexp'

/**
 * HIGH ORDER FUNCTION
 * @returns {function(*=, *): *}
 */
const UrlRule = () => {
    return RegexpRule(/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/)
}

export default UrlRule