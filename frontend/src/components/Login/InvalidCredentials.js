import React from 'react';
import { Link } from 'react-router-dom';

const InvalidCredentials = () => {
  return (
    <div>
      <h2>Invalid Credentials</h2>
      <p>Please check your email and password.</p>
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default InvalidCredentials;