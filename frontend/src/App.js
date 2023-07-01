import './App.css';
import { Route, Routes,Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Projects from './component/Projects';
import Login from './component/Login';
import Signup from './component/Signup';
import Capsules from './component/Capsules';
import Scenes from './component/Scenes';
import NotFound from './component/NotFound';
import Collaborateurs from './component/Collaborateurs';
import MesScenes from './component/MesScenes';
import Videos from './component/Videos';

function App() {
  const {user}=useAuthContext()
  return (
    <>
      <Navbar/>
      <Routes> 
        <Route  path='/' element={<Home/>}/> 
        <Route path="/capsule/:id" element={user ? <Capsules/> : <Navigate to="/login"/>} />
        <Route path="/scene/:id" element={user ? <Scenes/> : <Navigate to="/login"/>} />
        <Route path="/scene_collaborateur/:id" element={user ? <Collaborateurs/> : <Navigate to="/login"/>} />
        <Route path="/mes-scenes" element={user ? <MesScenes/> : <Navigate to="/login"/>} />
        <Route  path='/Projects' element={user ? <Projects/> : <Navigate to="/login"/>}/> 
        <Route  path='/Login' element={!user ? <Login/> : <Navigate to="/Projects"/>}/> 
        <Route  path='/Signup' element={!user ? <Signup/> : <Navigate to="/Projects"/>}/> 
        <Route path="/video/:id" element={user ? <Videos/> : <Navigate to="/login"/>} />

        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
