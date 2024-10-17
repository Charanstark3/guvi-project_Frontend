import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import '../design/RegisterPage.css'; // Import your CSS file

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeId: '',
        email: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const { confirmPassword, ...userData } = formData;
            const response = await register(userData);
            setSuccess(response.message);
            setError('');

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
            setSuccess('');
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2 className="register-title">Register New Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="employeeName">Employee Name</label>
                        <input
                            id="employeeName"
                            name="employeeName"
                            type="text"
                            required
                            className="form-input"
                            placeholder="Enter Employee Name"
                            value={formData.employeeName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="employeeId">Employee ID</label>
                        <input
                            id="employeeId"
                            name="employeeId"
                            type="text"
                            required
                            className="form-input"
                            placeholder="Enter Employee ID"
                            value={formData.employeeId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="form-input"
                            placeholder="Enter Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            required
                            className="form-input"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="form-input"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            className="form-input"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <button type="submit" className="register-button">Register</button>
                </form>
                <div className="text-center">
                    <a href="/login" className="login-link">Already have an account? Sign in</a>
                </div>
            </div>
        </div>
    );
}
