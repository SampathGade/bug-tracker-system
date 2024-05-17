import React from "react";
import Select from "react-select";

const SearchBar = ({ items, onSelectItem }) => {
  const formattedPeople = items?.map((item) => ({
    label: item?.name,
    value: item?.name,
    ...item,
  }));

  const handleSelect = (name) => {
    const person = items.find((person) => person.name === name);
    onSelectItem(person);
  };
  return (
    <div className="search-bar">
      <Select
        options={formattedPeople ?? []}
        onChange={(option) => handleSelect(option.name)}
        placeholder="Search by project name..."
        isSearchable
        className="bug-selection"
      />
    </div>
  );
};

export default SearchBar;
