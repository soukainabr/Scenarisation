const mongoose = require('mongoose');

const Schema = mongoose.Schema

const sceneSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    capsule_id: {
        type: String,
        required: true,
    }
},{timestamps :true})

module.exports = mongoose.model('Scene',sceneSchema);