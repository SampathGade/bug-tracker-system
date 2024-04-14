import React, { useState } from 'react';
import './Dashboard.css'; // Ensure this CSS is properly linked and contains the required styles

// Import components
import OnboardPerson from './OnBoarding/Onboard';
import CreateProject from './CreateProject/CreateProject';
import CreateBug from './CreateBug/CreateBug';
import ViewBugs from './ViewBug/ViewBug';
import ViewProjects from './ViewProjects/ViewProjects';
// import GenerateReport from '.';

const NavbarButton = ({ children, onClick }) => (
    <button className="navbarButton" onClick={onClick}>
        {children}
    </button>
);

const Dashboard = () => {
    const [activeView, setActiveView] = useState('ViewBugs');

    const renderComponent = () => {
        switch (activeView) {
            case 'ViewBugs':
                return <ViewBugs />;
            case 'OnboardPerson':
                return <OnboardPerson />;
            // case 'CreateProject':
            //     return <CreateProject />;
            // case 'CreateBug':
            //     return <CreateBug />;
            case 'ViewProjects':
                return <ViewProjects />;
            // case 'GenerateReport':
            //     return <GenerateReport />;
            default:
                return <ViewBugs />; // Default view
        }
    };

    return (
        <>
            <div className="navbar">
                <NavbarButton onClick={() => setActiveView('ViewBugs')}>View Bugs</NavbarButton>
                <NavbarButton onClick={() => setActiveView('OnboardPerson')}>Onboard a Person</NavbarButton>
                {/* <NavbarButton onClick={() => setActiveView('CreateProject')}>Create Project</NavbarButton> */}
                {/* <NavbarButton onClick={() => setActiveView('GenerateReport')}>Generate Report</NavbarButton> */}
                {/* <NavbarButton onClick={() => setActiveView('CreateBug')}>Create Bug</NavbarButton> */}
                <NavbarButton onClick={() => setActiveView('ViewProjects')}>View Projects</NavbarButton>
            </div>
            <div className="content">
                {renderComponent()}
            </div>
        </>
    );
};

export default Dashboard;
