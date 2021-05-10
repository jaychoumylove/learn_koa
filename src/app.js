import Koa from "koa";
import middleware from "./middleware/compose";
import dotEnv from "dotenv";
import { initLogger } from "./middleware/logger";

dotEnv.config();
initLogger();
const app = new Koa();
app.use(middleware);

app.listen(3000, async () => {
  // console.time("server is running at http://localhost:3000");
  // await delay(2000);
  // console.timeEnd("server is running at http://localhost:3000");
  console.log("server is running at http://localhost:3000");
});
