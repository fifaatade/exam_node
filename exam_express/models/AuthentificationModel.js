const mongoose = require('mongoose')

const userData = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type: String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require: true
    },
    password:{
        type:String,
        require:true
    },
    code:{
        type:Number,
        require:true
    }
})

module.exports = mongoose.model('users', userData)