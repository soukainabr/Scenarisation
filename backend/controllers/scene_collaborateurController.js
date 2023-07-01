const Scene_Collaborateur = require('../models/scene_collaborateurModel');
const Scene = require('../models/sceneModel');

// Fonction pour créer un nouvel enregistrement Scene_Collaborateur
const createSceneCollaborateur = async (req, res) => {
  try {
    const { collaborateur_email, scene_id, user_email } = req.body;
    const newSceneCollaborateur = new Scene_Collaborateur({
      collaborateur_email,
      scene_id,
      user_email
    });
    const savedSceneCollaborateur = await newSceneCollaborateur.save();
    res.status(201).json(savedSceneCollaborateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour récupérer tous les enregistrements Scene_Collaborateur
const getAllSceneCollaborateurs = async (req, res) => {
  try {
    const sceneCollaborateurs = await Scene_Collaborateur.find();
    res.json(sceneCollaborateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour récupérer un enregistrement Scene_Collaborateur par son ID
const getSceneCollaborateurById = async (req, res) => {
  try {
    const { id } = req.params;
    const sceneCollaborateur = await Scene_Collaborateur.findById(id);
    if (!sceneCollaborateur) {
      return res.status(404).json({ message: 'Scene_Collaborateur not found' });
    }
    res.json(sceneCollaborateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour récupérer les enregistrements Scene_Collaborateur par scene_id
const getSceneCollaborateursBySceneId = async (req, res) => {
  try {
    const { scene_id } = req.params;
    const sceneCollaborateurs = await Scene_Collaborateur.find({ scene_id });
    res.json(sceneCollaborateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour récupérer les enregistrements Scene_Collaborateur par collaborateur_email
const getSceneCollaborateursByCollaborateurEmail = async (req, res) => {
  try {
    const { collaborateur_email } = req.params;
    const sceneCollaborateurs = await Scene_Collaborateur.find({ collaborateur_email });
    res.json(sceneCollaborateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour mettre à jour un enregistrement Scene_Collaborateur par son ID
const updateSceneCollaborateurById = async (req, res) => {
  try {
    const { id } = req.params;
    const { collaborateur_email, scene_id } = req.body;
    const updatedSceneCollaborateur = await Scene_Collaborateur.findByIdAndUpdate(
      id,
      { collaborateur_email, scene_id },
      { new: true }
    );
    if (!updatedSceneCollaborateur) {
      return res.status(404).json({ message: 'Scene_Collaborateur not found' });
    }
    res.json(updatedSceneCollaborateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour supprimer un enregistrement Scene_Collaborateur par son ID
const deleteSceneCollaborateurById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSceneCollaborateur = await Scene_Collaborateur.findByIdAndRemove(id);
    if (!deletedSceneCollaborateur) {
      return res.status(404).json({ message: 'Scene_Collaborateur not found' });
    }
    res.json({ message: 'Scene_Collaborateur deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour récupérer les enregistrements Scene_Collaborateur par collaborateur_email et scene_id
const getSceneCollaborateursByCollaborateurEmailAndSceneId = async (req, res) => {
  try {
    const { collaborateur_email, scene_id } = req.params;
    const sceneCollaborateurs = await Scene_Collaborateur.find({ collaborateur_email, scene_id });
    res.json(sceneCollaborateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const get = async (req, res) => {
  const { collaborateur_email } = req.params;

  try {
    // Récupérer les IDs des scènes associées au collaborateur
    const scenesCollaborateur = await Scene_Collaborateur.find({
      collaborateur_email: collaborateur_email,
    });

    // Extraire les IDs des scènes
    const sceneIds = scenesCollaborateur.map((sceneCollaborateur) => sceneCollaborateur.scene_id);

    // Récupérer toutes les scènes correspondantes aux IDs
    const scenes = await Scene.find({ _id: { $in: sceneIds } });

    res.json(scenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createSceneCollaborateur,
  getAllSceneCollaborateurs,
  getSceneCollaborateurById,
  getSceneCollaborateursBySceneId,
  getSceneCollaborateursByCollaborateurEmail,
  updateSceneCollaborateurById,
  deleteSceneCollaborateurById,
  getSceneCollaborateursByCollaborateurEmailAndSceneId,
  get
};
