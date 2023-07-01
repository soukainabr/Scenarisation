import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash, faEdit, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { useAuthContext } from '../hooks/useAuthContext';
import './Projects.css';
import { fr } from 'date-fns/locale';
import moment from 'moment';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SceneDetails = ({ scene }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedScene, setEditedScene] = useState(scene);
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { id } = useParams(); // ID du projet
  const navigate = useNavigate();

  const handleCollabClick = () => {
    // Rediriger vers la page '/capsule'
    navigate(`/scene_collaborateur/${scene._id}`);
  };
  const handleVideoClick = () => {
    // Rediriger vers la page '/capsule'
    navigate(`/video/${scene._id}`);
  };
  const handleClick = async () => {
    axios
      .delete(`/api/scenes/${id}/${scene._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((result) => {
        // window.location.href = `/scene/${id}`;
        navigate(-1);

        console.log(`/scene/${id}`);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const handleSave = () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }
    axios
      .patch(`/api/scenes/${id}/${scene._id}`, editedScene, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((result) => {
        //window.location.href = `/scene/${id}`;
        navigate(-1);

        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setEditDialogOpen(false);
  };

  const handleEditClick = () => {
    setEditedScene(scene);
    setEditDialogOpen(true);
  };

  const handleTitleChange = (event) => {
    setEditedScene((prevScene) => ({
      ...prevScene,
      title: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setEditedScene((prevScene) => ({
      ...prevScene,
      description: event.target.value,
    }));
  };

  return (
    <div className="project-details">
      <div>
        <div className="details-column">
          <p>
            <strong className="text">Titre:</strong> {scene.title}
          </p>
          <p>
            <strong className="text">Description:</strong> {scene.description}
          </p>
          <p>
            <strong className="text">Créé:</strong>{' '}
            {formatDistanceToNow(moment(scene.createdAt).toDate(), {
              locale: fr,
              addSuffix: true,
            })}
          </p>

        </div>

        <div className="icons-container">
          <span className="d-inline-block mr-2" onClick={handleClick}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <span className="d-inline-block" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} />
          </span>

        </div><br /><br />
        <button className="q" onClick={handleVideoClick}>
          <FontAwesomeIcon icon={faFileVideo} /> Videos
        </button>
        <button className="b" onClick={handleCollabClick}>
          <FontAwesomeIcon icon={faUser} /> Collaborateurs
        </button>
      </div>

      <Dialog open={editDialogOpen} onClose={handleCancel} aria-labelledby="edit-capsule-dialog-title">
        <DialogTitle id="edit-capsule-dialog-title">Edit Scene</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={editedScene.title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedScene.description}
            onChange={handleDescriptionChange}
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

export default SceneDetails;
