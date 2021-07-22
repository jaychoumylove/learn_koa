import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class Success extends Base {
    /**
     * Generate Success Response
     * @param {Object} data
     */
    constructor (data = null) {
        super({ ...DefaultRestCode.Success, ...{ data } })
    }
}
