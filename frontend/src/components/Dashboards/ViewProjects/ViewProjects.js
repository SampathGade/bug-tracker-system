import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        try {
            // Make API call to fetch projects for the specified page
            // const response = await fetch(`YOUR_PROJECTS_API_URL?page=${page}`);
            // const data = await response.json();
            
            // Simulated data for testing
            const data = [
                { projectName: 'Project A', manager: 'Manager A' },
                { projectName: 'Project B', manager: 'Manager B' },
                { projectName: 'Project C', manager: 'Manager C' },
                // More project objects...
            ];

            setProjects(data);
            setTotalPages(5); // Assuming there are 5 pages in total
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            <h2>View Projects</h2>
            <div>
                {projects.map((project, index) => (
                    <div key={index}>
                        <p>Project Name: {project.projectName}</p>
                        <p>Manager: {project.manager}</p>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default ViewProjects;
