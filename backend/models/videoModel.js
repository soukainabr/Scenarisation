const mongoose = require('mongoose');

const Schema = mongoose.Schema

const videoSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    video:{
        type: String,
    },
    scene_id: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    }
},{timestamps :true})


module.exports = mongoose.model('Video',videoSchema);