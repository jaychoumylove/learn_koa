import RegexpRule from './regexp'

const IdsRegexp = /^([0-9],?)+$/

export default RegexpRule(IdsRegexp)