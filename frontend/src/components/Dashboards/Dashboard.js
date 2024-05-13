import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

// Import sub-components
import BugComponent from "./ViewBug/ViewBug";
import OnboardingComponent from "./OnBoarding/OnboardingComponent";
import ViewPeopleComponent from "./ViewUsers/ViewPeopleComponent";
import ProjectComponent from "./ViewProjects/ViewProjectComponent";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(localStorage.getItem("activeComponent") || "bugs");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);  // Reference to the dropdown for click outside logic
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!localStorage.getItem("userEmail")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  // Event listener for clicking outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getUserInitials = () => {
    const email = localStorage.getItem("userEmail") || "";
    return email.substr(0, 2).toUpperCase();
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "bugs":
        return <BugComponent />;
      case "onboarding":
        return <OnboardingComponent />;
      case "people":
        return <ViewPeopleComponent />;
      case "projects":
        return <ProjectComponent />;
      default:
        return <BugComponent />;
    }
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  return (
    <div className="dashboard">
      <nav>
        <ul>
          <li className={`cls-c-p ${activeComponent === "bugs" ? "selected" : ""}`} onClick={() => setActiveComponent("bugs")}>
            Bugs
          </li>
          {["admin"].includes(userRole) && (
            <li className={`cls-c-p ${activeComponent === "onboarding" ? "selected" : ""}`} onClick={() => setActiveComponent("onboarding")}>
              Onboarding
            </li>
          )}
          {["admin", "projectManager"].includes(userRole) && (
            <li className={`cls-c-p ${activeComponent === "people" ? "selected" : ""}`} onClick={() => setActiveComponent("people")}>
              View People
            </li>
          )}
          <li className={`cls-c-p ${activeComponent === "projects" ? "selected" : ""}`} onClick={() => setActiveComponent("projects")}>
            Projects
          </li>
          <li className="profile-icon" onClick={toggleDropdown}>
            <span className="user-initial">{getUserInitials()}</span>
            {dropdownVisible && (
              <div className="dropdown-content" ref={dropdownRef}>
                <a href="#logout" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div className="content-block">{renderComponent()}</div>
    </div>
  );
};

export default Dashboard;
