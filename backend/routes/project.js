const express = require('express')
const { createProject,getProject,getProjects,deleteProject,updateProject } =  require('../controllers/projectController')
const multer = require('multer');
const upload = multer({dest:'uploads/'});

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all project routes
router.use(requireAuth);

//GET all projects
router.get('/', getProjects);

//GET a single projects
router.get('/:id', getProject);

//POST a single projects
router.post('/', upload.single('image'),createProject);

//DELETE a single projects
router.delete('/:id',deleteProject);

//UPDATE a single projects
router.patch('/:id',upload.single('image') ,updateProject);

module.exports = router