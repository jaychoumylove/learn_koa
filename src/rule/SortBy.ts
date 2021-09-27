/**
 * @param value
 * @returns {string|undefined|*|ErrorReport}
 */
const SortByRule = (value) => {
    const sortByField = ['desc', 'asc']
    if (sortByField.indexOf(value) < 0) throw new Error('It\'s invalid!')
    return value
}

export default SortByRule