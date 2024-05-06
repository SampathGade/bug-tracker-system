import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

// Import sub-components
import BugComponent from "./ViewBug/ViewBug";
import OnboardingComponent from "./OnBoarding/OnboardingComponent";
import ViewPeopleComponent from "./ViewUsers/ViewPeopleComponent";
import ProjectComponent from "./ViewProjects/ViewProjectComponent";

const Dashboard = () => {
  const navigate = useNavigate();

  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") || "bugs"
  );
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!localStorage.getItem("userEmail")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getUserInitials = () => {
    return `YS`;
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

  return (
    <div className="dashboard">
      <nav>
        <ul>
          <li
            className={` cls-c-p ${
              activeComponent === "bugs" ? "selected" : ""
            }`}
            onClick={() => setActiveComponent("bugs")}
          >
            Bugs
          </li>
          {["admin"].includes(userRole) && (
            <li
              className={` cls-c-p ${
                activeComponent === "onboarding" ? "selected" : ""
              }`}
              onClick={() => setActiveComponent("onboarding")}
            >
              Onboarding
            </li>
          )}
          {["admin", "projectManager"].includes(userRole) && (
            <li
              className={` cls-c-p ${
                activeComponent === "people" ? "selected" : ""
              }`}
              onClick={() => setActiveComponent("people")}
            >
              View People
            </li>
          )}
          <li
            className={` cls-c-p ${
              activeComponent === "projects" ? "selected" : ""
            }`}
            onClick={() => setActiveComponent("projects")}
          >
            Projects
          </li>
          <li
            className="profile-icon"
            onClick={() => setActiveComponent("profile")}
          >
            <span className="user-initial">{getUserInitials()}</span>
            <div className="dropdown-content">
              <a href="#logout" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div className="content-block">{renderComponent()}</div>
    </div>
  );
};

export default Dashboard;
