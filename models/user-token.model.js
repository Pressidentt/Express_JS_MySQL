const { Sequelize } = require("sequelize");
const seq = require("./config.js");

const UserToken = seq.define("user-tokens", {
  token: {
    type: Sequelize.STRING,
    allowNull: false
  },
});
// UserToken.associate = function (models) {
//   UserToken.belongsTo(models.user, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE'
//   })
// }

module.exports = UserToken;