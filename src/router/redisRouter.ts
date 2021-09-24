import redis from '../controller/redis'

const redisRouter = (router) => {
    router.get('/redis', redis.get);
    router.post('/redis', redis.save);
    router.del('/redis', redis.del);
}

export default redisRouter;