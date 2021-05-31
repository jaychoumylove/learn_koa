import Success from "../../exception/success";
import User from "../model/user";
import faker from "Faker";

const getInfo = async (ctx) => {
  const info = await User.where("id", 23).fetch();
  throw new Success(info);
};

const getList = async (ctx) => {
  const info = await User.where("id", "in", [3, 45, 21, 134])
    .orderBy("id", "desc")
    .fetchAll();

  throw new Success(info);
};

const getListWithPage = async (ctx) => {
  const page = faker.random.number(10);
  const pageSize = 15;
  const info = await new User().orderBy("id", "desc").fetchPage({
    page: page,
    pageSize: pageSize,
  });
  throw new Success({
    pagination: info.pagination,
    rows: info.models,
  });
};

const update = async (ctx) => {
  let info = await User.where("id", 4).fetch();
  info = await info.save({
    first_name: faker.Name.firstName(),
    last_name: faker.Name.lastName(),
  });
  throw new Success(info);
};

const patch = async (ctx) => {
  const info = await User.where("id", 5).save(
    { first_name: faker.Name.firstName() },
    { patch: true }
  );
  throw new Success(info);
};

const del = async (ctx) => {
  await User.where("id", ">", 5).destroy();
  throw new Success();
};

const create = async (ctx) => {
  // const info = await User.forge({
  //   first_name: faker.Name.firstName(),
  //   last_name: faker.Name.lastName(),
  // }).save();
  const info = await new User().save({
    first_name: faker.Name.firstName(),
    last_name: faker.Name.lastName(),
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
