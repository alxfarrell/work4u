const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'no authentication token, access denied' });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'work4u-secret-key-463f761f');
    
    // find user by id
    const user = await User.findOne({ _id: decoded.id });
    
    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    // add user to request object
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'token is invalid' });
  }
};

module.exports = auth; 