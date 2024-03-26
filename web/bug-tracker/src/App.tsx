import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/login/login';
import DashBoardComponent from './components/Dashboard/DashBoardComponent';

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
                </Routes>
            </Router>
        </div>
    );
}

export default App;
