const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const { createPost, findUser, createUser } = require('./controller/article')
var cors = require('koa-cors');

const home = new Router()

app.use(bodyparser())
app.use(cors())

home.post('signup',  ctx => {
    const body = ctx.request.body
    
    if(!body || !body.username || !body.password) {
        ctx.body = {
            status: -1,
            message: '用户名或密码为空'
        }
    } else {
        const { username, password} = body
        findUser(username).then(res => {
            if(res && res.length === 0) {
                createUser(username, password).then(res => {
                    if(res.error) {
                        ctx.body = {
                            status: -2,
                            message: '创建用户名失败'
                        }
                    }
                    ctx.body = {
                        status: 200
                    }
                }).catch(err => {
                    console.log(err, '------------------cccc')
                    ctx.body = {
                        status: -3,
                        message: '数据库写入失败'
                    }
                })
            } else {
                ctx.body = {
                    status: -4,
                    message: '帐号已存在'
                }
            }
        })
        
        
    }
})


const router = new Router()

router.use('/', home.routes(), home.allowedMethods())



app.use(router.routes()).use(router.allowedMethods())



app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
  })