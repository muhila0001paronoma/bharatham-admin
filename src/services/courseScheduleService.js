import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const courseScheduleService = {
    getAllSchedules: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-schedules`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching course schedules:', error);
            throw error;
        }
    },

    createSchedule: async (scheduleData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-schedules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(scheduleData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating course schedule:', error);
            throw error;
        }
    },

    updateSchedule: async (id, scheduleData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-schedules/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(scheduleData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating course schedule:', error);
            throw error;
        }
    },

    deleteSchedule: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-schedules/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting course schedule:', error);
            throw error;
        }
    },

    getSchedulesByCourse: async (courseId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-schedules/by-course/${courseId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching schedules by course:', error);
            throw error;
        }
    },

    getSchedulesByDate: async (date) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-schedules/by-date?date=${date}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching schedules by date:', error);
            throw error;
        }
    }
};
