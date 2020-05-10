const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const UserController = require('../controllers/user');

function verifyToken(req, res, next) {
    if(!req.headers.authorization){
      return res.status(401).send('Unauthorized Request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
      return res.status(401).send('Unauthorized Request');
    }
    let payload = jwt.verify(token, process.env.JWT_KEY);
    if(!payload){
      return res.status(401).send('Unauthorized Request');
    }
    req.userId = payload.subject
    next()
    }

router.post("/login", UserController.user_login);
console.log("creaming")
router.post("/registration", UserController.user_signup);
console.log("reming")
router.post("/forgot", UserController.user_forgot);
console.log("shreaming")
router.get('/display',verifyToken, UserController.user_display);
console.log("dreaming");
router.delete("/delete/:id",UserController.user_delete);
router.post("/update",UserController.user_update);

module.exports = router;
