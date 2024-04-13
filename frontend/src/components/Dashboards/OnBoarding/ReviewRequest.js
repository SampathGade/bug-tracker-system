// ReviewRequest.js
import React, { useState, useEffect } from 'react';

const ReviewRequest = () => {
    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(1);

    const pageSize = 10; // Number of items per page

    // Fetch data from backend API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make API call to fetch requests for the current page
                // const response = await fetch(`YOUR_BACKEND_API_URL?page=${page}&pageSize=${pageSize}`);
                // const data = await response.json();

                // Simulated data
                const data = [
                    { email: 'example1@example.com' },
                    { email: 'example2@example.com' },
                    { email: 'example3@example.com' }
                ];

                setRequests(data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchData();
    }, [page]);

    const handleAccept = (email) => {
        // api call
        console.log('Accepted:', email);
    };

    const handleDelete = (email) => {
        // api call
        console.log('Deleted:', email);
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    return (
        <div>
            <h2>Review Requests</h2>
            {requests.map((request, index) => (
                <div key={index}>
                    <p>Email: {request.email}</p>
                    <button onClick={() => handleAccept(request.email)}>Accept</button>
                    <button onClick={() => handleDelete(request.email)}>Delete</button>
                </div>
            ))}

            <div>
                <button onClick={prevPage} disabled={page === 1}>Previous Page</button>
                <button onClick={nextPage}>Next Page</button>
            </div>
        </div>
    );
};

export default ReviewRequest;
