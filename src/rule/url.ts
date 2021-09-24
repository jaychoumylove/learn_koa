import RegexpRule from './regexp'

const UrlRegexp = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/

export default RegexpRule(UrlRegexp)