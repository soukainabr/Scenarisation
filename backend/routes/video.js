const express = require('express')
const {getVideosBySceneId,createVideoBySceneId,deleteVideoBySceneIdAndVideoId,updateVideoBySceneIdAndVideoId,getVideoBySceneIdAndVideoId} =  require('../controllers/videoController')

const requireAuth = require('../middleware/requireAuth')


const multer = require('multer');
const upload = multer({dest:'uploads/media/'});

const router = express.Router();

//require auth for all project routes
router.use(requireAuth);



//GET a All videos of a scene
router.get('/:id', getVideosBySceneId);

//POST a single video of a scene
router.post('/:id', upload.single('video'),createVideoBySceneId);

//DELETE a video By sceneId and videoId
router.delete('/:id/:id2',deleteVideoBySceneIdAndVideoId);

//UPDATE a video By sceneId and videoId
router.patch('/:id/:id2' ,upload.single('video'),updateVideoBySceneIdAndVideoId);

//GET a video By sceneId and videoId
router.get('/:id/:id2',getVideoBySceneIdAndVideoId);

module.exports = router