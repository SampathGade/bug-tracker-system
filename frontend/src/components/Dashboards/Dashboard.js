import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Dashboard = () => {
    const location = useLocation();
    const loginResponse = location.state?.response;

    console.log('the loginResponse in Dashboard')
    console.log(loginResponse)

    const isAdmin = loginResponse.role === 'admin';
    const isProductManager = loginResponse.role === 'product_manager';

    const handleOnboardPerson = () => {
        // Implement logic for onboarding a person
    };

    const handleCreateProject = () => {
        // Implement logic for creating a project
    };

    const handleCreateBug = () => {
        // Implement logic for creating a bug
    };

    const handleViewBugs = () => {
        // Implement logic for viewing bugs
    };

    const handleViewProjects = () => {
        // Implement logic for viewing projects
    };

    const handleGenerateReport = () => {
        // Implement logic for generating a report
    };

    return (
        <div>
            {isAdmin && (
                <div>
                    <button onClick={handleOnboardPerson}>Onboard a Person</button>
                </div>
            )}

            {(isAdmin || isProductManager) && (
                <div>
                    <button onClick={handleCreateProject}>Create Project</button>
                </div>
            )}

            <div>
                <button onClick={handleCreateBug}>Create Bug</button>
            </div>

            <div>
                <button onClick={handleViewBugs}>View Bugs</button>
            </div>

            <div>
                <button onClick={handleViewProjects}>View Projects</button>
            </div>

            <div>
                <button onClick={handleGenerateReport}>Generate Report</button>
            </div>
        </div>
    );
};

export default Dashboard;
