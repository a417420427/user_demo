const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const { createPost, findUser, createUser, verifyUser } = require('./controller/article')
const session=require('koa-session');


var cors = require('koa-cors');

const home = new Router()

app.use(session({
    key: 'koa:sess', /** cookie的名称，可以不管 */
    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: false, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
},app));


app.use(bodyparser())
app.use(cors())

home.post('login', ctx => {
    const body = ctx.request.body
    if(!body || !body.username || !body.password) {
        ctx.body = {
            status: -1,
            message: '用户名或密码为空'
        }
    }  else {
        const {username, password} = body
        verifyUser({username, password}).then(res => {
            if(res.length > 0) {
                ctx.session.user = username;
                ctx.body =  {
                    status: 1
                }
            } else {
                ctx.body = {
                    status: -1,
                    message: '用户名或密码错误'
                }
            } 
        }).catch(err => {
            ctx.body = {
                status: -10,
                message: '登录失败， 请稍后再试'
            }
        })
    }

    
     ctx.body = { success: true, msg: '登录成功！' };
})



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

home.get('status', ctx => {
    if(!ctx.session.user) {
        ctx.body = {
            isLogin: false
        }
    } else {
        ctx.body = {
            isLogin: true
        }
    }
})

const router = new Router()

router.use('/', home.routes(), home.allowedMethods())



app.use(router.routes()).use(router.allowedMethods())



app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
  })