import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUpPage from "./components/SignUp/Singup";
import SuccessfulSignUp from "./components/SignUp/SuccessfulSignUp";
import Dashboard from "./components/Dashboards/Dashboard";
import ViewBugs from "./components/Dashboards/ViewBug/ViewBug";
import ForgotPassword from "./components/Login/ForgetPassword";
import "./App.css";
import BugComponent from "./components/Dashboards/ViewBug/ViewBug";
import OnboardingComponent from "./components/Dashboards/OnBoarding/OnboardingComponent";
import ViewPeopleComponent from "./components/Dashboards/ViewUsers/ViewPeopleComponent";
import ProjectComponent from "./components/Dashboards/ViewProjects/ViewProjectComponent";
import CreateBug from "./components/Dashboards/CreateBug";
import MetricsDashboard from "./components/Dashboards/MetricsDashboard";

function App() {
  return (
    <div
      style={{
        height: "100vh",
      }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/succesfulSignUp" element={<SuccessfulSignUp />} />
          <Route path="/dashboard" element={<MetricsDashboard />} />
          <Route path="/bugs" element={<Dashboard />} />
          <Route path="/create-bug" element={<CreateBug />} />
          <Route path="/my-projects" element={<ProjectComponent />} />
          <Route path="/onboarding" element={<OnboardingComponent />} />
          <Route path="/my-team" element={<ViewPeopleComponent />} />
          <Route path="/viewBug" element={<ViewBugs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
