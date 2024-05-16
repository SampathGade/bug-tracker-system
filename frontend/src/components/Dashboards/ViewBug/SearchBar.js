import React, { useState } from 'react';

const SearchBar = ({ bugs, onSelectBug }) => { //new
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBugs, setFilteredBugs] = useState([]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.length > 0) {
            const filtered = bugs.filter(bug => bug.name.toLowerCase().includes(term.toLowerCase()));
            setFilteredBugs(filtered);
        } else {
            setFilteredBugs([]);
        }
    };

    const handleSelect = (id) => {
        const bug = bugs.find(bug => bug.id === id);
        onSelectBug(bug);
        setSearchTerm('');
        setFilteredBugs([]);
    };

    return (
        <div className="search-bar"> {/*new*/}
            <input
                type="text"
                placeholder="Search by bug name..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {filteredBugs.length > 0 && (
                <ul className="dropdown"> {/*new*/}
                    {filteredBugs.map(bug => (
                        <li key={bug.id} onClick={() => handleSelect(bug.id)}>
                            {bug.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
