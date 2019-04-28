const Sequelize = require('sequelize')
const sequelize = require('./db')

const Op = Sequelize.Op
const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

const Posts = sequelize.define('posts', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Users.hasMany(Posts)

const createUser = (username, password) => 
    sequelize.sync()
    .then(() => Users.create({
        username,
        password
    })).then(res => {
        console.log(res.toJSON())
        return {
            error: false
        }
    }).catch(err => {
        console.log(err, 'cccc')
        return {
            error: true
        }
    })

const createPost = ({title, content, userId}) => 
sequelize.sync()
    .then(() => Posts.create({
        userId,
        title,
        content
    })).then(res => {
        console.log(res.toJSON())
        return {
            error: false
        }
    }).catch(err => {
        return {
            error: true
        }
    })

const findUser = ({username='', id=''}) =>  Users.findAll({
    where: {
        [Op.or]: [
            {username},
            {id}
        ]
    }
})

const verifyUser = ({username, password}) => Users.findAll({
    where: {
        [Op.and] : [
            {username},
            {password}
        ]
    }
})

module.exports = {
    createPost,
    createUser,
    findUser,
    verifyUser
}