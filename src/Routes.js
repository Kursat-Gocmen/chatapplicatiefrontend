import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; 
import Register from './components/Register'; 
import Profile from './components/Profile';
import UserBoard from './components/UserBoard'; 
import AdminBoard from './components/AdminBoard'; 
import AuthService from './services/auth.service'; // Replace with the actual path

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
      setCurrentUser(AuthService.getCurrentUser());
    };

    checkAuthentication();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {isAuthenticated && currentUser && (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/public-chat" element={<UserBoard />} />
          {currentUser.role === 'ADMIN' && (
            <Route path="/admin" element={<AdminBoard />} />
          )}
          {/* Redirect to login if not authenticated */}
          {!isAuthenticated && <Navigate to="/login" />}
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
