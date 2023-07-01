import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import './Projects.css';
import CollaborateurForm from './CollaborateurForm';
import CollaborateurDetails from './CollaborateurDetails';
import { useNavigate } from 'react-router-dom';

const Collaborateurs = () => {
  const { id } = useParams(); // ID du projet
  const { user } = useAuthContext();
  const [collaborateurs, setCollaborateurs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [collaborateursPerPage] = useState(3);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCollaborateurBySceneId = async () => {
      try {
        const response = await axios.get(`/api/scene_collaborateur/scene/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCollaborateurs(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      getCollaborateurBySceneId();
    }
  }, [id, user]);

  const handleAddCollaborateur = (collaborateurData) => {
    console.log('Nouvelle collaborateur :', collaborateurData);

    const { collaborateur_email } = collaborateurData;
    const id2 = id;

    axios
      .post(
        '/api/scene_collaborateur/',
        { collaborateur_email, scene_id: id2,user_email:user.email },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        navigate(1);

        setCollaborateurs((prevCollab) => [...prevCollab, result.data]);
      })
      .catch((err) => console.log(err));

    setDialogOpen(false);
  };

  const indexOfLastCollab = currentPage * collaborateursPerPage;
  const indexOfFirstCollab = indexOfLastCollab - collaborateursPerPage;
  const currentCollab = collaborateurs.slice(indexOfFirstCollab, indexOfLastCollab);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
      <div className="projects">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2 className="style">Collaborateur :</h2><br /><br />

        <button className="btn btn-danger" onClick={() => setDialogOpen(true)}>
          Ajouter Collaborateur
        </button>  
        <button className="btn btn-danger space-between-buttons" onClick={() => navigate(-1)}>
          Retourner aux scenes
        </button>

        {dialogOpen && (
          <CollaborateurForm onAddCollaborateur={handleAddCollaborateur} onClose={() => setDialogOpen(false)} />
        )}

        {currentCollab.map((collaborateur) => (
          <CollaborateurDetails key={collaborateur._id} collaborateur={collaborateur} />
        ))}

        <div className="pagination">
          {Array.from({ length: Math.ceil(collaborateurs.length / collaborateursPerPage) }, (_, index) => (
            <button
              key={index}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <br />
        <br />
        <br />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Collaborateurs;
