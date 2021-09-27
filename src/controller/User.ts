import Success from '../exception/Success';
import faker from 'Faker';
import Parameter from '../exception/Parameter';
import Miss from '../exception/Miss';
import Id from '../validation/Id';
import Ids from '../validation/ids';
import Page from '../validation/Page';
import User from '../entity/User';
import { In, getManager } from 'typeorm';

/**
 * get info by id
 * @param {Context} ctx
 */
const getInfo = async (ctx) => {
    new Id().check(ctx.params);
    const { id } = ctx.params;
    const info = await User.findOne(id);
    throw new Success(info);
};

/**
 * get info by ids
 * @param {Context} ctx
 */
const getList = async (ctx) => {
    new Ids().check(ctx.request.query);
    const { ids } = ctx.request.query;
    let parseIds: string[] = []
    if (typeof ids === 'string') {
        parseIds = ids.split(',');
    }
    const info = await User.find({
        where: {
            id: In(parseIds),
        },
        order: {
            id: 'DESC',
        },
    });

    throw new Success(info);
};

const getListWithPage = async (ctx) => {
    new Page().check(ctx.request.query);
    let { page, size } = ctx.request.query;
    if (!page) {
        page = faker.random.number(10);
    }
    if (!size) {
        size = 15;
    }
    const info = await User.find({
        order: {
            id: 'DESC',
        },
        skip: (page - 1) * size,
        take: size,
    })
    throw new Success(info);
};

const update = async (ctx) => {
    new Id().check(ctx.params);
    const { id } = ctx.params;
    const { firstName, lastName } = ctx.request.body;
    let info = await User.findOne(id);
    if (!info) {
        throw new Miss({ message: "Can't find user!" });
    }
    info.firstName = firstName;
    info.lastName = lastName;
    await info.save()
    throw new Success(info);
};

const patch = async (ctx) => {
    new Id().check(ctx.params);
    const { id } = ctx.params;
    let info = await User.findOne(id);
    if (!info) {
        throw new Miss({ message: "Can't find user!" });
    }
    const { firstName } = ctx.request.body;
    await User.update({ id }, {
        firstName: firstName,
    })
    throw new Success();
};

const del = async (ctx) => {
    new Id().check(ctx.params);
    const { id } = ctx.params;
    let info = await User.findOne(id);
    if (!info) {
        throw new Miss({ message: "Can't find user!" });
    }

    try {
        await getManager().transaction(async () => {
            // soft delete
            await User.softRemove(info, { });

            // delete anyway
            // await User.delete({ id });
        });
    } catch (e) {
        throw e;
    }

    throw new Success();
};

const create = async (ctx) => {
    const { firstName, lastName } = ctx.request.body;
    if (!lastName || !firstName) {
        throw new Parameter();
    }
    // const user = new User();
    // user.firstName = firstName;
    // user.lastName = lastName;
    // await user.save();

    const user = User.create({ firstName: firstName, lastName: lastName });
    await user.save();

    throw new Success(user);
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
