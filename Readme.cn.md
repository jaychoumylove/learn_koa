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

`learn_koa`是一个简单高效，基于`koa`，轻量级的`node.ts`框架，主要特性：
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
    |   |-- error - 错误日志
    |   |   |-- 2021-07-30.log
    |   |-- warn - 警告日志
    |       |-- 2021-07-29.log
    |-- src
        |-- app.ts - 入口文件
        |-- config.ts - 配置文件
        |-- nodeMailer.ts - mail客户端
        |-- redis.ts - redis客户端
        |-- util.ts - 辅助工具
        |-- logger.ts - 日志类
        |-- api - api核心业务
        |   |-- controller - 控制层
        |       |-- mq.ts
        |       |-- redis.ts
        |       |-- user.ts
        |-- database - 数据库
        |   |-- knex.ts - knex客户端
        |   |-- migrations - 数据库迁移
        |   |   |-- 20210531024816_create_table_person.ts
        |   |-- seeds - 数据库填充
        |       |-- add_users.ts
        |-- exception - 异常
        |   |-- base.ts
        |   |-- done.ts
        |   |-- forbidden.ts
        |   |-- gone.ts
        |   |-- locked.ts
        |   |-- methodNotAllowed.ts
        |   |-- miss.ts
        |   |-- notImplemented.ts
        |   |-- parameter.ts
        |   |-- signature.ts
        |   |-- success.ts
        |   |-- token.ts
        |   |-- used.ts
        |-- messageQueue - 消息队列
        |   |-- connection.ts - 服务链接
        |   |-- index.ts - 服务入口
        |   |-- channel - 服务channel
        |       |-- base.ts
        |       |-- email.ts
        |       |-- normal.ts
        |-- middleware - 中间件
        |   |-- compose.ts - 中间件打包
        |   |-- cors.ts
        |   |-- errorHandle.ts
        |   |-- router.ts
        |-- model - 模型层
        |   |-- user.ts
        |-- router - 路由层
        |   |-- mqRouter.ts
        |   |-- redisRouter.ts
        |   |-- userRouter.ts
        |-- rule - 验证规则
        |   |-- Ids.ts
        |   |-- date.ts
        |   |-- example.ts
        |   |-- mobile.ts
        |   |-- regexp.ts
        |   |-- sortBy.ts
        |   |-- url.ts
        |-- validation - 验证器
            |-- base.ts
            |-- id.ts
            |-- ids.ts
            |-- page.ts
            |-- test.ts
    |-- .babelrc - babel配置
    |-- .env - 环境变量配置
    |-- .gitignore
    |-- Readme.cn.md
    |-- Readme.md
    |-- feature.md
    |-- knexfile.example.ts
    |-- knexfile.ts - knexfile配置
    |-- package.tson
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
- 复制`knexfile.example.ts`到`knexfile.ts` 并且配置你的数据库
- 运行`yarn start`

### Router

你需要在`src/router`下创建路由文件，且路由文件名必须要求以`Router.ts`结尾，如：

```ts
// src/router/userRouter.ts
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
```ts
import Success from "../../exception/Success";
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
```ts
// src/model/user.ts
import { bookshelfApp } from '../database/knex'

const User = bookshelfApp.model('User', {
    hasTimestamps: true,
    tableName: 'users',
    hidden: ['password', 'deleted_at'],
})

export default User
```

`src/database/knex.ts`的文件内容不建议你更改，除非你要安装`bookshelf`插件。

#### ORMCURD

- `getlist`
```ts
const list = await User.where("id", "in", [1,3,5])
    .orderBy("id", "desc")
    .fetchAll();
```
- `getlistWithPage`
```ts
const pageList = await new User().orderBy("id", "desc").fetchPage({
    page: 1,
    pageSize: 15,
});
```
- `getFirstRow`
```ts
let info = await User.where("id", 2).fetch();
```
- `updateExistRow`
```ts
let info = await User.where("id", 2).fetch();
info = await info.save({
    first_name: "first_name",
    last_name: "last_name",
});
```
- `updateRowWithWhere`
```ts
await User.where("id", 4).save(
    { name: "salli" },
    { patch: true, require: false }
);
```
- `updateRowWithWhere`
```ts
const created = await new User().save({
    first_name: "first_name",
    last_name: "last_name",
});
```
- `deleteRows`
```ts
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
- 启用数据迁移请在`knexfile.ts`配置，示例:
```ts
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
```ts
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

- 启用数据填充请在`knexfile.ts`配置，示例:
```ts
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
```ts
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
```ts
new Id().check({ id: 's' });
```
数据验证不通过会自动抛出`Parameter`异常，成功不会有任何返回
#### Validator

在`src/validation` 下书写验证器，比如我们写一个校验`id`的验证器：
```ts
import Base from './Base'
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
```ts
import RegexpRule from './Regexp'

function fn (value, helpers) {
  const regex = new RegExp(/^([0-9],?)+$/)
  if (false === regex.test(value)) throw new Error('It\'s invalid!')
  return value
} 

export default fn;
```

#### validationusage

- 在控制器里面使用
```ts
new Ids().check({ id: '1,2,4,s' });
```
- 在验证器里面使用自定义规则
```ts
import Base from './Base'
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
```ts
const throwIt = async (ctx) => {
    throw new Error('Just throw an error')
};
```
与此同时，自定义的每一个异常都代表一个`Response`，以`src/exception/parameter.ts`内容示例:
```ts
import { StatusCodes } from 'http-status-codes'
import Base from './Base'

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
```ts
// src/exception/custom.ts
import { StatusCodes } from 'http-status-codes'
import Base from './Base'

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

#### Exception Usage

在控制器中的使用十分简单，就像抛出原生异常一样:
```ts
/**
 * get info by id
 * @param {Context} ctx
 */
const throwCustom = async (ctx) => {
  throw new Custom();
};
```

### Middlerware

所有的中间件必须放在`src/middleware`下，且在`compose.ts`里面注册中间件。

目前框架内置的中间件有(洋葱模型从外到里)：

- `koa-response-time` 记录响应时间
- `koa-send` 设置静态文件目录
- `errorHandle` 由`try...catch`包裹的异常处理，日志记录，路由404处理，`Option`请求处理等
- `@koa/cors` 请求跨域处理
- `koa-bodyparser` 解构`body`里面的`json`数据
- `router` 每个`router` 处理

所有的中间件统一交给`koa-compose`处理。
如果你想要新增合适的中间件，请在合适的位置添加。

### Log

框架基于`log4js` 加入了强大的日志系统。日志记录放在`logs`下，默认按级别分别设置如下四个目录存放日志文件
- `application` 日志记录合集
- `debug` `debug`级别的调试日志
- `warn` `warn`级别的警告日志
- `error` `error`级别的错误|异常日志

且每个目录下的文件按年月日拆分。

主要逻辑在`src/logger.ts` 下，暴露多个`api`:`writeInfoLog`,`writeErrorLog`,`writeDebugLog`,`writeLog`等，你可以根据场景写入日志。

> 注意：本框架重写了 `Console.info`,`Console.error`,`Console.warn`,`Console.log`，你只需要使用这几个日志方法即可记录日志。

> 测试环境以及开发环境下默认开启数据库debug模式

如下是一个`PUT /user/6`的请求日志：
```log
[2021-07-29T10:10:46.619] [INFO] application - PUT /user/6: Start.
[2021-07-29T10:10:46.811] [DEBUG] application - [DATABASE]
[2021-07-29T10:10:46.812] [DEBUG] application - {
  method: 'select',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [ '6', 1 ],
  __knexQueryUid: 'T-QJlBtZpf2f_t5Un4ziw',
  sql: 'select `users`.* from `users` where `id` = ? and `users`.`deleted_at` is null limit ?'
}
[2021-07-29T10:10:46.846] [DEBUG] application - [DATABASE]
[2021-07-29T10:10:46.848] [DEBUG] application - {
  method: 'update',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [
    'alal',
    'hahha',
    null,
    2021-07-22T07:50:50.000Z,
    2021-07-23T02:11:28.000Z,
    null,
    6
  ],
  __knexQueryUid: '0YHu_JrBCINsM6rFm1QWk',
  sql: 'update `users` set `first_name` = ?, `last_name` = ?, `password` = ?, `created_at` = ?, `updated_at` = ?, `deleted_at` = ? where `id` = ?'
}
[2021-07-29T10:10:46.857] [DEBUG] application - [DATABASE]
[2021-07-29T10:10:46.857] [DEBUG] application - {
  method: 'select',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [ 6, 1 ],
  __knexQueryUid: 'elQIlpOPTh1l8MOPTsoTL',
  sql: 'select `users`.* from `users` where `users`.`id` = ? and `users`.`deleted_at` is null limit ?'
}
[2021-07-29T10:10:46.860] [INFO] application - PUT /user/6: OK; spend: 241ms
```

### MQ

消息队列是本框架扩展的一个内容，你可以不使用它。
在`env`里面配置：
```
RABBIT_MQ_STATUS=1 # 是否启用
RABBIT_MQ_HOST=localhost
RABBIT_MQ_PORT=5672
RABBIT_MQ_USER=guest
RABBIT_MQ_PASS=guest
```

#### 创建通道

在`src/messageQueue/channel`下面创建文件，示例：
```ts
import Base from './Base'

export default class Normal extends Base {
    // 定义你的路由
    routes = {
        'topic_logs': {
            name: 'topic_logs',
            type: 'topic',
            option: {
                durable: false
            }
        }
    }

    // 定义你的消费队列
    queues = {
        'report': {
            name: undefined,
            createOption: {
                exclusive: true
            },
            bindExchange: 'topic_logs', // 绑定的路由
            bindKey: [ // 绑定的关键字
                '#'
            ],
            consume: this.consumeReport, // 消费的执行函数
            consumeOption: {
                noAck: true
            }
        }
    }

    consumeReport (msg) {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
    }
}
```

具体逻辑请看`src/messageQueue/channel/base.ts`，封装比较粗浅。

#### 消费

消费的使用比较简单，提取对应的客户端执行消费即可，示例：
```ts
// src/api/controller/mq.ts
import Success from "../../exception/Success";
import { getClients } from "../../messageQueue/index";

const publish = async (ctx) => {
  const { exchange, key, msg } = ctx.request.body;
  getClients().NormalClient.publish(exchange, key, msg);
  throw new Success();
};

export default {
  publish,
};
```

### Redis

Redis是本框架扩展的一个内容，你可以不使用它。
在`env`里面配置：
```
REDIS_STATUS=1 # 是否启用
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_DB=1
```

使用示例：
```ts
// src/api/controller/redis.ts
import Success from '../../exception/Success'
import RedisClient from '../../redis'

const get = async (ctx) => {
    const { key } = ctx.request.query
    const val = await RedisClient.get(key)
    throw new Success(val)
}

const save = async (ctx) => {
    const { key, value } = ctx.request.body
    await RedisClient.set(key, value)
    throw new Success()
}

const del = async (ctx) => {
    const { key } = ctx.request.query
    await RedisClient.del(key)
    throw new Success()
}

export default {
    save,
    del,
    get
}
```

## Contributing

> Before push your request, you should run `yarn lint` or `yarn lintWithFix` to make sure you code pass linter. 

## License

[MIT](LICENSE)