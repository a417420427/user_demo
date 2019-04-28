const Sequelize = require('sequelize')
const sequelize = require('./db')

const Product = sequelize.define('product', {
    title: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
  });


const Tag = sequelize.define('tag', {
    name: Sequelize.STRING
  });
  
  Product.hasMany(Tag);


  sequelize.sync().then(() => Tag.create({
      name: 'ccccccc',
      productId: '2'
  })).then(res => {
      console.log(res.toJSON())
  })

// sequelize.sync().then(() =>   Product.create({
//     title: 'Chair',
//     tags: [
//       { name: 'Alpha'},
//       { name: 'Beta'}
//     ]
//   }, {
//     include: [ Tag ]
//   })).then(res => console.log(res.toJSON()))