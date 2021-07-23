import Success from '../../exception/success'
import User from '../../model/user'
import faker from 'Faker'
import { Context } from 'koa'
import Parameter from '../../exception/parameter'
import Miss from '../../exception/miss'
import Id from '../../validation/id'
import Test from '../../validation/test'
import Ids from '../../validation/ids'
import Page from '../../validation/page'
import { bookshelfApp } from '../../database/knex'

/**
 * get info by id
 * @param {Context} ctx
 */
const getInfo = async (ctx) => {
    (new Id).check(ctx.params)
    const { id } = ctx.params
    const info = await User.where('id', id).fetch()
    throw new Success(info)
}

/**
 * get info by ids
 * @param {Context} ctx
 */
const getList = async (ctx) => {
    (new Ids()).check(ctx.request.query)
    const { ids } = ctx.request.query
    const parseIds = ids.split(',')
    const info = await User.where('id', 'in', parseIds)
    .orderBy('id', 'desc')
    .fetchAll()

    throw new Success(info)
}

const getListWithPage = async (ctx) => {
    (new Page()).check(ctx.request.query)
    let { page, size } = ctx.request.query
    if (!page) {
        page = faker.random.number(10)
    }
    if (!size) {
        size = 15
    }
    const info = await new User().orderBy('id', 'desc').fetchPage({
        page: page,
        pageSize: size,
    })
    throw new Success({
        pagination: info.pagination,
        rows: info.models,
    })
}

const update = async (ctx) => {
    (new Id).check(ctx.params);
    // todo remove if your test over
    (new Test()).check(ctx.request.body)
    const { id } = ctx.params
    const { first_name, last_name } = ctx.request.body
    let info = await User.where('id', id).fetch()
    if (!info) {
        throw new Miss({ message: 'Can\'t find user!' })
    }
    info = await info.save({
        first_name,
        last_name,
    })
    throw new Success(info)
}

const patch = async (ctx) => {
    (new Id).check(ctx.params)
    const { id } = ctx.params
    const { first_name } = ctx.request.body
    await User.where('id', id).save(
        { first_name },
        { patch: true, require: false }
    )
    throw new Success()
}

const del = async (ctx) => {
    (new Id).check(ctx.params)
    const { id } = ctx.params
    let transaction
    try {
        transaction = await bookshelfApp.transaction()
        await User.where('id', id).destroy({
            require: false,
            transacting: transaction
        })
        // test the transaction
        // throw new Error('Something was wrong!!!');
        await transaction.commit()
    } catch (e) {
        if (transaction) await transaction.rollback()
        throw e
    }

    throw new Success()
}

const create = async (ctx) => {
    const { first_name, last_name } = ctx.request.body
    if (!last_name || !first_name) {
        throw new Parameter()
    }
    const info = await (new User()).save({
        first_name: first_name,
        last_name: last_name,
    })
    throw new Success(info)
}

export default {
    getInfo,
    getList,
    getListWithPage,
    create,
    update,
    patch,
    del,
}
