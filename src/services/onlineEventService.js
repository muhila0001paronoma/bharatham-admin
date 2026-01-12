import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const onlineEventService = {
    // --- Online Events Endpoints ---

    getAllEvents: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/online-events`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching online events:', error);
            throw error;
        }
    },

    createEvent: async (eventData) => {
        try {
            const formData = new FormData();
            formData.append('eventName', eventData.eventName);
            formData.append('description', eventData.description);
            formData.append('eventDateTime', eventData.eventDateTime);
            formData.append('mode', eventData.mode);
            formData.append('totalAmount', eventData.totalAmount);

            if (eventData.imageFile) {
                formData.append('image', eventData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/online-events`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    // 'Content-Type': 'multipart/form-data' // Fetch sets this automatically with boundary
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating online event:', error);
            throw error;
        }
    },

    updateEvent: async (id, eventData) => {
        try {
            const formData = new FormData();
            formData.append('eventName', eventData.eventName);
            formData.append('description', eventData.description);
            formData.append('eventDateTime', eventData.eventDateTime);
            formData.append('mode', eventData.mode);
            formData.append('totalAmount', eventData.totalAmount);

            if (eventData.imageFile) {
                formData.append('image', eventData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/online-events/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating online event:', error);
            throw error;
        }
    },

    deleteEvent: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/online-events/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            // Some APIs might return empty body on 204
            if (response.status === 204) return { success: true };
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting online event:', error);
            throw error;
        }
    },

    searchEventsByName: async (eventName) => {
        try {
            const response = await fetch(`${API_BASE_URL}/online-events/search/by-name?eventName=${encodeURIComponent(eventName)}`, {
                headers: { ...getAuthHeader() },
            });
            return await response.json();
        } catch (error) {
            console.error('Error searching events by name:', error);
            throw error;
        }
    },

    // --- Bookings Endpoints ---

    getAllBookings: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/online-events-user-booking`, {
                headers: { ...getAuthHeader() },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching all bookings:', error);
            throw error;
        }
    },

    getBookingsByEventId: async (onlineEventId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/online-events-user-booking/search/by-online-event-id?onlineEventId=${onlineEventId}`, {
                headers: { ...getAuthHeader() },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching bookings by event id:', error);
            throw error;
        }
    },

    deleteBooking: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/online-events-user-booking/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            if (response.status === 204) return { success: true };
            return await response.json();
        } catch (error) {
            console.error('Error deleting booking:', error);
            throw error;
        }
    }
};
