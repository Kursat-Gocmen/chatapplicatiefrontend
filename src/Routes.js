import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'; 
import Register from './components/Register'; 
import Profile from './components/Profile';
import UserBoard from './components/UserBoard'; 
import AdminBoard from './components/AdminBoard'; 

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
    };

    checkAuthentication();
  }, []); 

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {isAuthenticated && (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/public-chat" element={<UserBoard />} />
          <Route path="/admin" element={<AdminBoard />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
