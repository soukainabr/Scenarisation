const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    
})

// static signup method
userSchema.statics.signup = async function(email,password,firstName,lastName) {

    // Validation
    if(!email || !password || !firstName || !lastName) {
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email already in use');
    }

    //salt : random string characters tha gets added to the user pwd before it gets hashed
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({email , password : hash , firstName,lastName});

    return user;
}

// static login method

userSchema.statics.login = async function(email,password){
    
    // Validation
    if(!email || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({email});

    if(!user){
        throw Error('Incorrect Email');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect password')
    }

    return user;
}

module.exports = mongoose.model('User',userSchema);