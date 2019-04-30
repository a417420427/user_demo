import Sequelize from 'sequelize'
import sequelize from '../modals/db'
import { User, Article, Tags } from '../modals/user'
const Op = Sequelize.Op


export const findUser = ({username='', id=''}) =>  User.findOne({
    where: {
        [Op.or]: [
            {username},
            {id}
        ]
    }
}) 


export const verifyUser = ({username, password}) => User.findOne({
    where: {
        [Op.and] : [
            {username},
            {password}
        ]
    }
})


// -1 用户名已存在  -2创建数据失败 1成功
export const createUser = async ({username, password}) =>  {
    try {
        const isUserExist = await findUser({username})
        // 是否存在
        if(isUserExist) {
            return -1
        }
        await User.create({username, password})
        return 1
    } catch (e) {
        console.log(e)
        return -2
    }
    
}   

export const createArticle = async ({username, userId, content, title}) => {
    console.log({username, userId, content, title})
    try {
        await Article.create({username, userId, content, title})
        return 1
    } catch (e) {
        return -2
    }
}

export const getAticles = async () => {
    try {
        const res = await Article.findAll({limit: 10, order: ['createAt', 'DESC']})
        return res
    } catch(e) {
        return -2
    }
}


