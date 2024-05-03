import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Import sub-components
import BugComponent from './ViewBug/ViewBug';
import OnboardingComponent from './OnBoarding/OnboardingComponent';
import ViewPeopleComponent from './ViewUsers/Users';
import ProjectComponent from './ViewProjects/ViewProjects';

const Dashboard = () => {
    const navigate = useNavigate();

    // Initialize activeComponent from localStorage or default to 'bugs'
    const [activeComponent, setActiveComponent] = useState(localStorage.getItem('activeComponent') || 'bugs');

    useEffect(() => {
        if (!localStorage.getItem('userEmail')) {
            navigate('/login');
        }
    }, [navigate]);

    // Effect to store activeComponent in localStorage
    useEffect(() => {
        localStorage.setItem('activeComponent', activeComponent);
    }, [activeComponent]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const getUserInitials = () => {
        // Placeholder for actual initials fetching logic
        return `YS`;
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'bugs':
                return <BugComponent />;
            case 'onboarding':
                return <OnboardingComponent />;
            case 'people':
                return <ViewPeopleComponent />;
            case 'projects':
                return <ProjectComponent />;
            default:
                return <BugComponent />;
        }
    };

    return (
        <div className="dashboard">
            <nav>
                <ul>
                    <li onClick={() => setActiveComponent('bugs')}>Bugs</li>
                    <li onClick={() => setActiveComponent('onboarding')}>Onboarding</li>
                    <li onClick={() => setActiveComponent('people')}>View People</li>
                    <li onClick={() => setActiveComponent('projects')}>Projects</li>
                    <li className="profile-icon" onClick={() => setActiveComponent('profile')}>
                        {getUserInitials()}
                        <div className="dropdown-content">
                            <a href="#logout" onClick={handleLogout}>Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className="content">
                {renderComponent()}
            </div>
        </div>
    );
};

export default Dashboard;
