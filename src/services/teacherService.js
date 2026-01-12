import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const teacherService = {
    // Get all teachers
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/teachers`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching teachers:', error);
            throw error;
        }
    },

    // Get teacher by ID
    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching teacher ${id}:`, error);
            throw error;
        }
    },

    // Get teacher statistics
    getStatistics: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/teachers/${id}/statistics`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching statistics for teacher ${id}:`, error);
            throw error;
        }
    },

    // Create new teacher
    create: async (teacherData) => {
        try {
            const formData = new FormData();
            formData.append('name', teacherData.name);
            formData.append('title', teacherData.title || teacherData.position || '');
            formData.append('experience', teacherData.experience);
            formData.append('specialization', teacherData.specialization);
            formData.append('bio', teacherData.bio || '');
            formData.append('email', teacherData.email);
            formData.append('phone', teacherData.phone);
            formData.append('rating', teacherData.rating || 0);
            formData.append('totalStudents', teacherData.totalStudents || 0);
            formData.append('isActive', teacherData.isActive !== undefined ? teacherData.isActive : true);

            if (teacherData.imageFile) {
                formData.append('avatar', teacherData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/teachers`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating teacher:', error);
            throw error;
        }
    },

    // Update teacher
    update: async (id, teacherData) => {
        try {
            const formData = new FormData();
            formData.append('name', teacherData.name);
            formData.append('title', teacherData.title || teacherData.position || '');
            formData.append('experience', teacherData.experience);
            formData.append('specialization', teacherData.specialization);
            formData.append('bio', teacherData.bio || '');
            formData.append('email', teacherData.email);
            formData.append('phone', teacherData.phone);
            formData.append('rating', teacherData.rating || 0);
            formData.append('totalStudents', teacherData.totalStudents || 0);
            formData.append('isActive', teacherData.isActive !== undefined ? teacherData.isActive : true);

            if (teacherData.imageFile) {
                formData.append('avatar', teacherData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating teacher ${id}:`, error);
            throw error;
        }
    },

    // Delete teacher
    delete: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting teacher ${id}:`, error);
            throw error;
        }
    }
};
