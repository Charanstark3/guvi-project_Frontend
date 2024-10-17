import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Attendance from './Attendance';
import LeaveApplication from './LeaveApplication';
import ProfilePage from './ProfilePage';
import '../design/DashboardPage.css'; // Import your CSS file

export default function DashboardPage() {
    const [activePage, setActivePage] = useState('dashboard');
    const { logout, user } = useContext(AuthContext); // Get user context
    const navigate = useNavigate();

    // Use useEffect to update the document title whenever activePage changes
    useEffect(() => {
        switch (activePage) {
            case 'profile':
                document.title = 'Profile';
                break;
            case 'attendance':
                document.title = 'Attendance';
                break;
            case 'leave':
                document.title = 'Leave Application';
                break;
            default:
                document.title = 'Dashboard';
        }
    }, [activePage]); // Dependency array to trigger the effect on activePage change

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderActivePage = () => {
        switch (activePage) {
            case 'attendance':
                return <Attendance />;
            case 'leave':
                return <LeaveApplication />;
            case 'profile':
                return <ProfilePage />;
            default:
                return (
                    <div className="welcome-container text-center">
                        {/* Personalized welcome message */}
                        <h2 className="welcome-title">
                            Hello {user ? user.employeeName : 'Employee'}, Welcome to the Employee Dashboard
                        </h2>
                        <p className="welcome-message">
                            Select an option from the navigation menu to get started.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="navigation">
                <div className="navigation-menu">
                    <ul className="navigation-list">
                        <li>
                            <button
                                onClick={() => setActivePage('dashboard')}
                                className="navigation-item"
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActivePage('profile')}
                                className="navigation-item"
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActivePage('attendance')}
                                className="navigation-item"
                            >
                                Attendance
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActivePage('leave')}
                                className="navigation-item"
                            >
                                Leave Application
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="navigation-item logout"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="dashboard-content">
                <header className="dashboard-header">
                    <h1 className="dashboard-title">
                        {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
                    </h1>
                </header>
                <main className="dashboard-main">
                    {renderActivePage()}
                </main>
            </div>
        </div>
    );
}
