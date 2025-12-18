import React from 'react';
import './Dashboard.css';
import { DollarSign, FileText, Activity, Clock3 } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Earning', value: '₹62,300', color: '#0fa485', icon: <DollarSign size={28} /> },
    { label: 'Course Requests', value: '13', color: '#b526f1', icon: <FileText size={28} /> },
    { label: 'Pending Classes', value: '03', color: '#ef4b81', icon: <Activity size={28} /> }
  ];

  const courses = [
    { title: 'Bharathanatyam Basics', date: 'Jan 13, 2024', views: '6.5K', likes: '3.4K', price: '₹340' },
    { title: 'Bharathanatyam Basics', date: 'Jan 13, 2024', views: '6.5K', likes: '3.4K', price: '₹340' },
    { title: 'Bharathanatyam Basics', date: 'Jan 13, 2024', views: '6.5K', likes: '3.4K', price: '₹340' }
  ];

  const schedule = [
    { time: '10:30 AM', title: 'Beginner Class', teacher: 'Assigned by Priya S' },
    { time: '10:30 AM', title: 'Beginner Class', teacher: 'Assigned by Priya S' },
    { time: '10:30 AM', title: 'Beginner Class', teacher: 'Assigned by Priya S' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="welcome-card">
          <div>
            <h2>Hello Admin !</h2>
            <p>Welcome to Bharatham Admin Panel</p>
          </div>
          <button className="primary-btn">Create New Course</button>
        </div>

        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.label} className="stat-card" style={{ background: item.color }}>
              <div className="stat-icon">{item.icon}</div>
              <div className="stat-label">{item.label}</div>
              <div className="stat-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="card wide-card">
          <div className="card-header">
            <h3>Top Courses</h3>
          </div>
          <div className="course-list">
            {courses.map((course, idx) => (
              <div key={`${course.title}-${idx}`} className="course-item">
                <div>
                  <div className="course-title">{course.title}</div>
                  <div className="course-date">{course.date}</div>
                </div>
                <div className="course-meta">
                  <span>{course.views} views</span>
                  <span>{course.likes} likes</span>
                  <span className="price">{course.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card schedule-card">
          <div className="card-header">
            <h3>Today’s Schedule</h3>
          </div>
          <div className="schedule-list">
            {schedule.map((item, idx) => (
              <div key={`${item.time}-${idx}`} className="schedule-item">
                <div className="schedule-time">
                  <Clock3 size={18} />
                  <span>{item.time}</span>
                </div>
                <div className="schedule-info">
                  <div className="schedule-title">{item.title}</div>
                  <div className="schedule-teacher">{item.teacher}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

