
const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login', {
    currentPage: 'login', // this is specific to the movies app bc of the CSS setup
  });
});

authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register', {
    currentPage: 'register', 
  });
});

authRouter.post('/register', usersController.create);

//submits login info
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/user', 
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);
//logout
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = authRouter;