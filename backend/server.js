require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const capsuleRoutes = require('./routes/capsule');
const sceneRoutes = require('./routes/scene');
const scene_collaborateur_Routes = require('./routes/scene_collaborateur');
const videoRoutes = require('./routes/video');

//express app
const app = express()

//middleware
app.use(cors())//Com
app.use(express.json())
app.use('/uploads',express.static('uploads'));//Image
app.use('/uploads/media', express.static('uploads/media'));//Video




app.use((req,res,next) =>{
    console.log(req.path,req.method);
    next();
})


//routes
app.use('/api/projects',projectRoutes);
app.use('/api/user',userRoutes);
app.use('/api/capsules',capsuleRoutes);
app.use('/api/scenes',sceneRoutes);
app.use('/api/scene_collaborateur',scene_collaborateur_Routes);
app.use('/api/videos',videoRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () =>{
            console.log('connected to db & listening on port',process.env.PORT)
        })
    })
    .catch((error) =>{
            console.log(err);
    })
