
import Router from 'koa-router'
import { createUser, verifyUser, createArticle, getAticles } from '../controller/user'
import { errorHandler } from '../utils/errorHandle';

const home = new Router()




home.post('article', async ctx => {
    const body = ctx.request.body || {}
    const {content, title} = body;
    if(!content || !title) {
        ctx.body = {
            status: -1,
            message: '标题或内容不能为空'
        }
    } else {
        const { userId, username } = ctx.session.userId
        const result = createArticle({
            userId,
            title,
            content,
            username
        })
        const message = errorHandler(result)

        ctx.body = {
            error: !!message,
            message
        } 
    }
})

home.post('login', async ctx => {
    const body = ctx.request.body || {}
    const {username, password} = body;
    if(!username || !password) {
        ctx.body = {
            status: -1,
            message: '用户名或密码为空'
        }
    } else {
        const res = await verifyUser({username, password})

        // 改用户验证成功, 保存登录信息
        if(res != null) {
            const dataValues = res.dataValues

            ctx.session = {
                username: dataValues.username,
                userId: dataValues.id
            };
            ctx.body = { status: 200, msg: '登录成功！', username };
        } else {
            ctx.body = {
                status: -1,
                message: '用户名或密码错误'
            }
        }
    }
     
})


home.post('signup',  async ctx => {
    const body = ctx.request.body || {}
    const {username, password} = body;
    
    if(!username || !password) {
        ctx.body = {
            status: -1,
            message: '用户名或密码为空'
        }
    } else {
        const status = await createUser({username, password})
        const message = errorHandler(status)
        
        ctx.body = {
            error: !!message,
            message
        }
    }
})


home.get('status', ctx => {
    if(!ctx.session.username) {
        ctx.body = {
            isLogin: false
        }
    } else {
        // 如果已经登录, 返回用户信息
        ctx.body = {
            isLogin: true,
            username: ctx.session.username
        }
    }
})

home.get('article', async ctx => {
    const res = await getAticles()
    if(res === -2) {
        ctx.body = {
            error: true,
            message: '获取文章失败'
        }
    } else {
        ctx.body = {
            articles: res || []
        }
    }
    
})

module.exports = home