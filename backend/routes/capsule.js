const express = require('express')
const { getCapsuleByCapsuleIdAndProjectId,deleteCapsuleByProjectId,updateCapsuleByProjectId,createCapsuleByProjectId,getCapsuleByProjectId } =  require('../controllers/capsuleController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all project routes
router.use(requireAuth);



//GET a All capsules of a project
router.get('/:id', getCapsuleByProjectId);

//POST a single capsule of a project
router.post('/:id',createCapsuleByProjectId);

//DELETE a Capsule By ProjectId
router.delete('/:id/:id2',deleteCapsuleByProjectId);

//UPDATE a Capsule By ProjectId
router.patch('/:id/:id2',updateCapsuleByProjectId);

//GET a Capsule By ProjectId and CapsuleId
router.get('/:id/:id2',getCapsuleByCapsuleIdAndProjectId);

module.exports = router