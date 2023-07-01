const Project = require('../models/projectModel')
const mongoose = require('mongoose');
const fs = require('fs');

//GET all projects
const getProjects = async (req,res) => {
    const user_id = req.user._id
    const projects = await Project.find({user_id}).sort({createdAt:-1});
    res.status(200).json(projects);
}

//GET a single project
const getProject = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such project'})
    }
    const project = await Project.findById(id);
    if(!project) {
        return res.status(404).json({error:'No such project'})
    }
    res.status(200).json(project);
}

//POST a single projects
const createProject = async (req,res) =>{

    const user_id = req.user._id

    const {title,description} = req.body;
    const image = req.file.path;
    console.log(req.file,req.body,16);
    //add doc to db
    try{
        const project = await Project.create({title,description,image,user_id})
        res.status(200).json(project);
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//DELETE a single projects
/*const deleteProject = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such project'})
    }

    const project = await Project.findOneAndDelete({_id: id});
    if(!project) {
        return res.status(400).json({error:'No such project'})
    }
    // Supprimer l'image associée
    fs.unlink(project.image, (err) => {
        if (err) {
          console.error(err);
        }
      });
  
    
    res.status(200).json(project);
    
}*/

/*const Capsule = require('../models/capsuleModel');
const Scene = require('../models/sceneModel');

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Supprimer le projet
    const deletedProject = await Project.findByIdAndRemove(id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Trouver les capsules liées au projet
    const deletedCapsules = await Capsule.find({ project_id: id });

    for (const capsule of deletedCapsules) {
      const capsuleId = capsule._id;

      // Supprimer les scènes liées à la capsule
      await Scene.deleteMany({ capsule_id: capsuleId });
    }

    // Supprimer les capsules liées au projet
    await Capsule.deleteMany({ project_id: id });

    res.json({ message: 'Project, capsules, and scenes deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/
  

//UPDATE a single projects
/*const updateProject = async (req,res) =>{
  console.log('entreeeeeeee')
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"+req)
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such project'})
    }
    const title= req.body.title;
    const description = req.body.description;
    const user_id = req.body.user_id ;
    const image = req.file.path;

    console('imaaage Baaaack',image);
    const proj = await Project.findById({_id:id});
    const project = await Project.findOneAndUpdate({_id: id},{
        title,description,image,user_id
    });
    fs.unlink(proj.image, (err) => {
        if (err) {
          console.error(err);
        }
      });
  
    if(!project) {
        return res.status(400).json({error:'No such project'})
    }
        
    res.status(200).json(project);
}*/

const Capsule = require('../models/capsuleModel');
const Scene = require('../models/sceneModel');
const SceneCollaborateur = require('../models/scene_collaborateurModel');
const Video = require('../models/videoModel');

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Supprimer le projet
    const deletedProject = await Project.findByIdAndRemove(id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Trouver les capsules liées au projet
    const deletedCapsules = await Capsule.find({ project_id: id });

    for (const capsule of deletedCapsules) {
      const capsuleId = capsule._id;

      // Trouver les scènes liées à la capsule
      const deletedScenes = await Scene.find({ capsule_id: capsuleId });

      for (const scene of deletedScenes) {
        const sceneId = scene._id;

        // Supprimer les vidéos liées à la scène
        await Video.deleteMany({ scene_id: sceneId });

        // Supprimer les scènes_collaborateur liées à la scène
        await SceneCollaborateur.deleteMany({ scene_id: sceneId });
      }

      // Supprimer les scènes liées à la capsule
      await Scene.deleteMany({ capsule_id: capsuleId });

      // Supprimer les scènes_collaborateur liées à la capsule
      await SceneCollaborateur.deleteMany({ capsule_id: capsuleId });
    }

    // Supprimer les capsules liées au projet
    await Capsule.deleteMany({ project_id: id });

    res.json({ message: 'Project, capsules, scenes, scene_collaborateur, and videos deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such project' });
    }

    const { title, description, user_id } = req.body;

    let image = '';
    if (req.file) {
      image = req.file.path;
    }

    const proj = await Project.findById(id);
    if (!proj) {
      return res.status(404).json({ error: 'No such project' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, image, user_id },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(400).json({ error: 'No such project' });
    }

    // Delete the previous image if it has changed
    if (req.file && proj.image !== image) {
      fs.unlink(proj.image, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createProject,
    getProject,
    getProjects,
    deleteProject,
    updateProject
}