import Success from '../../exception/success'
import { getClients } from '../../messageQueue/index'

const publish = async (ctx) => {
    const {exchange, key, msg} = ctx.request.body
    getClients().NormalClient.publish(exchange, key, msg)
    throw new Success()
}

export default {
    publish,
}
