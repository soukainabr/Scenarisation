const express = require('express')
const { get,
    getSceneCollaborateursByCollaborateurEmailAndSceneId,
    getAllSceneCollaborateurs,
    getSceneCollaborateurById,
    getSceneCollaborateursByCollaborateurEmail,
    getSceneCollaborateursBySceneId,
    createSceneCollaborateur,
    deleteSceneCollaborateurById,
    updateSceneCollaborateurById} = require('../controllers/scene_collaborateurController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all routes
router.use(requireAuth);


// Route pour créer un nouvel enregistrement Scene_Collaborateur
router.post('/', createSceneCollaborateur);

// Route pour récupérer tous les enregistrements Scene_Collaborateur
router.get('/', getAllSceneCollaborateurs);

// Route pour récupérer un enregistrement Scene_Collaborateur par son ID
router.get('/:id', getSceneCollaborateurById);

// Route pour récupérer les enregistrements Scene_Collaborateur par scene_id
router.get('/scene/:scene_id', getSceneCollaborateursBySceneId);

// Route pour récupérer les enregistrements Scene_Collaborateur par collaborateur_email
//router.get('/collaborateur/:collaborateur_email', getSceneCollaborateursByCollaborateurEmail);

// Route pour mettre à jour un enregistrement Scene_Collaborateur par son ID
router.put('/:id', updateSceneCollaborateurById);

// Route pour supprimer un enregistrement Scene_Collaborateur par son ID
router.delete('/:id', deleteSceneCollaborateurById);

// Route pour récupérer les enregistrements Scene_Collaborateur par collaborateur_email et scene_id
router.get('/collaborateur/:collaborateur_email/scene/:scene_id', getSceneCollaborateursByCollaborateurEmailAndSceneId);


router.get('/collaborateur/:collaborateur_email', get)
  
module.exports = router