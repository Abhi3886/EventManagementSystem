import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to retrieve a specific cookie
const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const userId = getCookie('userId');
  const userRole = getCookie('userRole');

  if (!userId || allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }



  return children;
};

export default PrivateRoute;
