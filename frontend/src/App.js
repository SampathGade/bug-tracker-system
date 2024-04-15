import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUpPage from './components/SignUp/Singup';
import SuccessfulSignUp from './components/SignUp/SuccessfulSignUp';
import Dashboard from './components/Dashboards/Dashboard';
import OnboardPage from './components/Dashboards/OnBoarding/Onboard';
import ReviewRequest from './components/Dashboards/OnBoarding/ReviewRequest';
import OnboardPerson from './components/Dashboards/OnBoarding/NewOnboard';
import CreateProject from './components/Dashboards/CreateProject/CreateProject';
import CreateBug from './components/Dashboards/CreateBug/CreateBug';
import ViewBugs from './components/Dashboards/ViewBug/ViewBug';
import ViewProjects from './components/Dashboards/ViewProjects/ViewProjects';
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/succesfulSignUp" element={<SuccessfulSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboard" element={<OnboardPage />}/>
        <Route path="/reviewRequests" element={<ReviewRequest/>}/>
        <Route path="/onboardPerson" element={<OnboardPerson/>}/>
        <Route path="/createProject" element={<CreateProject/>}/>
        <Route path="/createBug" element={<CreateBug/>}/>
        <Route path="/viewBug" element={<ViewBugs/>}/>
        <Route path="/viewProjects" element={<ViewProjects/>}/>
      </Routes>
    </Router>
  );
}

export default App;
