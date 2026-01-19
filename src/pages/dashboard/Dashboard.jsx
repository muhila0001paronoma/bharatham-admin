import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { DollarSign, FileText, Activity, Clock3, Users, Layers } from 'lucide-react';
import { adminDashboardService } from '../../services/adminDashboardService';
import { courseScheduleService } from '../../services/courseScheduleService';
import { courseService } from '../../services/courseService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { label: 'Total Earning', value: '₹0', color: '#0fa485', icon: <DollarSign size={28} /> },
    { label: 'Course Requests', value: '0', color: '#b526f1', icon: <FileText size={28} /> },
    { label: 'Pending Classes', value: '0', color: '#ef4b81', icon: <Activity size={28} /> }
  ]);

  const [topCourses, setTopCourses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      const [statsRes, topCoursesRes, scheduleRes, coursesRes] = await Promise.all([
        adminDashboardService.getStatistics(),
        adminDashboardService.getTopCourses(),
        courseScheduleService.getSchedulesByDate(today),
        courseService.getAll()
      ]);

      if (statsRes.success) {
        setStats([
          { label: 'Total Earning', value: `₹${statsRes.data.totalEarnings.toLocaleString()}`, color: '#0fa485', icon: <DollarSign size={28} /> },
          { label: 'Course Requests', value: statsRes.data.totalCourseRequests.toString(), color: '#b526f1', icon: <FileText size={28} /> },
          { label: 'Pending Classes', value: statsRes.data.pendingClasses.toString().padStart(2, '0'), color: '#ef4b81', icon: <Activity size={28} /> }
        ]);
      }

      if (topCoursesRes.success) {
        setTopCourses(topCoursesRes.data);
      }

      let courseMap = {};
      if (coursesRes.success) {
        coursesRes.data.forEach(course => {
          courseMap[course.id] = course.courseTitle;
        });
        setCourses(courseMap);
      }

      if (scheduleRes.success) {
        setSchedule(scheduleRes.data);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="welcome-card">
          <div>
            <h2>Hello Admin !</h2>
            <p>Welcome to Bharatham Admin Panel</p>
          </div>
          <button
            className="primary-btn"
            onClick={() => navigate('/courses')}
          >
            Create New Course
          </button>
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
          <div className="course-list-container">
            {topCourses.length > 0 ? (
              topCourses.map((course) => (
                <div key={course.id} className="course-item">
                  <div>
                    <div className="course-title">{course.courseTitle}</div>
                    <div className="course-title-sub">
                      {new Date(course.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="course-meta">
                    <span><Users size={18} /> {course.totalEnrolledStudents} students</span>
                    <span><Layers size={18} /> {course.level}</span>
                    <span className="price">₹{course.price.toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No courses found</p>
            )}
          </div>
        </div>

        <div className="card schedule-card">
          <div className="card-header">
            <h3>Today’s Schedule</h3>
          </div>
          <div className="schedule-list-container">
            {schedule.length > 0 ? (
              schedule.map((item) => (
                <div key={item.id} className="schedule-item">
                  <div className="schedule-time-badge">
                    <Clock3 size={14} />
                    <span>{formatTime(item.startTime)}</span>
                  </div>
                  <div className="schedule-title">{courses[item.courseId] || 'Unknown Course'}</div>
                  <div className="schedule-period">{formatTime(item.startTime)} - {formatTime(item.endTime)}</div>
                </div>
              ))
            ) : (
              <p className="no-data">No classes scheduled for today</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

