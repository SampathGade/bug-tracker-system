import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoardComponent.css';
import Navbar from '../../Navbar';
import BasicTable from '../BasicTable/BasicTable';

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

    // Inside the return statement of DashBoardComponent

    return (
        <div>
        <Navbar/>
        <br/>
        <BasicTable/>
        <div className="container">
            <div className="navbar">
                <h1>Dashboard</h1>
            </div>
            {loading && <p>Loading...</p>}
            {!loading && userData ? (
                <div>
                    <div className="profile">

                        <div className="profile-name">Welcome, {userData.username}!</div>
                    </div>
                    <div className="table-container">
                        <h3>Projects:</h3>
                        {userData.projects.length > 0 ? (
                            <table className="table">
                                {/* Table content for projects */}
                            </table>
                        ) : (
                            <p>Currently no projects assigned to you.</p>
                        )}
                        <h3>Tickets Working On:</h3>
                        {userData.ticketsWorkingOn.length > 0 ? (
                            <table className="table">
                                {/* Table content for tickets */}
                            </table>
                        ) : (
                            <p>Currently no tickets assigned to you.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div></div>
    );
};

export default DashBoardComponent;
