import React from 'react';
import { BadgeDollarSign, FileText, Presentation } from 'lucide-react';
import './TeacherDashboard.css';

export default function TeacherDashboard() {
    const stats = [
        {
            title: 'Total Courses',
            value: '6',
            icon: BadgeDollarSign,
            color: 'green'
        },
        {
            title: 'Choreography Videos',
            value: '1.2K',
            icon: FileText,
            color: 'purple'
        },
        {
            title: 'Today Classes',
            value: '02',
            icon: Presentation,
            color: 'pink'
        }
    ];

    const courses = [
        {
            id: 1,
            title: 'Bharathanatyam Basics',
            date: 'Jan 13, 2024',
            views: '6.5K',
            likes: '3.4K',
            price: '₹340'
        },
        {
            id: 2,
            title: 'Bharathanatyam Basics',
            date: 'Jan 13, 2024',
            views: '6.5K',
            likes: '3.4K',
            price: '₹340'
        },
        {
            id: 3,
            title: 'Bharathanatyam Basics',
            date: 'Jan 13, 2024',
            views: '6.5K',
            likes: '3.4K',
            price: '₹340'
        }
    ];

    const schedule = [
        {
            id: 1,
            time: '10:30',
            period: 'AM',
            title: 'Beginner Class',
            assignedBy: 'Priya S'
        },
        {
            id: 2,
            time: '10:30',
            period: 'AM',
            title: 'Beginner Class',
            assignedBy: 'Priya S'
        },
        {
            id: 3,
            time: '10:30',
            period: 'AM',
            title: 'Beginner Class',
            assignedBy: 'Priya S'
        }
    ];

    return (
        <div className="teacher-dashboard">
            {/* Welcome Section */}
            <div className="welcome-section">
                <div className="welcome-text">
                    <h1>Hello Teacher !</h1>
                    <p>Welcome to Bharatham Teacher Panel</p>
                </div>
                <button className="create-schedule-btn">
                    Create Class Schedule
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-container">
                {stats.map((stat, index) => (
                    <div key={index} className={`stats-card ${stat.color}`}>
                        <div className="stats-header">
                            <h2 className="stats-title">{stat.title}</h2>
                            <div className="stats-icon-wrapper">
                                <stat.icon size={24} color="white" strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="stats-value">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="content-grid">
                {/* My Courses Section */}
                <div className="courses-section">
                    <h2 className="section-title">My Courses</h2>
                    <div className="courses-list">
                        {courses.map((course) => (
                            <div key={course.id} className="course-card">
                                <div className="course-info">
                                    <h3>{course.title}</h3>
                                    <div className="course-date">{course.date}</div>
                                </div>
                                <div className="course-stats">
                                    <div className="stats-row">
                                        <span>{course.views} views</span>
                                        <span>{course.likes} likes</span>
                                    </div>
                                    <div className="course-price">{course.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Today's Schedule Section */}
                <div className="schedule-section">
                    <h2 className="section-title">Today's Schedule</h2>
                    <div className="schedule-list">
                        {schedule.map((item) => (
                            <div key={item.id} className="schedule-card">
                                <div className="time-box">
                                    <span className="time">{item.time}</span>
                                    <span className="period">{item.period}</span>
                                </div>
                                <div className="class-info">
                                    <div className="class-name">{item.title}</div>
                                    <div className="assigned-by">Assigned by {item.assignedBy}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
