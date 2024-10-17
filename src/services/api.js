import axios from 'axios';

const API_URL = 'https://guvi-project-backend.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const getUserProfile = async () => {
    const response = await api.get('/users/profile');
    return response.data;
};

export const markAttendance = async (status) => {
    const response = await api.post('/attendance/mark', { status });
    return response.data;
};

export const applyLeave = async (leaveData) => {
    const response = await api.post('/leave/apply', leaveData);
    return response.data;
};

export default api;