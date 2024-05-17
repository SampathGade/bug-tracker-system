import React, { useState, useEffect } from "react";
import PersonCell from "./PersonCell";
import EditPersonOverlay from "./EditPersonOverlay";
import "./ViewPeopleComponent.css"; // Import the CSS for styling
import Container from "../../Container";
import SearchBar from "./SearchBar";
import { rolesList } from "../../../utils/constants";

const ViewPeopleComponent = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage] = useState(6);
  const role = localStorage.getItem("userRole");
  const isAdmin = role === rolesList.admin;
  const isManager = role === rolesList.projectManager;

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
    if (isAdmin || isManager) {
      setSelectedPerson(person);
    }
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
      <SearchBar people={people} onSelectPerson={handleSelectPerson} />
      <div
        className="people-container"
        style={{
          marginTop: "30px",
          justifyContent: "space-between",
        }}>
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
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                style={{
                  backgroundColor:
                    currentPage === number + 1 ? "#1976d2" : "lightgrey",
                  boxShadow: "none",
                }}>
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
