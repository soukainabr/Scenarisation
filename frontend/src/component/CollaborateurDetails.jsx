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

const CollaborateurDetails = ({ collaborateur }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedCollaborateur, setEditedCollaborateur] = useState(collaborateur);
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    axios
      .delete(`/api/scene_collaborateur/${collaborateur._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        navigate(-1);
        console.log(`id =${id}`);
        console.log(`collab id =${collaborateur._id}`);
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
      .put(`/api/scene_collaborateur/${collaborateur._id}`, editedCollaborateur, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        //navigate(`/scene_collaborateur/${collaborateur._id}`);
        navigate(-1);

        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setEditDialogOpen(false);
  };

  const handleEditClick = () => {
    setEditedCollaborateur(collaborateur);
    setEditDialogOpen(true);
  };

  const handleEmailChange = (event) => {
    setEditedCollaborateur((prevCollab) => ({
      ...prevCollab,
      collaborateur_email: event.target.value,
    }));
  };

  return (
    <div className="project-details">
      <div>
        <div className="details-column">
          <p>
            <strong className="text">Email:</strong> {collaborateur.collaborateur_email}
          </p>
          <p>
            <strong className="text">Ajouté par:</strong> {collaborateur.user_email}
          </p>
          <p>
            <strong className="text">Créé:</strong>{' '}
            {formatDistanceToNow(moment(collaborateur.createdAt).toDate(), {
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
        </div>
      </div>

      <Dialog open={editDialogOpen} onClose={handleCancel} aria-labelledby="edit-collaborateur-dialog-title">
        <DialogTitle id="edit-collaborateur-dialog-title">Edit Collaborateur </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            value={editedCollaborateur.collaborateur_email}
            onChange={handleEmailChange}
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

export default CollaborateurDetails;
