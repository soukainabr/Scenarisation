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
        throw Error('Tous les champs doivent être remplis');
    }
    if(!validator.isEmail(email)){
        throw Error("L'email n'est pas valide")
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Mot de passe pas assez fort')
    }

    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email déjà utilisé');
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
        throw Error('Tous les champs doivent être remplis');
    }
    const user = await this.findOne({email});

    if(!user){
        throw Error('Email Incorrect ');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Mot de passe Incorrect')
    }

    return user;
}

module.exports = mongoose.model('User',userSchema);