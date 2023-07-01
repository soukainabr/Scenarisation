const mongoose = require('mongoose');

const Schema = mongoose.Schema

const projectSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    image:{
        type: String,
    },
    user_id: {
        type: String,
        required: true,
    }
},{timestamps :true})


module.exports = mongoose.model('Project',projectSchema);