import React, { useState } from 'react';
import { markAttendance } from '../services/api';
import '../design/Attendance.css'; // Import your CSS file

export default function Attendance() {
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    const handleMarkAttendance = async (e) => {
        e.preventDefault();
        try {
            const response = await markAttendance(status);
            setMessage(response.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error marking attendance');
        }
    };

    return (
        <div className="attendance-container">
            <div className="attendance-form">
                <h2 className="attendance-title">Mark Attendance</h2>
                <form onSubmit={handleMarkAttendance} className="form">
                    <div className="form-group">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-select"
                            required
                        >
                            <option value="">Select status</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">
                        Mark Attendance
                    </button>
                </form>
                {message && (
                    <p className={`feedback-message ${message.includes('Error') ? 'error' : 'success'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
