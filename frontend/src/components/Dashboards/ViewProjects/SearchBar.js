import React, { useState } from 'react';

const SearchBar = ({ items, onSelectItem }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.length > 0) {
            const filtered = items.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));
            setFilteredItems(filtered);
        } else {
            setFilteredItems([]);
        }
    };

    const handleSelect = (name) => {
        const item = items.find(item => item.name === name);
        onSelectItem(item);
        setSearchTerm('');
        setFilteredItems([]);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by project name..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {filteredItems.length > 0 && (
                <ul className="dropdown"> 
                    {filteredItems.map(item => (
                        <li key={item.id} onClick={() => handleSelect(item.name)}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
