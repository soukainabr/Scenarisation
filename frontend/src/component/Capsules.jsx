import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import CapsuleDetails from '../component/CapsuleDetails';
import CapsuleForm from '../component/CapsuleForm';
import './Projects.css';

const Capsules = () => {
  const { id } = useParams(); // ID du projet
  const { user } = useAuthContext();
  const [capsules, setCapsules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [capsulesPerPage] = useState(3);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const getCapsulesByProjectId = async () => {
      try {
        const response = await axios.get(`/api/capsules/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCapsules(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      getCapsulesByProjectId();
    }
  }, [id, user]);

  const handleAddCapsule = (capsuleData) => {

    // Envoyer les données de la capsule à votre backend via axios.post() ou toute autre logique de gestion des capsules
    console.log('Nouvelle capsule :', capsuleData);

    const { title, description } = capsuleData;

    axios
      .post(
        `/api/capsules/${id}`,
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
        //window.location.reload()
        navigate(1);

        setCapsules((prevCapsules) => [...prevCapsules, result.data]);
      })
      .catch((err) => console.log(err));

    // Fermer le dialogue après avoir ajouté la capsule
    setDialogOpen(false);
  };

  // Pagination
  const indexOfLastCapsule = currentPage * capsulesPerPage;
  const indexOfFirstCapsule = indexOfLastCapsule - capsulesPerPage;
  const currentCapsules = capsules.slice(indexOfFirstCapsule, indexOfLastCapsule);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
      <div className="projects">
        <br /><br /><br /><br /><br /><br />
        
        
        <h2 className="style">Capsules :</h2><br /><br />
        {/* Bouton "Créer Capsule" */}
        <button className="btn btn-danger" onClick={() => setDialogOpen(true)}>
          Créer Capsule
        </button>
        <button className="btn btn-danger space-between-buttons" onClick={() => navigate(`/projects`)}>
        Retourner aux projets
        </button>
        {/* Dialogue pour ajouter une capsule */}
        {dialogOpen && (
          <CapsuleForm onAddCapsule={handleAddCapsule} onClose={() => setDialogOpen(false)} />
        )}

        {currentCapsules.map((capsule) => (
          <CapsuleDetails key={capsule._id} capsule={capsule} />
        ))}

        {/* Pagination */}
          <div className="pagination">
          {Array.from({ length: Math.ceil(capsules.length / capsulesPerPage) }, (_, index) => (
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

export default Capsules;
