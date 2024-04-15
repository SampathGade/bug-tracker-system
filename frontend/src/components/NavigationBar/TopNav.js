import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './TopNav.css'; // This will be your CSS file for styling the navigation bar

const TopNav = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate(); // useNavigate hook to handle navigation

    useEffect(() => {
        // Function to close dropdown if clicking outside of it
        const closeDropdown = (event) => {
            if (!event.target.closest('.user-profile')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', closeDropdown);
        return () => document.removeEventListener('mousedown', closeDropdown);
    }, []);

    const logout = () => {
        localStorage.removeItem('user'); // Remove the user data from local storage
        navigate('/login'); // Navigate to login route
    };

    return (
        <nav className="topnav">
            <div className="topnav-content">
                <div className="logo">
                    <a href="/">Your Logo</a>
                </div>
                <div className="menu">
                    {/* Navigation links go here */}
                </div>
                <div className="user-profile">
                    <button onClick={() => setShowDropdown(!showDropdown)}>SZ</button> {/* User Initials */}
                    {showDropdown && (
                        <div className="dropdown">
                            <ul>
                                <li><a href="#profile">Profile</a></li>
                                <li><button onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
