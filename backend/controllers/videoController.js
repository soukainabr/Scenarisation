const Video = require('../models/videoModel');
const mongoose = require('mongoose');
const fs = require('fs');


// GET all videos of a scene
const getVideosBySceneId = async (req, res) => {

  const sceneId = req.params.id;
  Video.find({ scene_id: sceneId }).sort({ createdAt: -1 })
    .then(videos => {
      res.json(videos);
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
};

// POST a single video of a scene
const createVideoBySceneId = async (req, res) => {
  const sceneId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(sceneId)) {
    return res.status(404).json({ error: 'No such scene' });
  }

  const { title, description, user_email } = req.body;
  const video = req.file.path;

  try {
    const newVideo = new Video({
      title,
      description,
      video,
      scene_id:sceneId,
      user_email
    });
    const createdVideo = await newVideo.save();
    res.status(200).json(createdVideo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a video by sceneId and videoId
const deleteVideoBySceneIdAndVideoId = async (req, res) => {
  const sceneId = req.params.id;
  const videoId = req.params.id2;

  if (!mongoose.Types.ObjectId.isValid(sceneId) || !mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(404).json({ error: 'No such scene or video' });
  }

  try {
    const deletedVideo = await Video.findOneAndDelete({ _id: videoId, scene_id: sceneId });
    if (!deletedVideo) {
      return res.status(404).json({ error: 'No such scene or video' });
    }

    // Delete the video file associated with the deleted video
    fs.unlink(deletedVideo.video, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a video by sceneId and videoId
const updateVideoBySceneIdAndVideoId = async (req, res) => {
  const sceneId = req.params.id;
  const videoId = req.params.id2;

  if (!mongoose.Types.ObjectId.isValid(sceneId) || !mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(404).json({ error: 'No such scene or video' });
  }

  const { title, description, user_email } = req.body;
  let video = '';

  if (req.file) {
    video = req.file.path;
    console.log("viiiiiiiiiiiiiiiiiiiiiddddddddddeeeeeeeeeeooooooooo:", video);
  }

  try {
    const videoToUpdate = await Video.findOne({ _id: videoId, scene_id: sceneId });
    if (!videoToUpdate) {
      return res.status(404).json({ error: 'No such scene or video' });
    }

    const updatedVideo = await Video.findOneAndUpdate(
      { _id: videoId, scene_id: sceneId },
      { title, description, video, user_email },
      { new: true }
    );

    // Delete the previous video file if it has changed
    if (req.file && videoToUpdate.video !== video) {
      fs.unlink(videoToUpdate.video, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET a video by sceneId and videoId
const getVideoBySceneIdAndVideoId = async (req, res) => {
  const sceneId = req.params.id;
  const videoId = req.params.id2;

  if (!mongoose.Types.ObjectId.isValid(sceneId) || !mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(404).json({ error: 'No such scene or video' });
  }

  try {
    const video = await Video.findOne({ _id: videoId, scene_id: sceneId });
    if (!video) {
      return res.status(404).json({ error: 'No such scene or video' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getVideosBySceneId,
  createVideoBySceneId,
  deleteVideoBySceneIdAndVideoId,
  updateVideoBySceneIdAndVideoId,
  getVideoBySceneIdAndVideoId
};
