import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/login/login'
import DashBoardComponent from './components/Dashboard/DashBoardComponent'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={LoginComponent} />
          <Route path="/home" Component={DashBoardComponent} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
