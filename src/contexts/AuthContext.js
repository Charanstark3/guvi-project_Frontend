import React, { createContext, useState, useEffect } from 'react';
import { loginUser, getUserProfile } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const userData = await getUserProfile();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        const { token, employeeId } = await loginUser(credentials);
        localStorage.setItem('token', token);
        localStorage.setItem('employeeId', employeeId);
        await fetchUserProfile();
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('employeeId');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};