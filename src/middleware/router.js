import { readdirSync } from 'fs'
import { join } from 'path'
import Router from '@koa/router'

const router = new Router(),
    relativePath = '../router',
    routerPath = join(__dirname, relativePath)

readdirSync(routerPath).map(file => {
    if (file.indexOf('Router.js') > -1) {
        require(relativePath + '/' + file).default(router)
    }
})

export default router
