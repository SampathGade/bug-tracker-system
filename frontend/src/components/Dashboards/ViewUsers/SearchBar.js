import React, { useState } from 'react';

const SearchBar = ({ people, onSelectPerson }) => { //new
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPeople, setFilteredPeople] = useState([]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.length > 0) {
            const filtered = people.filter(person => person.email.toLowerCase().includes(term.toLowerCase()));
            setFilteredPeople(filtered);
        } else {
            setFilteredPeople([]);
        }
    };

    const handleSelect = (email) => {
        const person = people.find(person => person.email === email);
        onSelectPerson(person);
        setSearchTerm('');
        setFilteredPeople([]);
    };

    return (
        <div className="search-bar"> {/*new*/}
            <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {filteredPeople.length > 0 && (
                <ul className="dropdown"> {/*new*/}
                    {filteredPeople.map(person => (
                        <li key={person.email} onClick={() => handleSelect(person.email)}>
                            {person.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
