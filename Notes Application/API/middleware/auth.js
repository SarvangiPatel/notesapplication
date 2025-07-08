
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const isauthenticated = (req, res, next) => {
 const token = req.cookies.ACCESS_TOKEN;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded.userData;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = isauthenticated;
