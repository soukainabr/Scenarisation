import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import './Projects.css';

const CollaborateurForm = ({ onAddCollaborateur, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCollaborateur({ collaborateur_email: email });
    setEmail('');
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Ajouter un Collaborateur</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
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

export default CollaborateurForm;
