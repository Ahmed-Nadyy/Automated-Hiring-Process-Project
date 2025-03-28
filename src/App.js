import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './Compnents/Dashboard/Dashboard';
import Login from './Compnents/Login';
import SubmitForm from './Compnents/SubmitForm/SubmitForm';
import SchedulePicker from './Compnents/Scheduling/SchedulePicker';
import GroupDetails from './Compnents/Dashboard/Managing/Grouops/GroupDetails';
import HomePage from './Compnents/HomePage';
import StudentDetails from './Compnents/Dashboard/Managing/Students/StudentDetails';
import test from './Compnents/Dashboard/Managing/Students/test';
import { ToastContainer } from 'react-toastify';
import CoachFeedback from './Compnents/CoachFeedback/CoachFeedback';
import DisplayCoachDetails from './Compnents/Dashboard/CoachesField/DisplayCoachDetails/DisplayCoachDetails';
import DashboardManaging from './Compnents/Dashboard/DashboardManaging';
import DashboardCoaches from './Compnents/Dashboard/DashboardCoaches';
import DashboardInterviews from './Compnents/Dashboard/DashboardInterviews';
import CoachLogsHistory from './Compnents/Dashboard/CoachesField/CoachLogsHistory';

function App() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Redirect to login if not authenticated */}
          <Route path="/" element={isAuthenticated ? <DashboardManaging /> : <Navigate to="/login" />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Dashboards Route */}
          {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} /> */}
          <Route path="/dashboard-managing" element={isAuthenticated ? <DashboardManaging /> : <Navigate to="/login" />} />
          <Route path="/dashboard-coaches" element={isAuthenticated ? <DashboardCoaches /> : <Navigate to="/login" />} />
          <Route path="/dashboard-interviews" element={isAuthenticated ? <DashboardInterviews /> : <Navigate to="/login" />} />
          {/* <Route path="/dashboard-managing" element={<DashboardManaging />} /> */}
          {/* <Route path="/dashboardd" element={<Dashboard />} /> */}
          {/* SubmitForm Route */}
          <Route path="/submit-form" element={<SubmitForm />} />
          {/* scheduling dashboard Route */}
          <Route path="/scheduling" element={<SchedulePicker />} />
          {/* Dynamic Group and session Route */}
          <Route path="/managing/group/:id" element={<GroupDetails />} />
          {/* Dynamic Group and session Route */}
          <Route path="/test" element={<HomePage />} />
          {/* Student Details Route */}
          <Route path="/students/:id" element={<StudentDetails />} />
          {/* Coches Feedback Route */}
          <Route path="/Coaches_Feedback" element={<CoachFeedback />} />
          {/* Coach Analysis Route */}
          <Route path="/dashboard-coaches/coach-analysis/:coachname/:id" element={<DisplayCoachDetails />} />
          {/* coach logs Route */}
          <Route path="/coach-logs-history/:coachId" element={<CoachLogsHistory />} />
          {/* Student Details Route */}
          {/* <Route path="/test" element={<test />} /> */}
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
