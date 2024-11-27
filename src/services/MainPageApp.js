// src/MainPageApp.js (Renamed for clarity)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import JobHuntPage from './components/JobHuntPage';
import Register from './components/Register';
import './App.css';

const MainPageApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobHuntPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<h1>User List</h1>} />
      </Routes>
    </Router>
  );
};

export default MainPageApp;
