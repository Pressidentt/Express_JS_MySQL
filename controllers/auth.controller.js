const User = require('../models/user.model');
const UserToken = require('../models/user-token.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signTokens(id) {
  const access_token = jwt.sign({
    id: id
  }, process.env.SECRET, {
    expiresIn: 600
  });
  const refresh_token = jwt.sign({
    id: id
  }, process.env.SECRET, {
    expiresIn: 86400
  });
  const userToken = await UserToken.findOne({
    where: {
      userId: id
    }
  })
  if (userToken) await userToken.destroy();
  await new UserToken({
    token: refresh_token,
    userId: id
  }).save();

  return {
    access_token,
    refresh_token
  }
}

async function verifyRefreshToken(refresh_token) {
  try {
    const body = await jwt.verify(refresh_token, process.env.SECRET)
    return body
  }
  catch (err) {
    console.log(err);
    return null
  };
}


exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (user) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = {
      email: req.body.email,
      password: hash
    }
    const createdUser = await User.create(newUser);
    return res.status(201).json({
      message: 'User created successfully',
      user: createdUser
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist'
      })
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid Password'
      })
    }
    const {
      access_token,
      refresh_token
    } = await signTokens(user.id);
    return res.status(200).json({
      message: 'User logged in successfully',
      token: access_token,
      refreshToken: refresh_token
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
exports.new_token = async (req, res) => {
  const authHeader = req.headers['authorization-refresh'];
  const refreshToken = authHeader && authHeader.split(' ')[1];
  const token = await verifyRefreshToken(refreshToken);

  const newAccessToken = jwt.sign({
    id: token.id
  }, process.env.SECRET, {
    expiresIn: 600
  });
  return res.status(200).json({
    message: 'New access token generated',
    token: newAccessToken
  })
}
exports.logout = async (req, res) => {
  const authHeader = req.headers['authorization-refresh'];
  const refreshToken = authHeader && authHeader.split(' ')[1];
  const token = await verifyRefreshToken(refreshToken);
  UserToken.destroy({
    where: {
      userId: token.id
    }
  });
  return res.status(200).json({
    message: 'User logged out successfully'
  })
}
