import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import './Projects.css';
import { useNavigate } from 'react-router-dom';

const ProjectForm = ({ open, onClose, onAddProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const navigate=useNavigate()

  const handleAddProject = () => {
    // Vérifier si les champs sont valides avant d'ajouter le projet
    if (title.trim() !== '' && description.trim() !== '') {
      // Appeler la fonction de rappel onAddProject pour ajouter le projet
      console.log(image, 12);
      onAddProject({ title, description ,image });

      // Réinitialiser les champs du formulaire
      setTitle('');
      setDescription('');
      setImage('');
      setError(false);
      navigate(-1);
    }
    else {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="add-project-dialog-title">
      <DialogTitle id="add-project-dialog-title" className="text">Ajouter un projet</DialogTitle>
      {error && <div className="error">
        Titre et Description sont obligatoires
      </div>}
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Titre"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleAddProject} color="primary">
          Ajouter
        </Button>
      </DialogActions>
{error && <div className="error">{error}</div>}
    </Dialog>
  );
};

export default ProjectForm;
