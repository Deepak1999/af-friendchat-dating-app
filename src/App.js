import './App.css';
import Login from './components/Login/Login';
import Email from './components/Signup/Email';
import Mobile from './components/Signup/Mobile';
import Signup from './components/Signup/Signup';
import Welcome from './components/Welcome/Welcome';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home/Home';

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.style.backgroundColor = '#FF7F00';
    } else {
      document.body.style.backgroundColor = 'white';
    }

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-mobile" element={<Mobile />} />
      <Route path="/login-email" element={<Email />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;