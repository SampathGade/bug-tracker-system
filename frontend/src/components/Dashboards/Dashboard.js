import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Dashboard = () => {
    const location = useLocation();
    const loginResponse = location.state?.response;

    console.log('the loginResponse in Dashboard')
    console.log(loginResponse)

    const isAdmin = loginResponse.role === 'admin';
    const isProductManager = loginResponse.role === 'product_manager';
    const isDeveloper = loginResponse.role === 'developer';
    const isQA = loginResponse.role === 'QA';
    const isExternal = loginResponse.role === 'external';
    const navigate = useNavigate();

    const handleOnboardPerson = () => {
        navigate("/onboard")
    };

    const handleCreateProject = () => {
        navigate("/createProject")
    };

    const handleCreateBug = () => {
        navigate("/createBug")
    };

    const handleViewBugs = () => {
        navigate("/viewBugs")
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

            {(!isDeveloper) && (
            <div>
                <button onClick={handleCreateBug}>Create Bug</button>
            </div>
            )}

            <div>
                <button onClick={handleViewBugs}>View Bugs</button>
            </div>

            {(!isExternal) && (
            <div>
                <button onClick={handleViewProjects}>View Projects</button>
            </div>
            )}

            {(isAdmin || isProductManager) && (
            <div>
                <button onClick={handleGenerateReport}>Generate Report</button>
            </div>
            )}
        </div>
    );
};

export default Dashboard;
