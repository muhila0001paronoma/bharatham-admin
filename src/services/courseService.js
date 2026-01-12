import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const courseService = {
    // Get all courses
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    },

    // Alias for getAllCourses to support existing components
    getAllCourses: async function () {
        return this.getAll();
    },

    // Get course by ID
    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching course ${id}:`, error);
            throw error;
        }
    },

    // Create new course
    create: async (courseData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseTitle: courseData.title,
                    teacherId: courseData.teacherId,
                    courseDuration: courseData.duration,
                    startDate: courseData.startDate,
                    endDate: courseData.endDate,
                    totalLessons: parseInt(courseData.totalLessons || 0),
                    totalEnrolledStudents: parseInt(courseData.totalEnrolledStudents || 0),
                    price: parseFloat(courseData.price?.toString().replace(/,/g, '') || 0),
                    level: courseData.level,
                    aboutCourse: courseData.about,
                    status: courseData.status,
                    isActive: courseData.active !== undefined ? courseData.active : true
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    },

    // Update course
    update: async (id, courseData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseTitle: courseData.title,
                    teacherId: courseData.teacherId,
                    courseDuration: courseData.duration,
                    startDate: courseData.startDate,
                    endDate: courseData.endDate,
                    totalLessons: parseInt(courseData.totalLessons || 0),
                    totalEnrolledStudents: parseInt(courseData.totalEnrolledStudents || 0),
                    price: parseFloat(courseData.price?.toString().replace(/,/g, '') || 0),
                    level: courseData.level,
                    aboutCourse: courseData.about,
                    status: courseData.status,
                    isActive: courseData.active !== undefined ? courseData.active : true
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating course ${id}:`, error);
            throw error;
        }
    },

    // Delete course
    delete: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting course ${id}:`, error);
            throw error;
        }
    }
};
