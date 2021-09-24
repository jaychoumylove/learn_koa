import mq from '../controller/mq';

const mqRouter = (router) => {
    router.post('/mq', mq.publish);
    router.get('/mq_mail', mq.publishMailer);
};

export default mqRouter;
