const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const User = require("../models/user");
mongoose.set('useFindAndModify', false);

exports.user_signup = async (req, res, next) => {
  const alreadyUser = await User.findOne({email: req.body.email})

  if(alreadyUser)
    return res.status(404).json({
      msg: 'User Already Exists'
    });
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      userName: req.body.UserName,
      email: req.body.email,
      phno: req.body.phno,
      password: req.body.password
    });

    const users = await user.save();

    if(users)
      return res.status(201).json({
        msg: 'User Created',
        user: user
    });
    else
      return res.status(500).json({
        error: users
      });
};

exports.user_login = async (req, res, next) => {
  const user_lg = await User.findOne({userName: req.body.userName , password: req.body.password });

  if(user_lg){

    const token = jwt.sign(
    {
      userName: req.body.userName,
      //phno: phno
    },process.env.JWT_KEY,
     {
      expiresIn: "1h"
     }
    );
    return res.status(201).json({
      msg: 'Login Successful',
      token: token
    });
  }
  else
    return res.status(500).json({
      msg: 'User Not Found'
    });
  
};

exports.user_forgot = async (req, res, next) => {
 
  const user_fgt = await User.findOne({userName: req.body.userName , phno: req.body.phno });
  
  if(user_fgt){
   User.findOneAndUpdate({userName: req.body.userName}, {$set: {password: req.body.password}}, function (err,doc) {
     if(err){
       console.log("update password error");
     }else {
       console.log("update password success");
       console.log(doc);
     }
   });
  return res.status(200).json({ msg: "user_forgot works"})
  }
  else
  return res.status(500).json({ msg: "forgot failed "}) 
};

exports.user_display = async (req, res, next) => {
  
  console.log('get request for all users');
    const user_disp = await User.find({});
    
      if(!user_disp){
        return res.status(404).json({
            msg: "Cannot display users"
        });
      }else{
        return res.status(201).json({
            msg: "Displaying users",
            user_disp: user_disp
        });
      }
};

exports.user_delete = async (req, res, next) => {

  const id = req.params.id;
  const user_del = await User.deleteOne({_id: req.params.id});
  if(user_del){
             console.log("deleted data ");
             return res.status(201).json({ msg: " delete works "});
             }else 
             return res.status(404).json({ msg: "user_delete failed" });
};

exports.user_update = async (req, res, next) => {

const user_upt = await User.findOne({id:req.body.id });
  
  if(user_upt){
   User.updateMany({id: req.body.id}, {$set: {userName: req.body.UserName,
    email: req.body.email,
    phno: req.body.phno,
    password: req.body.password }}, function (err,doc) {
     if(err){
       console.log("update document error");
     }else {
       console.log("update document success");
     }
   });
  return res.status(200).json({ msg: "user_update works"})
  }
  else
  return res.status(500).json({ msg: "user_update failed "}) 

};