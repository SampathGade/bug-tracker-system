import React from "react";
import Select from "react-select";

const SearchBar = ({ people, onSelectPerson }) => {
  const formattedPeople = people?.map((item) => ({
    label: item?.email,
    value: item?.email,
    ...item,
  }));

  const handleSelect = (email) => {
    const person = people.find((person) => person.email === email);
    onSelectPerson(person);
  };

  return (
    <div className="search-bar">
      <Select
        options={formattedPeople ?? []}
        onChange={(option) => handleSelect(option.email)}
        placeholder="Search by email..."
        isSearchable
        className="bug-selection"
        styles={{
          borderRadius: "30px",
        }}
      />
    </div>
  );
};

export default SearchBar;
