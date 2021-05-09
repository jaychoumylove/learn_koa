import Koa from "koa";

const app = new Koa();

const delay = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

app.use(async (ctx) => {
  ctx.body = "hello world!";
});

app.listen(3000, async () => {
  console.time("server is running at http://localhost:3000");
  await delay(2000);
  console.timeEnd("server is running at http://localhost:3000");
});
