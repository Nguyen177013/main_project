const jwt = require('jsonwebtoken');
const User = require('../models/account');
const requireAuth = (req, res, next) => {
  const token = req?.cookies?.user;
  if (token) {
    jwt.verify(token, 'Hutech', (err, decoded) => {
      if (err) {
        console.log('this is err: ',err);
        res.json({login:2});
      }
      else {
        next();
      }
    })
  }
  else {
    res.json({login:1});
  }
}

// chekc current user
const checkUser = (req, res, next) => {
  const token = req.cookies.user;
  if (token) {
    jwt.verify(token, 'Hutech', async (err, decodedToken) => {
      if (err) {
        console.log('Token Trống');
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };