import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { useAuthContext } from '../hooks/useAuthContext';
import './Projects.css';
import { fr } from 'date-fns/locale';
import moment from 'moment';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CapsuleDetails = ({ capsule }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedCapsule, setEditedCapsule] = useState(capsule);
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { id } = useParams(); // ID du capsule
  const navigate = useNavigate();

  const handleSceneClick = () => {
    // Rediriger vers la page '/capsule'
    navigate(`/scene/${capsule._id}`);
  };
  const handleClick = async () => {
    axios
      .delete(`/api/capsules/${id}/${capsule._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((result) => {
        navigate(-1);
        console.log(`/capsule/${id}`);
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
      .patch(`/api/capsules/${id}/${capsule._id}`, editedCapsule, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((result) => {
        //window.location.href = `/capsule/${id}`;
        navigate(-1);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setEditDialogOpen(false);
  };

  const handleEditClick = () => {
    setEditedCapsule(capsule);
    setEditDialogOpen(true);
  };

  const handleTitleChange = (event) => {
    setEditedCapsule((prevCapsule) => ({
      ...prevCapsule,
      title: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setEditedCapsule((prevCapsule) => ({
      ...prevCapsule,
      description: event.target.value,
    }));
  };

  return (
    <div className="project-details">
      <div>
        <div className="details-column">
          <p>
            <strong className="text">Titre:</strong> {capsule.title}
          </p>
          <p>
            <strong className="text">Description:</strong> {capsule.description}
          </p>
          <p>
            <strong className="text">Créé:</strong>{' '}
            {formatDistanceToNow(moment(capsule.createdAt).toDate(), {
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
          <br />

        </div> <button className="button" onClick={handleSceneClick}>
          <FontAwesomeIcon icon={faVideoCamera} />  Scenes
        </button>
      </div>

      <Dialog open={editDialogOpen} onClose={handleCancel} aria-labelledby="edit-capsule-dialog-title">
        <DialogTitle id="edit-capsule-dialog-title" className="text">Modifier Capsule</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={editedCapsule.title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedCapsule.description}
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

export default CapsuleDetails;
