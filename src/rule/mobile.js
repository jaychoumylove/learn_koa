import RegexpRule from './regexp'

const MobileRegexp = /^1(3|4|5|7|8)[0-9]\d{8}$/

export default RegexpRule(MobileRegexp)