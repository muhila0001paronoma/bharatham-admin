import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import {
  LogOut,
  Search,
  ChevronDown
} from 'lucide-react';

import dashboardIcon from '../../assets/sidebar icons/dashboard.png';
import theoryIcon from '../../assets/sidebar icons/theory.png';
import techniquesIcon from '../../assets/sidebar icons/techniques.png';
import quizIcon from '../../assets/sidebar icons/quiz.png';
import workoutsIcon from '../../assets/sidebar icons/workouts.png';
import gamesIcon from '../../assets/sidebar icons/games.png';
import challengesIcon from '../../assets/sidebar icons/challenges.png';
import onlineEventsIcon from '../../assets/sidebar icons/online_events.png';
import chatsIcon from '../../assets/sidebar icons/chats.png';
import reelsIcon from '../../assets/sidebar icons/reels.png';
import teachersIcon from '../../assets/sidebar icons/teachers.png';
import coursesIcon from '../../assets/sidebar icons/courses.png';
import classScheduleIcon from '../../assets/sidebar icons/class_schedule.png';
import usersIcon from '../../assets/sidebar icons/users.png';

const iconMap = {
  dashboard: dashboardIcon,
  theory: theoryIcon,
  techniques: techniquesIcon,
  quiz: quizIcon,
  workouts: workoutsIcon,
  games: gamesIcon,
  challenges: challengesIcon,
  'online-events': onlineEventsIcon,
  chats: chatsIcon,
  reels: reelsIcon,
  teachers: teachersIcon,
  courses: coursesIcon,
  'class-schedule': classScheduleIcon,
  users: usersIcon
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({
    quiz: false,
    teachers: false,
    courses: false,
    users: false
  });

  const toggleExpand = (item) => {
    setExpandedItems(prev => {
      if (prev[item]) {
        return {
          ...prev,
          [item]: false
        };
      }
      const newState = {
        quiz: false,
        teachers: false,
        courses: false,
        users: false,
        [item]: true
      };

      if (item === 'users') {
        setTimeout(() => {
          const navElement = document.querySelector('nav');
          if (navElement) {
            navElement.scrollTop = navElement.scrollHeight;
          }
        }, 100);
      }

      return newState;
    });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: iconMap.dashboard, path: '/dashboard' },
    { id: 'theory', label: 'Theory', icon: iconMap.theory, path: '/theory' },
    { id: 'techniques', label: 'Techniques', icon: iconMap.techniques, path: '/techniques' },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: iconMap.quiz,
      path: '/quiz',
      subItems: [
        { label: 'Theory Quiz', path: '/quiz/theory' },
        { label: 'Technique Quiz', path: '/quiz/technique' },
        { label: 'Quiz Results', path: '/quiz/results' }
      ]
    },
    { id: 'workouts', label: 'Workouts', icon: iconMap.workouts, path: '/workouts' },
    { id: 'games', label: 'Games', icon: iconMap.games, path: '/games' },
    { id: 'challenges', label: 'Challenges', icon: iconMap.challenges, path: '/challenges' },
    { id: 'online-events', label: 'Online Events', icon: iconMap['online-events'], path: '/online-events' },
    { id: 'chats', label: 'Chats', icon: iconMap.chats, path: '/chats' },
    { id: 'reels', label: 'Reels', icon: iconMap.reels, path: '/reels' },
    {
      id: 'teachers',
      label: 'Teachers',
      icon: iconMap.teachers,
      path: '/teachers',
      subItems: [
        { label: 'Teachers Details', path: '/teachers/details' },
        { label: 'Choreography Videos', path: '/teachers/choreography' }
      ]
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: iconMap.courses,
      path: '/courses',
      subItems: [
        { label: 'Course Details', path: '/courses/details' },
        { label: 'User Enroll', path: '/courses/enroll' },
        { label: 'User Payments', path: '/courses/payments' },
        { label: 'User Enquiry', path: '/courses/enquiry' }
      ]
    },
    { id: 'class-schedule', label: 'Class Schedule', icon: iconMap['class-schedule'], path: '/class-schedule' },
    {
      id: 'users',
      label: 'Users',
      icon: iconMap.users,
      path: '/users',
      subItems: [
        { label: 'User Details', path: '/users/details' },
        { label: 'User Preference', path: '/users/preference' }
      ]
    }
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo-section">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            B
          </div>
          <h1 className="sidebar-title">
            Bharatham
          </h1>
        </div>
        <div className="sidebar-search">
          <Search className="sidebar-search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="sidebar-search-input"
          />
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          const isExpanded = expandedItems[item.id];

          return (
            <div key={item.id}>
              <div
                onClick={() => {
                  if (item.subItems) {
                    toggleExpand(item.id);
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`sidebar-menu-item ${active ? 'sidebar-menu-item--active' : ''}`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="sidebar-menu-icon"
                />
                <span className="sidebar-menu-text">{item.label}</span>
                {item.subItems && (
                  <ChevronDown
                    className={`sidebar-chevron ${isExpanded ? 'sidebar-chevron--expanded' : ''}`}
                  />
                )}
              </div>
              {item.subItems && (
                <div className={`sidebar-submenu ${isExpanded ? 'sidebar-submenu--expanded' : ''}`}>
                  {item.subItems.map((subItem, index) => {
                    const subActive = location.pathname === subItem.path;
                    return (
                      <div
                        key={subItem.path}
                        onClick={() => navigate(subItem.path)}
                        className={`sidebar-submenu-item ${subActive ? 'sidebar-submenu-item--active' : ''} ${isExpanded ? 'sidebar-submenu-item--animating' : ''}`}
                        style={{
                          animationDelay: isExpanded ? `${index * 80}ms` : '0ms'
                        }}
                      >
                        {subItem.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-logout-section">
        <button
          onClick={handleLogout}
          className="sidebar-logout-button"
        >
          <LogOut className="sidebar-logout-icon" />
          Logout
        </button>
      </div>
    </div>
  );
}

