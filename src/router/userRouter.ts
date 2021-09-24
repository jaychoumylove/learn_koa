import user from '../controller/user'

const userRouter = (router) => {
    router.get('/user/:id', user.getInfo);
    router.get('/user_list', user.getList);
    router.get('/user_page', user.getListWithPage);
    router.post('/user', user.create);
    router.put('/user/:id', user.update);
    router.patch('/user/:id', user.patch);
    router.del('/user/:id', user.del);
}

export default userRouter;