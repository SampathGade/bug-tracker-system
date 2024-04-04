import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoardComponent.css';
import Navbar from '../../Navbar';
import BasicTable from '../BasicTable/BasicTable';
import Projtable from '../BasicTable/Projectstable';

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
        <Navbar userName= {userName}/>
        <br/>
        <BasicTable userName = {userName}/>
        <br/>
        <Projtable userName = {userName}/>
        </div>
    );
};

export default DashBoardComponent;
