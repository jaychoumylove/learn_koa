import RegexpRule from './regexp'

const DateRegexp = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/

export default RegexpRule(DateRegexp)