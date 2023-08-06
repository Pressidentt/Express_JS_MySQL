require('dotenv').config();
const cors = require('cors');
const express = require('express');
const User = require('./models/user.model');
const UserToken = require('./models/user-token.model');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = require("./models/config.js");

User.hasOne(UserToken, {
  foreignKey: 'userId',
  as: 'userToken'
});
UserToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

sequelize.authenticate().then(() => {
  console.log('Database Connected')
}).catch((err) => {
  console.log(err)
});
sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

const userRoutes = require('./routes/user.routes');
const fileRoutes = require('./routes/file.routes')

app.use('/', userRoutes)
app.use('/file', fileRoutes)

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})