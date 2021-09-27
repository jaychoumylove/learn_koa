import RegexpRule from './Regexp'

const IdsRegexp = /^([0-9],?)+$/

export default RegexpRule(IdsRegexp)