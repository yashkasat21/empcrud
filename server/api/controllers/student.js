const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");

exports.student_signup = async (req, res, next) => {
    const alreadyStudent = await Student.findOne({email: req.body.email})
  
    if(alreadyStudent)
      return res.status(404).json({
        msg: 'Student Already Exists'
      });
      const student_sgup = new Student({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.UserName,
        rollno: req.body.rollno,
        email: req.body.email,
        phno: req.body.phno,
        password: req.body.password
      });
  
      const students = await student_sgup.save();
  
      if(students)
        return res.status(201).json({
          msg: 'Student Added',
          student_sgup: student_sgup
      });
      else
        return res.status(500).json({
          error: students
        });
  };
  