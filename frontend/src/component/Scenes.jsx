import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import SceneDetails from '../component/SceneDetails';
import SceneForm from '../component/SceneForm';
import './Projects.css';

const Scenes = () => {
  const { id } = useParams(); // ID de la capsule
  const { user } = useAuthContext();
  const [scenes, setScenes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scenesPerPage] = useState(3);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const getScenesByCapsuleId = async () => {
      try {
        const response = await axios.get(`/api/scenes/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setScenes(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
        getScenesByCapsuleId();
    }
  }, [id, user]);

  const handleAddScene = (sceneData) => {

    // Envoyer les données de la capsule à votre backend via axios.post() ou toute autre logique de gestion des capsules
    console.log('Nouvelle scene :', sceneData);

    const { title, description } = sceneData;
    axios
      .post(
        `/api/scenes/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        // Actualiser la liste des capsules après l'ajout
        navigate(1);
        setScenes((prevScenes) => [...prevScenes, result.data]);
      })
      .catch((err) => console.log(err));

    // Fermer le dialogue après avoir ajouté la capsule
    setDialogOpen(false);
  };

  // Pagination
  const indexOfLastScene = currentPage * scenesPerPage;
  const indexOfFirstScene = indexOfLastScene - scenesPerPage;
  const currentScenes = scenes.slice(indexOfFirstScene, indexOfLastScene);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
      <div className="projects">
        <br /><br /><br /><br /><br /><br />
        
        
        <h2 className="style">Scenes :</h2><br /><br />
        {/* Bouton "Créer Capsule" */}
        <button className="btn btn-danger" onClick={() => setDialogOpen(true)}>
          Créer Scene
        </button>
        <button className="btn btn-danger space-between-buttons" onClick={() => navigate(-1)}>
          Retourner aux capsules
        </button>
        {/* Dialogue pour ajouter une scene */}
        {dialogOpen && (
          <SceneForm onAddScene={handleAddScene} onClose={() => setDialogOpen(false)} />
        )}

        {currentScenes.map((scene) => (
          <SceneDetails key={scene._id} scene={scene} />
        ))}

        {/* Pagination */}
          <div className="pagination">
          {Array.from({ length: Math.ceil(scenes.length / scenesPerPage) }, (_, index) => (
            <button
              key={index}
              className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
      <br /><br /><br />
      </div>

      <br /><br /><br />
    </div>
  );
};

export default Scenes;
