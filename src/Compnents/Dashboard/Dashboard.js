import React, { useState } from 'react';
import logo from '../../Assets/Images/logo.jpg';
import Header from './Header';
import Interviews from './Interviews/Interviews';
import Managing from './Managing/Managing';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CoachesField from './CoachesField/CoachesField';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Dashboard({ link, activeLink }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const Navigate = useNavigate();

  const handleClicked = (link) => {
    Navigate(`/${link}`);
  }
  return (
    <div className='h-[100vh]'>
      <div className='flex h-full'>
        <aside className={`sm:flex sm:flex-col ${isDrawerOpen ? 'block' : 'hidden'}`}>
          <a href="#" className="inline-flex items-center justify-center h-20 w-20 bg-blue-600 hover:bg-blue-500 focus:bg-blue-500">
            <img className="mx-auto h-25 w-auto" src={logo} alt="Your Company" />
          </a>
          <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
            <nav className="flex flex-col mx-4 my-6 space-y-4">
              {/* Dashboard Link */}
              <a
                href="#"
                onClick={() => handleClicked("dashboard-managing")}
                className={`inline-flex items-center justify-center py-3 rounded-lg ${activeLink === 'managing'
                  ? 'text-blue-600 bg-white'
                  : 'hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700'
                  }`}
              >
                <span className="sr-only">Managing</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </a>
              <a
                href="#"
                onClick={() => handleClicked("dashboard-interviews")}
                className={`inline-flex items-center justify-center py-3 rounded-lg ${activeLink === 'interviews'
                  ? 'text-blue-600 bg-white'
                  : 'hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700'
                  }`}
              >
                <span className="sr-only">Interviews</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </a>
              <a
                href="#"
                onClick={() => handleClicked("dashboard-coaches")}
                className={`inline-flex items-center justify-center py-3 rounded-lg ${activeLink === 'Coaches'
                  ? 'text-blue-600 bg-white'
                  : 'hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700'
                  }`}
              >
                <span className="sr-only">Coaches Field</span>
                <FontAwesomeIcon icon={faChalkboardUser} />
              </a>
              {/* Folders Link */}
            </nav>

            <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
              <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                <span className="sr-only">Settings</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </aside>
        {/* <div className="flex-grow text-gray-800">
                  <Header isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer}/> 
                  <div className=' lg:max-h-[85vh] overflow-y-scroll'>
                    {activeLink === 'interviews' ? 
                      (<Interviews />) : 
                      (activeLink === 'managing' ? 
                        (<Managing />) : 
                        (<CoachesField />)
                      )
                    }
                  </div>
                </div> */}
      </div>

    </div>
  )
}
