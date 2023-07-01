import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { useAuthContext } from '../hooks/useAuthContext';
import './Projects.css';
import { fr } from 'date-fns/locale';
import moment from 'moment';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VideoDetails = ({ video }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedVideo, setEditedVideo] = useState(video);
  const [editedVid, setEditedVid] = useState(null);
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { id } = useParams(); // ID du projet
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await axios.delete(`/api/videos/${id}/${video._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }
    const formData = new FormData();
    formData.append('title', editedVideo.title);
    formData.append('description', editedVideo.description);
    if (editedVid) {
      formData.append('video', editedVid);
    }
    formData.append('user_id',editedVideo.user_id);
    console.log("formdata", editedVideo)


    axios
      .patch(`/api/videos/${id}/${video._id}`, formData, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((result) => {
        navigate(-1);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setEditDialogOpen(false);
  };

  const handleEditClick = () => {
    setEditedVideo(video);
    setEditDialogOpen(true);
  };

  const handleTitleChange = (event) => {
    setEditedVideo((prevVideo) => ({
      ...prevVideo,
      title: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setEditedVideo((prevVideo) => ({
      ...prevVideo,
      description: event.target.value,
    }));
  };
  const handleVidChange = (event) => {
    setEditedVid(event.target.files[0]);
  };


  return (
    <div className="project-details">
      <div>
        <div className="details-column">
          <p>
            <strong className="text">Titre:</strong> {video.title}
          </p>
          <p>
            <strong className="text">Description:</strong> {video.description}
          </p>
          <p>
            <strong className="text">Ajouté par :</strong> {video.user_email}
          </p>
          <p>
            <strong className="text">Créé:</strong>{' '}
            {formatDistanceToNow(moment(video.createdAt).toDate(), {
              locale: fr,
              addSuffix: true,
            })}
          </p>
          <br />
          <video className='video' src={`/${video?.video}`} controls></video>
        </div>

        <div className="icons-container">
          <span className="d-inline-block mr-2" onClick={handleClick}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <span className="d-inline-block" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </div>
        <br /><br />
      </div>

      <Dialog open={editDialogOpen} onClose={handleCancel} aria-labelledby="edit-capsule-dialog-title">
        <DialogTitle id="edit-capsule-dialog-title" className="text">Modifier Video</DialogTitle>
        {error && <div className="error">Titre et Description et video sont obligatoires</div>}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={editedVideo.title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedVideo.description}
            onChange={handleDescriptionChange}
          />
          <input
            multiple
            type="file"
            accept="video/*"
            onChange={handleVidChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
        {error && <div className="error">{error}</div>}
      </Dialog>
    </div>
  );
};

export default VideoDetails;
