import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import './Projects.css';
import { useNavigate } from 'react-router-dom';

const SceneForm = ({ onAddScene, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Appeler la fonction onAddCapsule avec les données de la capsule
    onAddScene({ title, description });
    

    // Réinitialiser le formulaire
    setTitle('');
    setDescription('');navigate(-1);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle className="text">Créer une nouvelle scene</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />

          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Ajouter
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary">
              Annuler
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SceneForm;
