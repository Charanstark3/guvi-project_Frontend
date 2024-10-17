import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../design/ProfilePage.css'; // Import your CSS file

export default function ProfilePage() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h3 className="profile-title">Employee Profile</h3>
                <p className="profile-description">Personal details and application.</p>
                <div className="profile-details">
                    <div className="profile-item">
                        <span className="profile-label">Full Name:</span>
                        <span className="profile-value">{user.employeeName}</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Employee ID:</span>
                        <span className="profile-value">{user.employeeId}</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Email Address:</span>
                        <span className="profile-value">{user.email}</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Date of Birth:</span>
                        <span className="profile-value">
                            {new Date(user.dateOfBirth).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Date Joined:</span>
                        <span className="profile-value">
                            {new Date(user.dateJoined).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
