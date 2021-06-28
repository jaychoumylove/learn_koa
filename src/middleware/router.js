import Router from "@koa/router";
import user from "../api/controller/user";

const router = new Router();

router.get("/user/:id", user.getInfo);
router.get("/user_list", user.getList);
router.get("/user_page", user.getListWithPage);
router.post("/user", user.create);
router.put("/user/:id", user.update);
router.patch("/user/:id", user.patch);
router.del("/user/:id", user.del);

export default router;
