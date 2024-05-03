import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUpPage from './components/SignUp/Singup';
import SuccessfulSignUp from './components/SignUp/SuccessfulSignUp';
import Dashboard from './components/Dashboards/Dashboard';
import ViewBugs from './components/Dashboards/ViewBug/ViewBug';
import ViewProjects from './components/Dashboards/ViewProjects/ViewProjects';
import ForgotPassword from './components/Login/ForgetPassword';
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/succesfulSignUp" element={<SuccessfulSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/viewBug" element={<ViewBugs/>}/>
        <Route path="/viewProjects" element={<ViewProjects/>}/>
      </Routes>
    </Router>
  );
}

export default App;
