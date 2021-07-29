import mq from '../api/controller/mq'

const mqRouter = (router) => {
    router.post("/mq", mq.publish);
}

export default mqRouter;