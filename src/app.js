import Koa from "koa";
import middleware from "./middleware/compose";
import dotEnv from "dotenv";
import { delay } from "./util";

dotEnv.config();
const app = new Koa();
app.use(middleware);

app.listen(3000, async () => {
  console.time("server is running at http://localhost:3000");
  await delay(2000);
  console.timeEnd("server is running at http://localhost:3000");
});
