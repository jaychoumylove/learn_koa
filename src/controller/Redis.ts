import Success from '../exception/Success'
import RedisClient from '../Redis'

const get = async (ctx) => {
    const { key } = ctx.request.query
    const val = await RedisClient.get(key)
    throw new Success(val)
}

const save = async (ctx) => {
    const { key, value } = ctx.request.body
    await RedisClient.set(key, value)
    throw new Success()
}

const del = async (ctx) => {
    const { key } = ctx.request.query
    await RedisClient.del(key)
    throw new Success()
}

export default {
    save,
    del,
    get,
}
