import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/theory': 'Theory',
  '/techniques': 'Techniques',
  '/quiz': 'Quiz',
  '/quiz/theory': 'Theory Quiz',
  '/quiz/technique': 'Technique Quiz',
  '/quiz/results': 'Quiz Results',
  '/workouts': 'Workouts',
  '/games': 'Games',
  '/challenges': 'Challenges',
  '/online-events': 'Online Events',
  '/chats': 'Chats',
  '/reels': 'Reels',
  '/teachers': 'Teachers',
  '/teachers/details': 'Teachers Details',
  '/teachers/choreography': 'Choreography Videos',
  '/courses': 'Courses',
  '/courses/details': 'Course Details',
  '/courses/enroll': 'User Enroll',
  '/courses/payments': 'User Payments',
  '/courses/enquiry': 'User Enquiry',
  '/class-schedule': 'Class Schedule',
  '/users': 'Users',
  '/users/details': 'User Details',
  '/users/preference': 'User Preference'
};

export default function Layout({ children }) {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Header pageTitle={pageTitle} />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}

