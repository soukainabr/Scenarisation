const express = require('express')
const { getSceneByCapsuleId,createSceneByCapsuleId,deleteSceneByCapsuleId,updateSceneByCapsuleId,getSceneBySceneIdAndCapsuleId } =  require('../controllers/sceneController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all project routes
router.use(requireAuth);



//GET a All scenes of a capsule
router.get('/:id', getSceneByCapsuleId);

//POST a single capsule of a capsule
router.post('/:id',createSceneByCapsuleId);

//DELETE a scene By CapsuleId
router.delete('/:id/:id2',deleteSceneByCapsuleId);

//UPDATE a Capsule By CapsuleId
router.patch('/:id/:id2',updateSceneByCapsuleId);

//GET a Capsule By  CapsuleId
router.get('/:id/:id2',getSceneBySceneIdAndCapsuleId);

module.exports = router