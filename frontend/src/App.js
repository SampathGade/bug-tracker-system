import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import InvalidCredentials from './components/Login/InvalidCredentials';
import OTPComponent from './components/Login/OTPValidator';
import SignUpPage from './components/SignUp/Singup';
import SuccessfulSignUp from './components/SignUp/SuccessfulSignUp';
import Dashboard from './components/Dashboards/Dashboard';
import OnboardPage from './components/Dashboards/OnBoarding/Onboard';
import ReviewRequest from './components/Dashboards/OnBoarding/ReviewRequest';
import OnboardPerson from './components/Dashboards/OnBoarding/NewOnboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invalid-credentials" element={<InvalidCredentials />} />
        <Route path="/otp-validation" element={<OTPComponent />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/succesfulSignUp" element={<SuccessfulSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboard" element={<OnboardPage />}/>
        <Route path="/reviewRequests" element={<ReviewRequest/>}/>
        <Route path="/onboardPerson" element={<OnboardPerson/>}/>
      </Routes>
    </Router>
  );
}

export default App;
