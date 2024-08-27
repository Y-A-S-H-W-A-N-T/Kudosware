// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Profile from './pages/Profile';
import Home from './pages/home';
import Jobs from './pages/jobs';
import Overview from './pages/overview';

axios.defaults.baseURL = "https://kudosware-5qtd.onrender.com/"

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </Router>
  );
};

export default App;