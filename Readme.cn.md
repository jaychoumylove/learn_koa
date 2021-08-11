# Learn koa

一个简单易用的RESTFul api框架，功能涵盖ORM，自定义异常，数据验证，系统日志等，支持ES6语法。

> 本项目是个人的一个练习项目，如果你使用了本项目作为商业开发或者学习，请到issues告知在下。

## 目录

* [Intro](#Intro)
    * [directory structure](#项目结构)
    * [get started](#快速开始)
* [Router](#Router)
* [Controller](#Controller)
* [ORM](#ORM)
    * [Configure](#ORMConfigure)
    * [Model](#model)
    * [CURD](#ORMCURD)
    * [Transaction](#ORMTransaction)
    * [Migrations](#ORMMigrations)
    * [Seeds](#ORMSeeds)
* [Validation](#Validation)
    * [Validator](#Validator)
    * [Rule](#Rule)
    * [Usage](#validationusage)
* [Exception](#Exception)
    * [CustomException](#CustomException)
    * [Usage](#exceptionusage)
* [Middlerware](#Middlerware)
* [Log](#Log)
* [MQ](#MQ)
* [Redis](#Redis)

## Intro

`learn_koa`是一个简单高效，基于`koa`，轻量级的`node.js`框架，主要特性：
- 支持ES6语法
- 强大的错误处理
- ORM支持
- 独立的路由处理
- 强大的参数校验
- 系统的日志记录
- `redis`客户端
- `rabbitMQ`客户端
- `nodeMailer`客户端

### 项目结构

```  
|-- project
    |-- logs - 文件日志记录
    |   |-- application - 系统日志
    |   |   |-- 2021-07-30.log
    |   |-- debug - DEBUG调试日志
    |   |   |-- 2021-07-23.log
    |   |-- error - 错误体质
    |   |   |-- 2021-07-30.log
    |   |-- warn - 警告日志
    |       |-- 2021-07-29.log
    |-- src
        |-- app.js - 入口文件
        |-- config.js - 配置文件
        |-- nodeMailer.js - mail客户端
        |-- redis.js - redis客户端
        |-- util.js - 辅助工具
        |-- api - api核心业务
        |   |-- controller - 控制层
        |       |-- mq.js
        |       |-- redis.js
        |       |-- user.js
        |-- database - 数据库
        |   |-- knex.js - knex客户端
        |   |-- migrations - 数据库迁移
        |   |   |-- 20210531024816_create_table_person.js
        |   |-- seeds - 数据库填充
        |       |-- add_users.js
        |-- exception - 异常
        |   |-- base.js
        |   |-- done.js
        |   |-- forbidden.js
        |   |-- gone.js
        |   |-- locked.js
        |   |-- methodNotAllowed.js
        |   |-- miss.js
        |   |-- notImplemented.js
        |   |-- parameter.js
        |   |-- signature.js
        |   |-- success.js
        |   |-- token.js
        |   |-- used.js
        |-- messageQueue - 消息队列
        |   |-- connection.js - 服务链接
        |   |-- index.js - 服务入口
        |   |-- channel - 服务channel
        |       |-- base.js
        |       |-- email.js
        |       |-- normal.js
        |-- middleware - 中间件
        |   |-- compose.js - 中间件打包
        |   |-- cors.js
        |   |-- errorHandle.js
        |   |-- logger.js
        |   |-- router.js
        |-- model - 模型层
        |   |-- user.js
        |-- router - 路由层
        |   |-- mqRouter.js
        |   |-- redisRouter.js
        |   |-- userRouter.js
        |-- rule - 验证规则
        |   |-- Ids.js
        |   |-- date.js
        |   |-- example.js
        |   |-- mobile.js
        |   |-- regexp.js
        |   |-- sortBy.js
        |   |-- url.js
        |-- validation - 验证器
            |-- base.js
            |-- id.js
            |-- ids.js
            |-- page.js
            |-- test.js
    |-- .babelrc - babel配置
    |-- .env - 环境变量配置
    |-- .gitignore
    |-- Readme.cn.md
    |-- Readme.md
    |-- feature.md
    |-- knexfile.example.js
    |-- knexfile.js - knexfile配置
    |-- package.json
    |-- yarn.lock
```

### 快速开始

- 克隆这个项目到你的本地
```git
git clone git@github.com:jaychoumylove/learn_koa.git
```
- 进入项目目录并且安装依赖
```bash
cd learn_koa && yarn
```
- 复制`knexfile.example.js`到`knexfile.js` 并且配置你的数据库
- 运行`yarn start`

### Router

你需要在`src/router`下创建路由文件，且路由文件名必须要求以`Router.js`结尾，如：

```js
// src/router/userRouter.js
import user from '../api/controller/user'

const userRouter = (router) => {
    router.get("/user/:id", user.getInfo);
    router.get("/user_list", user.getList);
    router.get("/user_page", user.getListWithPage);
    router.post("/user", user.create);
    router.put("/user/:id", user.update);
    router.patch("/user/:id", user.patch);
    router.del("/user/:id", user.del);
}

export default userRouter;
```

### Controller

这里是你写核心业务的区域，书写规范如下：

- 入参有且仅有一个参数 `ctx` 即`koa`上下文
- `ctx`: `readonly`
- 每一个入口不能用`return`返回，必须抛出异常，如：`throw new Success()`，如果业务处理失败则抛出其他失败异常，关于异常会在[异常](#Exception)里面讲
- 如上，如果有被捕获的异常请直接抛出，不用担心应用崩溃问题，框架底层已经处理了异常，详细可以看[中间件](#Middlerware)

示例如下：
```js
import Success from "../../exception/success";
import Id from "../../validation/id";
import User from "../../model/user";

const patch = async (ctx) => {
  new Id().check(ctx.params);
  const { id } = ctx.params;
  const { first_name } = ctx.request.body;
  await User.where("id", id).save(
    { first_name },
    { patch: true, require: false }
  );
  throw new Success();
};

// ...other functions

export { patch }
```

### ORM

项目ORM基于`Knex`和`Bookshelf`

#### ORMConfigure

- 启动项目前你需要配置`knexfile`
- 如果你需要数据库迁移和填充，请在`knexfile`分别配置`migrations`和`seeds`

#### model

你的所有模型文件请放在`src/model`下，示例如下：
```js
// src/model/user.js
import { bookshelfApp } from '../database/knex'

const User = bookshelfApp.model('User', {
    hasTimestamps: true,
    tableName: 'users',
    hidden: ['password', 'deleted_at'],
})

export default User
```

`src/database/knex.js`的文件内容不建议你更改，除非你要安装`bookshelf`插件。

#### ORMCURD

- `getlist`
```js
const list = await User.where("id", "in", [1,3,5])
    .orderBy("id", "desc")
    .fetchAll();
```
- `getlistWithPage`
```js
const pageList = await new User().orderBy("id", "desc").fetchPage({
    page: 1,
    pageSize: 15,
});
```
- `getFirstRow`
```js
let info = await User.where("id", 2).fetch();
```
- `updateExistRow`
```js
let info = await User.where("id", 2).fetch();
info = await info.save({
    first_name: "first_name",
    last_name: "last_name",
});
```
- `updateRowWithWhere`
```js
await User.where("id", 4).save(
    { name: "salli" },
    { patch: true, require: false }
);
```
- `updateRowWithWhere`
```js
const created = await new User().save({
    first_name: "first_name",
    last_name: "last_name",
});
```
- `deleteRows`
```js
await User.where("id", 6).destroy({
    require: false,
});
```

你可以访问 [Knex](https://knexjs.org/ "Knex") 和 [Bookshelf](https://bookshelfjs.org/ "bookshelf") 参考更多`api`。 

#### migrations

- 全局安装`knex`
```shell
yarn global add knex # npm i knex -g
```
- 启用数据迁移请在`knexfile.js`配置，示例:
```js
module.exports = {
  myenv: {
    client: "comeclient",
    connection: {...someconnections},
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
  },
};
```

- 创建迁移文件
```shell
knex migrate:make [filename]
```
然后你需要在`up`和`down`里面完成迁移逻辑；示例：
```js
/**
 * @Notice open up to
 */
// import { Knex } from "knex";

/**
 * @param {Knex} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.timestamps();
  });
};

/**
 * @param {Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
```

#### seeds

- 填充数据需要需要全局安装`knex`

- 启用数据填充请在`knexfile.js`配置，示例:
```js
module.exports = {
  myenv: {
    client: "comeclient",
    connection: {...someconnections},
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    }
  },
};
```

- 创建填充文件
```shell
knex seed:make [filename]
```
然后你需要在`up`和`down`里面完成填充逻辑；填充400条数据示例：
```js
/**
 * @Notice open up to
 */

// import { Knex } from "knex";
// import faker from "Faker";
const faker = require("Faker");

const tableName = "users";
const insertRowLength = 400;

let insertDatas = [];
const currentDate = new Date();

while (insertDatas.length < insertRowLength) {
  const male = Math.random() > 0.5;
  insertDatas.push({
    first_name: male
      ? faker.Name.firstNameMale()
      : faker.Name.firstNameFemale(),
    last_name: faker.Name.lastName(),
    created_at: currentDate,
    updated_at: currentDate,
  });
}

/**
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
exports.seed = function (knex) {
  return knex(tableName)
    .del()
    .then(function () {
      return knex(tableName).insert(insertDatas);
    });
};
```

### Validation

框架基于 [jio](https://joi.dev/api/ "joi") 实现了高效易用的校验器，基本用法如下：
```js
new Id().check({ id: 's' });
```
数据验证不通过会自动抛出`Parameter`异常，成功不会有任何返回
#### Validator

在`src/validation` 下书写验证器，比如我们写一个校验`id`的验证器：
```js
import Base from './base'
import Joi from 'joi';

export default class Id extends Base {
    defaultSchema = Joi.object({
        id: Joi.number().integer().required().messages({
            'number.base': 'Invalid id!',
            'any.required': 'Please enter id!',
            'number.integer': 'Id must be integer!'
        })
    })
}
```

#### rule
在`src/rule` 下书写自己的验证规则，比如我们写一个校验`ids`的规则：
```js
import RegexpRule from './regexp'

function fn (value, helpers) {
  const regex = new RegExp(/^([0-9],?)+$/)
  if (false === regex.test(value)) throw new Error('It\'s invalid!')
  return value
} 

export default fn;
```

#### validationusage

- 在控制器里面使用
```js
new Ids().check({ id: '1,2,4,s' });
```
- 在验证器里面使用自定义规则
```js
import Base from './base'
import Joi from 'joi';
import IdsRule from '../rule/Ids'

export default class Ids extends Base {
    defaultSchema = Joi.object({
        ids: Joi.string().required().custom(IdsRule).messages({
            'string.base': 'Invalid ids!',
            'any.required': 'Please enter ids!',
            'any.custom': 'Invalid Ids!'
        }),
    })
}
```

### Exception

> The best way to deal exception is throw it.
> <p style="text-align: right">By <strong>Learn koa</strong></p>

框架基于`koa`实现了强大的异常处理器，以及异常机制，你可以在控制器里面自由的抛出异常.
```js
const throwIt = async (ctx) => {
    throw new Error('Just throw an error')
};
```
与此同时，自定义的每一个异常都代表一个`Response`，以`src/exception/parameter.js`内容示例:
```js
import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Parameter extends Base {
    message = 'Invalid parameters!'
    errorCode = 10001
    data = null

    /**
     * Generate Parameter Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor (data = {}, status = StatusCodes.BAD_REQUEST) {
        super()
        this.excepted(data, status)
    }
}
```
其中，`message`，`errorCode`，`data` 为三个基础的返回参数，所有的返回都会基于这三个返回参数。

#### CustomException

如上所说，自定义异常十分简单：
```js
// src/exception/custom.js
import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Custom extends Base {
    message = 'Custom Exception!'
    errorCode = 12345
    data = null

    /**
     * Generate Custom Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor (data = {}, status = StatusCodes.BAD_REQUEST) {
        super()
        this.excepted(data, status)
    }
}
```

#### exceptionusage

在控制器中的使用十分简单，就像抛出原生异常一样:
```js
/**
 * get info by id
 * @param {Context} ctx
 */
const throwCustom = async (ctx) => {
  throw new Custom();
};
```

## License

[MIT](LICENSE)