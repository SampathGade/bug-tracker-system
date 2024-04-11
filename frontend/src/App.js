import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import InvalidCredentials from './components/Login/InvalidCredentials';
import OTPComponent from './components/Login/OTPValidator';
// import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invalid-credentials" element={<InvalidCredentials />} />
        <Route path="/otp-validation" element={<OTPComponent />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
