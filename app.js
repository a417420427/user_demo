import Koa from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'
import session from 'koa-session-minimal'
import MysqlSession from 'koa-mysql-session'
import cors from 'koa-cors'
import home from './router'
import sequelize from './modals/db'

const app = new Koa();
const router = new Router()


const store = new MysqlSession({
    user: 'root',
    password: '123456',
    database: 'session',
    host: '127.0.0.1',
  })

const cookie = {
  maxAge: '', // cookie有效时长
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  httpOnly: false, // 是否只用于http请求中获取
  overwrite: '',  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: ''
}



app.use(session({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie
  }))
  

app.use(bodyparser())
app.use(cors({
    credentials: true,
}))





router.use('/', home.routes(), home.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
  })
})
