import RegexpRule from './regexp'

/**
 * HIGH ORDER FUNCTION
 * @returns {function(*=, *): *}
 */
const IdsRule = () => {
    return RegexpRule(/^([0-9],?)+$/)
}

export default IdsRule()