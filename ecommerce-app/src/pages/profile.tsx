import React from 'react';
import { Navigate } from 'react-router-dom';


function Profile() {
//   if (!isAuthenticated) 
{
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome! This is your profile page.</p>
    </div>
  );
}

export default Profile;