const { Sequelize } = require("sequelize");
const seq = require("./config.js");
const User = seq.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
});
// make one to one relationship with user-token

module.exports = User;