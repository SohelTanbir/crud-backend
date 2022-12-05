const mongoose = require('mongoose');

// user schema
const userSchema  = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    phone:{
        type: Number,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }
})

const User = mongoose.model('user', userSchema);
module.exports =  User