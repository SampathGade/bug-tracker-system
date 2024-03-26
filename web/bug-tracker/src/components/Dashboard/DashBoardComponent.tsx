import React, { useState, useEffect } from 'react';
import './DashBoardComponent.css';
import axios from 'axios';

interface User {
    id: string;
    username: string;
    email: string;
    projects: { id: string; name: string }[];
    ticketsWorkingOn: { id: string; title: string }[];
}

interface Props {
    userName: string;
}

const DashBoardComponent: React.FC<Props> = ({ userName }) => {
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get<User>(`http://localhost:8080/api/user/${userName}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userName]);

    return (
        <div>
            <h1>Dashboard</h1>
            {loading && <p>Loading...</p>}
            {!loading && userData ? (
                <div>
                    <h2>Welcome, {userData.username}!</h2>
                    <p>Email: {userData.email}</p>
                    <h3>Projects:</h3>
                    <ul>
                        {userData.projects.map(project => (
                            <li key={project.id}>{project.name}</li>
                        ))}
                    </ul>
                    <h3>Tickets Working On:</h3>
                    <ul>
                        {userData.ticketsWorkingOn.map(ticket => (
                            <li key={ticket.id}>{ticket.title}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default DashBoardComponent;
