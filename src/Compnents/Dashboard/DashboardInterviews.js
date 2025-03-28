import React, { useState } from 'react';
import logo from '../../Assets/Images/logo.jpg';
import Header from './Header';
import Interviews from './Interviews/Interviews';
import Managing from './Managing/Managing';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CoachesField from './CoachesField/CoachesField';
import Dashboard from './Dashboard';

export default function DashboardInterviews() {
  const [activeLink, setActiveLink] = useState('interviews');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  return (
    <div className='h-[100vh]'>
      <div className='flex h-full'>
        <Dashboard activeLink={activeLink} link="dashboard-interviews" />
        <div className="flex-grow text-gray-800">
          <Header isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer} />
          <div className=' lg:max-h-[85vh] overflow-y-scroll'>
            <Interviews activeLink={activeLink} />
          </div>
        </div>
      </div>

    </div>
  )
}
