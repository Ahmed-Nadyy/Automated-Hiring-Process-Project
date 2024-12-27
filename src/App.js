import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './Compnents/Dashboard/Dashboard';
import Login from './Compnents/Login';
import SubmitForm from './Compnents/SubmitForm/SubmitForm';
import SchedulePicker from './Compnents/Scheduling/SchedulePicker';
import SessionDetails from './Compnents/Dashboard/Managing/SessionDetails';

function App() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated); 
  const token = localStorage.getItem('token');

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
          <Route path="/dashboardd" element={  <Dashboard />   } />
          {/* SubmitForm Route */}
          <Route path="/submit-form" element= {<SubmitForm />} />
          {/* scheduling dashboard Route */}
          <Route path="/scheduling" element= {<SchedulePicker />} />
           {/* Dynamic Group and session Route */}
          <Route path="/managing/group/:id" element={<SessionDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
