 import axios from 'axios';
import { useEffect, useState } from "react";
import ProjectDetails from '../component/ProjectDetails';
import ProjectForm from '../component/ProjectForm';
import './Projects.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3);
  const [dialogOpen, setDialogOpen] = useState(false); // État pour contrôler l'ouverture/fermeture du dialogue
  const {user} = useAuthContext();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects",{
          headers : {
            'Authorization' : `Bearer ${user.token}`
          }
        });
        setProjects(response.data)
        console.log(response.data)
        
      } catch (err) {
        console.log(err);
      }
    };
    if(user){
      fetchProjects();
    }
  }, [user]);

  const handleAddProject = (projectData) => {
    

    // Envoyer les données du projet à votre backend via axios.post() ou toute autre logique de gestion des projets
    console.log("Nouveau projet :", projectData);

    const formData = new FormData();
    formData.append('title',projectData.title)
    formData.append('description',projectData.description)
    formData.append('image',projectData.image)//{ title: projectData.title, description: projectData.description}
    axios.post("/api/projects",formData ,{
      headers : {
        'Authorization' : `Bearer ${user.token}`
      }
    })
      .then(result => {
        console.log(result);
        navigate(1);
        setProjects((prevScenes) => [...prevScenes, result.data]);
        //window.location.reload()
      })
      .catch(err => console.log(err));

    // Fermer le dialogue après avoir ajouté le projet
    setDialogOpen(false);
  };

  // Index du dernier projet de la page
  const indexOfLastProject = currentPage * projectsPerPage;
  // Index du premier projet de la page
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  // Projets affichés sur la page courante
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      <div className="projects">
        <br /><br /><br /><br /><br /><br />
        
        <h2 className="style">Projects :</h2><br /><br />

        {/* Bouton "Créer Projet" */}
        <button className="btn btn-danger" onClick={() => setDialogOpen(true)}>Créer Projet</button>

        {/* Dialogue pour ajouter un projet */}
        <ProjectForm open={dialogOpen} onClose={() => setDialogOpen(false)} onAddProject={handleAddProject} />

        {currentProjects.map((project) => (
          <ProjectDetails key={project._id} project={project} />
        ))}

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }, (_, index) => (
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
    </div>
  );
};

export default Projects;