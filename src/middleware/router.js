import Router from "@koa/router";
import user from "../api/controller/user";

const router = new Router();

router.get("/user", user.getInfo);
router.get("/user_list", user.getList);
router.get("/user_page", user.getListWithPage);
router.post("/user", user.create);
router.put("/user", user.update);
router.patch("/user", user.patch);
router.del("/user", user.del);

export default router;
