import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewBugs = () => {
    const [bugs, setBugs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        try {
            // Make API call to fetch bugs for the specified page
            // const response = await fetch(`YOUR_BUGS_API_URL?page=${page}`);
            // const data = await response.json();
            
            // Simulated data for testing
            const data = [
                { bugName: 'Bug 1', bugType: 'Type 1', currentStatus: 'Open', assignee: 'User A' },
                { bugName: 'Bug 2', bugType: 'Type 2', currentStatus: 'Closed', assignee: 'User B' },
                { bugName: 'Bug 3', bugType: 'Type 3', currentStatus: 'Open', assignee: 'User C' },
                // More bug objects...
            ];

            setBugs(data);
            setTotalPages(5); // Assuming there are 5 pages in total
        } catch (error) {
            console.error('Error fetching bugs:', error);
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
            <h2>View Bugs</h2>
            <div>
                {bugs.map((bug, index) => (
                    <div key={index}>
                        <p>Bug Name: {bug.bugName}</p>
                        <p>Bug Type: {bug.bugType}</p>
                        <p>Current Status: {bug.currentStatus}</p>
                        <p>Assignee: {bug.assignee}</p>
                        <button>Change Assignee</button>
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

export default ViewBugs;
