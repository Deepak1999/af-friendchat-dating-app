import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Email from './components/Email_Signup/Email';
import Mobile from './components/Mobile_Signup/Mobile';
import Welcome from './components/Welcome/Welcome';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Otp from './components/Mobile_Signup/Otp';

function AppWrapper() {
  const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     document.body.style.backgroundColor = '#FF7F00';
  //   } else {
  //     document.body.style.backgroundColor = 'white';
  //   }

  //   return () => {
  //     document.body.style.backgroundColor = '';
  //   };
  // }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-mobile" element={<Mobile />} />
      <Route path="/login-email" element={<Email />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/m-otp" element={<Otp />} />
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