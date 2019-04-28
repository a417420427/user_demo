
const Sequelize = require('sequelize')
const sequelize = require('./db')

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true

    }
})


const Articles = sequelize.define('articles', {
   
    content: {
        type: Sequelize.STRING
    },
    postTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

})

Users.hasMany(Articles)


sequelize.sync().then(Articles.create({
    userId: '1',
    content: 'cccxx-----xxx'
})).then(res => console.log(res.toJSON()))
.catch(err => err)
// sequelize.sync().then(() => Users.create({
//     username: 'zf',
//     password: '2222',
//     phone: '13333333333',
//     description: 'hehehe',
//     articles: [{
//         content: 'content1'
//     },{
//         content: 'content2'
//     }]
// }, {
//     include: [Articles]
// })).then(res => {
//     console.log(res.toJSON())
// })