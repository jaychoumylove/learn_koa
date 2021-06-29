import Success from "../../exception/success";
import User from "../model/user";
import faker from "Faker";
import { Context } from "koa";
import Parameter from "../../exception/parameter";
import Miss from "../../exception/miss";

/**
 * get info by id
 * @param {Context} ctx
 */
const getInfo = async (ctx) => {
  const { id } = ctx.params;
  if (!id) {
    throw new Parameter({ message: "'id' not found" });
  }
  const info = await User.where("id", id).fetch();
  throw new Success(info);
};

/**
 * get info by ids
 * @param {Context} ctx
 */
const getList = async (ctx) => {
  const { ids } = ctx.request.query;
  if (!ids) {
    throw new Parameter({ message: "'ids' not found" });
  }
  const parseIds = ids.split(",");
  const info = await User.where("id", "in", parseIds)
    .orderBy("id", "desc")
    .fetchAll();

  throw new Success(info);
};

const getListWithPage = async (ctx) => {
  let { page, size } = ctx.request.query;
  if (!page) {
    page = faker.random.number(10);
  }
  if (!size) {
    size = 15;
  }
  const info = await new User().orderBy("id", "desc").fetchPage({
    page: page,
    pageSize: size,
  });
  throw new Success({
    pagination: info.pagination,
    rows: info.models,
  });
};

const update = async (ctx) => {
  const { id } = ctx.params;
  if (!id) {
    throw new Parameter({ message: "'id' not found" });
  }
  const { first_name, last_name } = ctx.request.body;
  let info = await User.where("id", id).fetch();
  if (!info) {
    throw new Miss();
  }
  info = await info.save({
    first_name,
    last_name,
  });
  throw new Success(info);
};

const patch = async (ctx) => {
  const { id } = ctx.params;
  if (!id) {
    throw new Parameter({ message: "'id' not found" });
  }
  const { first_name } = ctx.request.body;
  const info = await User.where("id", id).save(
    { first_name },
    { patch: true, require: false }
  );
  throw new Success(info);
};

const del = async (ctx) => {
  const { id } = ctx.params;
  if (!id) {
    throw new Parameter({ message: "'id' not found" });
  }
  await User.where("id", id).destroy({ require: false });
  throw new Success();
};

const create = async (ctx) => {
  const { first_name, last_name } = ctx.request.body;
  if (!last_name || !first_name) {
    throw new Parameter();
  }

  const info = await new User().save({
    first_name: first_name,
    last_name: last_name,
  });
  throw new Success(info);
};

export default {
  getInfo,
  getList,
  getListWithPage,
  create,
  update,
  patch,
  del,
};
