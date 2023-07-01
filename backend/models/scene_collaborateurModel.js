const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Scene_Collaborateur_Schema = new Schema({
    collaborateur_email: {
        type: String,
        required: true,
    },
    scene_id: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    }
    
})

module.exports = mongoose.model('SceneCollaborateur',Scene_Collaborateur_Schema);