import RegexpRule from './regexp'

/**
 * HIGH ORDER FUNCTION
 * @returns {function(*=, *): *}
 */
const mobileRule = () => {
    return RegexpRule(/^1(3|4|5|7|8)[0-9]\d{8}$/)
}

export default mobileRule