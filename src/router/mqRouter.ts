import mq from '../controller/mq';
import Router from '@koa/router';

const mqRouter = (router: Router) => {
    router.post('/mq', mq.publish);
    router.get('/mq_mail', mq.publishMailer);
};

export default mqRouter;
