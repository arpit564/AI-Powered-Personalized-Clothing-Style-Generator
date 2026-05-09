import './App.css'
import GenWee from './pages/GenWee'
import { BrowserRouter, Routes, Route , useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Future from './pages/Future'


function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  const allowedRoutes = ["/GenWee", "/About", "/Contact"];
  const showNavbar = allowedRoutes.includes(location.pathname);

  return (
    <div>
      {showNavbar && (
        <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
          <Navbar />
        </div>
      )}

      <div style={{ paddingTop: showNavbar ? "60px" : "0px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/GenWee" element={<GenWee />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/future" element={<Future />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
