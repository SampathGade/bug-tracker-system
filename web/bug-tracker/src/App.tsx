import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/login/login';
import DashBoardComponent from './components/Dashboard/DashBoardComponent';
import IncidentForm from './components/forms/IncidentForm';
import ProjectForm from './components/forms/ProjectForm';
import ManageIncident from './components/forms/ManageIncidents';

function App() {
    const [userName, setUserName] = useState<string>('');

    const handleLogin = (username: string) => {
        setUserName(username);
    };

    return (
        <div>
            <Router>
                <Routes>
                    {/* Pass userName as a prop to DashBoardComponent */}
                    <Route path="/home" element={<DashBoardComponent userName={userName} />} />
                    {/* Pass handleLogin function as a prop to LoginComponent */}
                    <Route path="/" element={<LoginComponent onLogin={handleLogin} />} />
                    <Route path="/incident" element={<IncidentForm/>} />
                    <Route path='/project' element={<ProjectForm/>} />
                    <Route path="/manage" element={<ManageIncident/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
