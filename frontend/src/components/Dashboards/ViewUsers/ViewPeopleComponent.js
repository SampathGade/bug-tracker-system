import React, { useState, useEffect } from 'react';
import PersonCell from './PersonCell';
import EditPersonOverlay from './EditPersonOverlay';
import './ViewPeopleComponent.css'; // Import the CSS for styling

const ViewPeopleComponent = () => {
    const [people, setPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        // Retrieve user details from localStorage
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');

        const fetchPeople = async () => {
            const response = await fetch('http://localhost:8080/users/getDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail, role: userRole }) // Include current user's email and role
            });
            if (response.ok) {
                const data = await response.json();
                setPeople(data);
            }
        };
        fetchPeople();
    }, []);

    const handleSelectPerson = (person) => {
        setSelectedPerson(person);
    };

    const handleCloseOverlay = () => {
        setSelectedPerson(null);
    };

    return (
        <div className="people-container">
            {people.map(person => (
                <PersonCell key={person.email} person={person} onSelectPerson={handleSelectPerson} />
            ))}
            {selectedPerson && <EditPersonOverlay person={selectedPerson} onClose={handleCloseOverlay} />}
        </div>
    );
};

export default ViewPeopleComponent;
