import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Import sub-components
import BugComponent from './ViewBug/ViewBug';
import OnboardingComponent from './OnBoarding/OnboardingComponent';
import ViewPeopleComponent from './ViewUsers/ViewPeopleComponent';
import ProjectComponent from './ViewProjects/ViewProjectComponent';

const Dashboard = () => {
    const navigate = useNavigate();

    const [activeComponent, setActiveComponent] = useState(localStorage.getItem('activeComponent') || 'bugs');

    useEffect(() => {
        if (!localStorage.getItem('userEmail')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        localStorage.setItem('activeComponent', activeComponent);
    }, [activeComponent]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const getUserInitials = () => {
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
