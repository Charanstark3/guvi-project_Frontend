import React, { useState } from 'react';
import { applyLeave } from '../services/api';
import '../design/LeaveApplication.css'; // Import your CSS file

export default function LeaveApplication() {
    const [leaveData, setLeaveData] = useState({
        leaveType: '',
        startDate: '',
        endDate: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await applyLeave(leaveData);
            setMessage(response.message);
            setLeaveData({ leaveType: '', startDate: '', endDate: '' });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error applying for leave');
        }
    };

    return (
        <div className="leave-application-container">
            <div className="leave-application-form">
                <h2 className="form-title">Apply for Leave</h2>
                <form onSubmit={handleSubmit} className="form-content">
                    <div className="form-group">
                        <label htmlFor="leaveType" className="form-label">Leave Type</label>
                        <input
                            type="text"
                            id="leaveType"
                            name="leaveType"
                            value={leaveData.leaveType}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={leaveData.startDate}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={leaveData.endDate}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Apply for Leave
                    </button>
                </form>
                {message && (
                    <p className="response-message">{message}</p>
                )}
            </div>
        </div>
    );
}
