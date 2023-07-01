import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import moment from 'moment';
import { fr } from 'date-fns/locale';
import { faVideoCamera,faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import './Projects.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const ProjectDetails = ({ project }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [editedImage, setEditedImage] = useState(null);
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleCapsuleClick = () => {
    // Rediriger vers la page '/capsule'
    navigate(`/capsule/${project._id}`);
  };
  const handleClick = async () => {
    axios
      .delete("/api/projects/" + project._id, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((result) => {
        window.location.reload()
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const handleSave = () => {
    if (!user) {
      setError('You must be logged in')
      return
    }

    const formData = new FormData();
    formData.append('title', editedProject.title);
    formData.append('description', editedProject.description);
    if (editedImage) {
      formData.append('image', editedImage);
    }
    formData.append('user_id',editedProject.user_id);
    console.log("formdata", editedProject)

    axios
      .patch("/api/projects/" + editedProject._id,formData,  {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((result) => {
        console.log(result);
        window.location.reload()
        setEditDialogOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setEditDialogOpen(false);
  };

  const handleEditClick = () => {
    setEditedProject(project);
    setEditDialogOpen(true);
  };

  const handleTitleChange = (event) => {
    setEditedProject((prevProject) => ({
      ...prevProject,
      title: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setEditedProject((prevProject) => ({
      ...prevProject,
      description: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    setEditedImage(event.target.files[0]);
  };

  return (
    <div className="project-details">
      
      <div className="d-inline-block">
        <img className="project-image" src={`/${project?.image}`} alt="" />
      </div>
      <div className="d-inline-block">
        <br />
        <div className="details-column">
        
          <p>
            <strong className="text">Titre:</strong> {project.title}
          </p>
          <p>
            <strong className="text">Description:</strong> {project.description}
          </p>
          <p>
            <strong className="text">Créé:</strong>{' '}
            {formatDistanceToNow(moment(project.createdAt).toDate(), {
              locale: fr,
              addSuffix: true,
            })}
          </p>
        </div>
 
        <button className="button" onClick={handleCapsuleClick}>
              <FontAwesomeIcon icon={faVideoCamera} />  Capsules
            </button>
        <div className="details-column">

          <div className="icons-container">
            <span className="d-inline-block mr-2" onClick={handleClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span className="d-inline-block" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </span>
          </div>
         
        </div>
      </div>

      <Dialog open={editDialogOpen} onClose={handleCancel} aria-labelledby="edit-project-dialog-title">
        <DialogTitle id="edit-project-dialog-title" className="text">Modifier le projet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titre"
            type="text"
            fullWidth
            value={editedProject.title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedProject.description}
            onChange={handleDescriptionChange}
          />
          <input
            multiple
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSave} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
        {error && <div className="error">{error}</div>}
      </Dialog>
    </div>
  );
};

export default ProjectDetails;
