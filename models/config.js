
require('dotenv').config()
const Sequelize = require("sequelize")
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
})
module.exports = sequelize;

  // const db = {}

  // db.sequelize = sequelize;
  // db.Sequelize = Sequelize;
  // console.log("DB IS WORKING \n ");
  // console.log("DB IS WORKING \n ");
  // console.log("DB IS WORKING \n ");
  // db.file = require('./file.model')(sequelize, Sequelize)
  // db.user = require('./user.model')(sequelize, Sequelize)
  // db.userToken = require('./user-token.model')(sequelize, Sequelize)
  // return db;