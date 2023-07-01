import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  useEffect(() => {
    const getScenesByCapsuleId = async () => {
      try {
        const response = await axios.get(`/api/scene_collaborateur//collaborateur/${user.email}`, {
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
       
        <h2 className="t">Les Scenes dont vous etes collaborateur :</h2>
<br />

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
