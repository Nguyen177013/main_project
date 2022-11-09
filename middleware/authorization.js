const jwt = require('jsonwebtoken');
const User = require('../models/account');
const requireAuth = (req,res,next)=>{
    console.log(req?.cookies)
    const token = req?.cookies?.jwt;
    if(token){
        jwt.verify(token,'Hutech',(err,decoded)=>{
            if(err){
                res.redirect('/login');
            }
            else{
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

// chekc current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token);
  if (token) {
    jwt.verify(token, 'Hutech', async (err, decodedToken) => {
      if (err) {
        console.log('Token Trống');
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        // console.log(user);
        // console.log(res);
        res.locals.user = user;
        // console.log(res);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {requireAuth,checkUser};