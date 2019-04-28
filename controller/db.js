const Sequelize = require('sequelize')
const connect = new Sequelize('users', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
})

connect.authenticate().then(res => {
    console.log('连接数据库成功')
}).catch(err => {
    console.log(err)
})

module.exports = connect