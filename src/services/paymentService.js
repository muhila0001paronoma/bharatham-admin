import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const paymentService = {
    // Get all payments
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-payments`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching payments:', error);
            throw error;
        }
    },

    // Get payment by ID
    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-payments/${id}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching payment ${id}:`, error);
            throw error;
        }
    },

    // Create new payment
    create: async (paymentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-payments`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: paymentData.courseId,
                    userEmail: paymentData.userEmail,
                    amount: parseFloat(paymentData.amount?.toString().replace(/,/g, '') || 0),
                    type: paymentData.type,
                    status: paymentData.status,
                    paidAt: paymentData.paidAt || new Date().toISOString(),
                    isActive: paymentData.isActive !== undefined ? paymentData.isActive : true
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw error;
        }
    },

    // Update payment
    update: async (id, paymentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-payments/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: paymentData.courseId,
                    userEmail: paymentData.userEmail,
                    amount: parseFloat(paymentData.amount?.toString().replace(/,/g, '') || 0),
                    type: paymentData.type,
                    status: paymentData.status,
                    paidAt: paymentData.paidAt,
                    isActive: paymentData.isActive !== undefined ? paymentData.isActive : true
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating payment ${id}:`, error);
            throw error;
        }
    },

    // Delete payment
    delete: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-payments/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting payment ${id}:`, error);
            throw error;
        }
    }
};
