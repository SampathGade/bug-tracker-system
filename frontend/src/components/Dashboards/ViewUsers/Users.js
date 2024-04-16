import React, { useState, useEffect } from 'react';
import UserCell from './UserCell';
import UserDetailPopup from './UserDetailPopup';
import '../OnBoarding/PendingRequests.css';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reload, setReload] = useState(false);  // Trigger for reloading data

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem('user'));

    const fetchUsers = async () => {
        const payload = {
            role: loginUser.role,
            email: loginUser.email
          };
      const response = await fetch('http://localhost:8080/users/getDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    };

    fetchUsers();
    setReload(false);  // Reset reload trigger after data is fetched
  }, [reload]);  // Dependency on reload state

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  const triggerReload = () => {
    setReload(true);  // Set reload to true to trigger useEffect
  };

  return (
    <div className="content-container" onClick={closePopup}>
      {users.length > 0 ? (
        users.map(user => (
          <UserCell key={user.id} user={user} onSelect={handleUserSelect} />
        ))
      ) : (
        <div className="no-data">No pending requests</div>
      )}

      {selectedUser && (
        <div className="overlay">
          <UserDetailPopup user={selectedUser} onClose={closePopup} onReload={triggerReload} />
        </div>
      )}
    </div>
  );
};

export default Users;
