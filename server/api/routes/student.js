const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');   

const StudentController = require('../controllers/student');

router.post("/studentReg", StudentController.student_signup);
console.log("student reg");

module.exports = router;