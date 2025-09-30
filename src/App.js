// import './App.css';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import Profile from './components/Profile/Profile';
// import Home from './components/Home/Home';
// import Email from './components/Email_Signup/Email';
// import Mobile from './components/Mobile_Signup/Mobile';
// import Welcome from './components/Welcome/Welcome';
// import Signup from './components/Signup/Signup';
// import Login from './components/Login/Login';
// import Otp from './components/Mobile_Signup/Otp';
// import WlcmHome from './components/WelcomeHome/WlcmHome';
// import Subscription from './components/WelcomeHome/Subscription';

// function AppWrapper() {

//   const location = useLocation();

//   return (
//     <Routes>
//       <Route path="/" element={<Welcome />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/login-mobile" element={<Mobile />} />
//       <Route path="/login-email" element={<Email />} />
//       <Route path="/home" element={<Home />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/m-otp" element={<Otp />} />
//       <Route path="/wlcm-home" element={<WlcmHome />} />
//       <Route path="/subs-plan" element={<Subscription />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppWrapper />
//     </Router>
//   );
// }

// export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Email from './components/Email_Signup/Email';
import Mobile from './components/Mobile_Signup/Mobile';
import Welcome from './components/Welcome/Welcome';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Otp from './components/Mobile_Signup/Otp';
import WlcmHome from './components/WelcomeHome/WlcmHome';
import Subscription from './components/WelcomeHome/Subscription';
import ProtectedRoute from './components/ProtectedRoute';

function AppWrapper() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-mobile" element={<Mobile />} />
      <Route path="/login-email" element={<Email />} />
      <Route path="/m-otp" element={<Otp />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wlcm-home" element={<WlcmHome />} />
        <Route path="/subs-plan" element={<Subscription />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
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