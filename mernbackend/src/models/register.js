const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({//userSchema:  First word letter small and second word letter Capital
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    }
})

const Register = new mongoose.model("Register",userSchema)// Register: First word letter Capital

module.exports = Register;