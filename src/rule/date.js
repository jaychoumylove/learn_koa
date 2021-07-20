import RegexpRule from './regexp'

/**
 * HIGH ORDER FUNCTION
 * @returns {function(*=, *): *}
 */
const DateRule = () => {
    return RegexpRule(/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/)
}

export default DateRule