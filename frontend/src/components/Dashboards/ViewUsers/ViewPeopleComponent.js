import React, { useState, useEffect } from "react";
import PersonCell from "./PersonCell";
import EditPersonOverlay from "./EditPersonOverlay";
import "./ViewPeopleComponent.css"; // Import the CSS for styling
import ResponsiveAppBar from "../AppBar";
import { Grid } from "@mui/material";
import LeftPanel from "../LeftPanel";
import Container from "../../Container";

const ViewPeopleComponent = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage] = useState(5);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");

    const fetchPeople = async () => {
      const response = await fetch("http://localhost:8080/users/getDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, role: userRole }),
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

  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <div className="people-container">
        {currentPeople.map((person) => (
          <PersonCell
            key={person.email}
            person={person}
            onSelectPerson={handleSelectPerson}
          />
        ))}
        {selectedPerson && (
          <EditPersonOverlay
            person={selectedPerson}
            onClose={handleCloseOverlay}
          />
        )}
        <div className="pagination">
          {[...Array(Math.ceil(people.length / peoplePerPage)).keys()].map(
            (number) => (
              <button key={number + 1} onClick={() => paginate(number + 1)}>
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
    </Container>
  );
};

export default ViewPeopleComponent;
