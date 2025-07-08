const userroutes=require('express').Router();
const usercontroller = require('../controller/user.controller');

userroutes.get('/test', usercontroller.test);
userroutes.post('/register', usercontroller.register);
userroutes.post('/signin', usercontroller.signin);


module.exports = userroutes;

