import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './Compnents/Dashboard/Dashboard';
import Login from './Compnents/Login';
import SubmitForm from './Compnents/SubmitForm/SubmitForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); 
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Redirect to login if not authenticated */}
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

          {/* SubmitForm Route */}
          <Route path="/submit-form" element={isAuthenticated ? <SubmitForm /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
