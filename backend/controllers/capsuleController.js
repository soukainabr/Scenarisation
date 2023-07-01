const Capsule = require('../models/capsuleModel');
const Scene = require('../models/sceneModel');
const getCapsuleByProjectId = (req, res) => {
  const projectId = req.params.id;

  Capsule.find({ project_id: projectId }).sort({ createdAt: -1 })
    .then(capsules => {
      res.json(capsules);
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
};

const createCapsuleByProjectId = (req, res) => {
  const projectId = req.params.id;
  const { title, description } = req.body;

  const newCapsule = new Capsule({
    title,
    description,
    project_id: projectId,
  });

  newCapsule
    .save()
    .then(capsule => {
      res.json(capsule);
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
};

/*const deleteCapsuleByProjectId = async (req, res) => {
  try {
    const projectId = req.params.id;
    const capsuleId = req.params.id2;

    // Supprimer les scènes liées à la capsule
    await Scene.deleteMany({ capsule_id: capsuleId });

    // Supprimer la capsule
    await Capsule.findOneAndDelete({ project_id: projectId, _id: capsuleId });


    res.json('La capsule a été supprimée avec succès et les scènes associées ont été supprimées.');
  } catch (error) {
    res.status(400).json('Erreur lors de la suppression de la capsule : ' + error);
  }
};*/

const SceneCollaborateur = require('../models/scene_collaborateurModel');
const Video = require('../models/videoModel');

const deleteCapsuleByProjectId = async (req, res) => {
  try {
    const projectId = req.params.id;
    const capsuleId = req.params.id2;

    // Trouver les scènes liées à la capsule
    const scenes = await Scene.find({ capsule_id: capsuleId });

    // Supprimer les vidéos et les scènes_collaborateur liées à chaque scène
    for (const scene of scenes) {
      const sceneId = scene._id;

      // Supprimer les vidéos liées à la scène
      await Video.deleteMany({ scene_id: sceneId });

      // Supprimer les scènes_collaborateur liées à la scène
      await SceneCollaborateur.deleteMany({ scene_id: sceneId });
    }

    // Supprimer les scènes de la capsule
    await Scene.deleteMany({ capsule_id: capsuleId });

    // Supprimer la capsule
    await Capsule.findOneAndDelete({ project_id: projectId, _id: capsuleId });

    res.json('La capsule a été supprimée avec succès et les scènes associées, ainsi que les scènes_collaborateur et vidéos correspondantes, ont été supprimées.');
  } catch (error) {
    res.status(400).json('Erreur lors de la suppression de la capsule : ' + error);
  }
};




const updateCapsuleByProjectId = (req, res) => {
  const projectId = req.params.id;
  const capsuleId = req.params.id2;

  Capsule.findOneAndUpdate({ project_id: projectId, _id: capsuleId }, req.body, { new: true })
    .then((updatedCapsule) => {
      res.json(updatedCapsule);
    })
    .catch((err) => {
      res.status(400).json('Erreur lors de la mise à jour de la capsule : ' + err);
    });
};

const getCapsuleByCapsuleIdAndProjectId = (req, res) => {
  const projectId = req.params.id;
  const capsuleId = req.params.id2;

  Capsule.findOne({ project_id: projectId, _id: capsuleId })
    .then((capsule) => {
      if (!capsule) {
        res.status(404).json('La capsule spécifiée est introuvable.');
      } else {
        res.json(capsule);
      }
    })
    .catch((err) => {
      res.status(400).json('Erreur lors de la récupération de la capsule : ' + err);
    });
};

module.exports = {
  getCapsuleByProjectId,
  createCapsuleByProjectId,
  deleteCapsuleByProjectId,
  updateCapsuleByProjectId,
  getCapsuleByCapsuleIdAndProjectId
}