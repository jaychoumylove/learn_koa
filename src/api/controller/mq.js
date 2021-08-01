import Success from "../../exception/success";
import { getClients } from "../../messageQueue/index";

const publish = async (ctx) => {
  const { exchange, key, msg } = ctx.request.body;
  getClients().NormalClient.publish(exchange, key, msg);
  throw new Success();
};

const publishMailer = async (ctx) => {
  getClients().EmailClient.publish(
    "exceptions",
    "exception",
    new Error("222").message
  );
  throw new Success();
};

export default {
  publish,
  publishMailer,
};
