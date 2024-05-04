import React from 'react';

const PersonCell = ({ person, onSelectPerson }) => {
    return (
        <div className="person-cell" onClick={() => onSelectPerson(person)}>
            <p>Email: {person.email}</p>
            <p>Role: {person.role}</p>
            <p>Project Manager: {person.projectManager}</p>
        </div>
    );
};

export default PersonCell;
