import redis from '../controller/redis'
import Router from '@koa/router';

const redisRouter = (router: Router) => {
    router.get('/redis', redis.get);
    router.post('/redis', redis.save);
    router.del('/redis', redis.del);
}

export default redisRouter;