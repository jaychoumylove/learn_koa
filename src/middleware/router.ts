import { readdirSync } from 'fs'
import { join } from 'path'
import * as Router from '@koa/router'

const router = new Router(),
    relativePath = '../router',
    routerPath = join(__dirname, relativePath)

readdirSync(routerPath).map(file => {
    if (file.includes('Router.ts')) {
        require(relativePath + '/' + file).default(router)
    }
})

export default router
