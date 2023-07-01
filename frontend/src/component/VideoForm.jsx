import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import './Projects.css';
import { useNavigate } from 'react-router-dom';

const VideoForm = ({ onAddVideo, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState('');

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

            // Appeler la fonction  avec les données de la video

            onAddVideo({ title, description, video });
            // Réinitialiser le formulaire
            setTitle(''); setVideo('');
            setDescription(''); navigate(-1);
       
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Créer une nouvelle video</DialogTitle>
           
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
                    <input
                        multiple
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
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

export default VideoForm;
