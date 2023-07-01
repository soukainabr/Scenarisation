import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import VideoDetails from '../component/VideoDetails';
import VideoForm from '../component/VideoForm';
import './Projects.css';

const Videos = () => {
  const { id } = useParams(); // ID de la capsule
  const { user } = useAuthContext();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(3);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const getVideosScenesId = async () => {
      try {
        const response = await axios.get(`/api/videos/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setVideos(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
        getVideosScenesId();
    }
  }, [id, user]);

  const handleAddVideo= (videoData) => {

    // Envoyer les données de la capsule à votre backend via axios.post() ou toute autre logique de gestion des capsules
    console.log('Nouvelle Video :', videoData);

    const formData = new FormData();
    formData.append('title',videoData.title)
    formData.append('description',videoData.description)
    formData.append('video',videoData.video)//{ title: projectData.title, description: projectData.description}
    formData.append('user_email',user.email)

    axios.post(`/api/videos/${id}`,formData ,{
      headers : {
        'Authorization' : `Bearer ${user.token}`
      }
    })
      .then(result => {
        console.log(result);
        navigate(1);
        setVideos((prevVideos) => [...prevVideos, result.data]);
      })
      .catch(err => console.log(err));

    // Fermer le dialogue après avoir ajouté la capsule
    setDialogOpen(false);
  };

  // Pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
      <div className="projects">
        <br /><br /><br /><br /><br /><br />
        <h2 className="style">Videos :</h2><br /><br />

        {/* Bouton "Créer Capsule" */}
        <button className="btn btn-danger" onClick={() => setDialogOpen(true)}>
          Créer Video
        </button>
        <button className="btn btn-danger space-between-buttons" onClick={() => navigate(-1)}>
          Retourner aux scenes
        </button>


        {/* Dialogue pour ajouter une video */}
        {dialogOpen && (
          <VideoForm onAddVideo={handleAddVideo} onClose={() => setDialogOpen(false)} />
        )}

        {currentVideos.map((video) => (
          <VideoDetails key={video._id} video={video} />
        ))}

        {/* Pagination */}
          <div className="pagination">
          {Array.from({ length: Math.ceil(videos.length / videosPerPage) }, (_, index) => (
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

export default Videos;
