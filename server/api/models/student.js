const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    userName: { type: String, required: true, },
    rollno: {type: Number, required: true, },
    email: {type: String, required: true, },
    phno: {type: Number, required: true, },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema,'students');