import React, { useState } from 'react';
import logo from '../../Assets/Images/logo.jpg';
import Header from './Header';
import Interviews from './Interviews/Interviews';
import Managing from './Managing/Managing';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CoachesField from './CoachesField/CoachesField';
import Dashboard from './Dashboard';


export default function DashboardManaging() {
  const [activeLink, setActiveLink] = useState('managing');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  return (
    <div className='h-[100vh]'>
      <div className='flex h-full'>
        <Dashboard activeLink={activeLink} link="dashboard-managing" />
                <div className="flex-grow text-gray-800">
                  <Header isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer}/> 
                  <div className=' lg:max-h-[85vh] overflow-y-scroll'>
                        <Managing activeLink={activeLink} setActiveLink={setActiveLink} />
                  </div>
                </div>
            </div>

        </div>
    )
}
