import React,{useState} from 'react'
import { BrowserRouter as Router, Route, Routes, Form} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Vehicle from './pages/Vehicle';
import PesoTank from './pages/PesoTank';
import Login from './pages/Login';
import Policy from './pages/Policy';
import FormCollection from './pages/forms/Form';
import General from './pages/General';


function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthorization = () => {
    setIsAuthorized(true);
  };

  return (
    <>
    <Router>
      <Navbar onAuthorize={handleAuthorization}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Vehicle" element={<Vehicle/>} />
          <Route path="/pesotank" element={<PesoTank/>} />
          <Route path="/general" element={<General/>} />
          <Route path="/policy" element={<Policy/>} />
          <Route path="/form" element={isAuthorized ?<FormCollection/>: <Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
    </Router>
</>
  )
}

export default App
