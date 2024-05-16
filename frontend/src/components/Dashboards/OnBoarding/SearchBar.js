import React, { useState } from 'react';

const SearchBar = ({ users, onSelectUser }) => { //new
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.length > 0) {
            const filtered = users.filter(user => user.email.toLowerCase().includes(term.toLowerCase()));
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    };

    const handleSelect = (email) => {
        const user = users.find(user => user.email === email);
        onSelectUser(user);
        setSearchTerm('');
        setFilteredUsers([]);
    };

    return (
        <div className="search-bar"> {/*new*/}
            <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {filteredUsers.length > 0 && (
                <ul className="dropdown"> {/*new*/}
                    {filteredUsers.map(user => (
                        <li key={user.email} onClick={() => handleSelect(user.email)}>
                            {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
