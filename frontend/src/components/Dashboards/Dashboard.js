import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Make sure this is the path to your CSS file

// Import components
import PendingRequests from './OnBoarding/PendingRequests';
import ViewBugs from './ViewBug/ViewBug';
import ViewProjects from './ViewProjects/ViewProjects';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

// Button component for the navigation bar
const NavbarButton = ({ label, onClick }) => (
    <button className="navbarButton" onClick={onClick}>
        {label}
    </button>
);

// Main Dashboard component
const Dashboard = () => {
    const [activeView, setActiveView] = useState('ViewBugs');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserData(parsedUser);
            // You can now use `userData.role` to conditionally render components based on user role
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('user'); // Remove user from local storage
        navigate('/login'); // Navigate back to login page
    };

    const renderComponent = () => {
        switch (activeView) {
            case 'ViewBugs':
                return <ViewBugs />;
            case 'OnboardPerson':
                return <PendingRequests />;
            case 'ViewProjects':
                return <ViewProjects />;
            default:
                return <ViewBugs />;
        }
    };

    return (
        <>
            <div className="navbar">
                <div className="navbar-left">
                    <NavbarButton label="View Bugs" onClick={() => setActiveView('ViewBugs')} />
                    {userData && userData.role === 'admin' && (
                    <NavbarButton label="Pending Onboarding" onClick={() => setActiveView('OnboardPerson')} />
                )}
                    <NavbarButton label="View Projects" onClick={() => setActiveView('ViewProjects')} />
                </div>
                <div className="navbar-right">
                    <div className="user-profile">
                        <button className="profile-button">Profile</button>
                        <div className="profile-dropdown">
                            <button onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                {renderComponent()}
            </div>
        </>
    );
};

export default Dashboard;
