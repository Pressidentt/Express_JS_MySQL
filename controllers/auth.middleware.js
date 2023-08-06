const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(403).json({
      message: 'No token provided'
    });
  }
  try {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: 'Unauthorized'
        });
      }
      req.userId = decoded.id;
      next();
    }
    );
  }
  catch (err) {
    res.status(401).json({
      message: 'Unauthorized'
    });
  }
};
