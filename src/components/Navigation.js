import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../design/Navigation.css'; // Import your CSS file

export default function Navigation({ setActivePage }) {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
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
    );
}
