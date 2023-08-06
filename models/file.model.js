const { Sequelize } = require("sequelize");
const seq = require("./config.js");

const File = seq.define("files", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  extension: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  mimetype: {
    type: Sequelize.STRING,
    allowNull: true
  },
  filesize: {
    type: Sequelize.INTEGER,
  },
  path: {
    type: Sequelize.STRING,
  },
});
module.exports = File;