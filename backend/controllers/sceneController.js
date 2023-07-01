const Scene = require('../models/sceneModel');
const SceneCollaborateur = require('../models/scene_collaborateurModel');
const Video = require('../models/videoModel');

const getSceneByCapsuleId = (req, res) => {
    const capsuleId = req.params.id;

    Scene.find({ capsule_id: capsuleId }).sort({ createdAt: -1 })
        .then(scenes => {
            res.json(scenes);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
};

const createSceneByCapsuleId = (req, res) => {
    const capsuleId = req.params.id;
    const { title, description } = req.body;

    const newScene = new Scene({
        title,
        description,
        capsule_id: capsuleId,
    });

    newScene
        .save()
        .then(scene => {
            res.json(scene);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
};
/*
const deleteSceneByCapsuleId = (req, res) => {
    const capsuleId = req.params.id;
    const sceneId = req.params.id2;

    Scene.findOneAndDelete({ capsule_id: capsuleId, _id: sceneId })
        .then(() => {
            res.json('La scene a été supprimée avec succès.');
        })
        .catch((err) => {
            res.status(400).json('Erreur lors de la suppression de la scene : ' + err);
        });
};*/

const deleteSceneByCapsuleId = async (req, res) => {
    try {
      const capsuleId = req.params.id;
      const sceneId = req.params.id2;
  
      // Supprimer les vidéos liées à la scène
      await Video.deleteMany({ scene_id: sceneId });
  
      // Supprimer les scènes_collaborateur liées à la scène
      await SceneCollaborateur.deleteMany({ scene_id: sceneId });
  
      // Supprimer la scène
      await Scene.findOneAndDelete({ capsule_id: capsuleId, _id: sceneId });
  
      res.json('La scène a été supprimée avec succès, ainsi que les scènes_collaborateur et vidéos correspondantes.');
    } catch (error) {
      res.status(400).json('Erreur lors de la suppression de la scène : ' + error);
    }
  };

const updateSceneByCapsuleId = (req, res) => {
    const capsuleId = req.params.id;
    const sceneId = req.params.id2;

    Scene.findOneAndUpdate({ capsule_id: capsuleId, _id: sceneId }, req.body, { new: true })
        .then((updatedScene) => {
            res.json(updatedScene);
        })
        .catch((err) => {
            res.status(400).json('Erreur lors de la mise à jour de la scene : ' + err);
        });
};

const getSceneBySceneIdAndCapsuleId = (req, res) => {
    const capsuleId = req.params.id;
    const sceneId = req.params.id2;

    Scene.findOne({ capsule_id: capsuleId, _id: sceneId })
        .then((scene) => {
            if (!scene) {
                res.status(404).json('La scene spécifiée est introuvable.');
            } else {
                res.json(scene);
            }
        })
        .catch((err) => {
            res.status(400).json('Erreur lors de la récupération de la scene : ' + err);
        });
};

module.exports = {
    getSceneByCapsuleId,
    createSceneByCapsuleId,
    deleteSceneByCapsuleId,
    updateSceneByCapsuleId,
    getSceneBySceneIdAndCapsuleId
}