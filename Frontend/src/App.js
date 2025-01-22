import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Equipment from './Equipment';
import Reservation from './Reservation';
import Login from './Login';
import AdminPanel from './AdminPanel';
import Navbar from './Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;