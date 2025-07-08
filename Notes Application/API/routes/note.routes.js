const express = require('express');
const notecontroller = require('../controller/note.controller');
const isauthenticated = require('../middleware/auth');

const noterouter = express.Router();


noterouter.get('/test', notecontroller.test);

noterouter.post('/create', isauthenticated, notecontroller.create);
noterouter.get('/getall', isauthenticated, notecontroller.GETALL)
noterouter.put('/update/:id', isauthenticated, notecontroller.update);
noterouter.delete('/delete/:id', isauthenticated, notecontroller.delete);
noterouter.get('/get/:id', isauthenticated, notecontroller.getOne);




module.exports = noterouter;





