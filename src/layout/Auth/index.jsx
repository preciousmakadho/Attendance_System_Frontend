// layout/Auth.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Dashboard/Drawer/DrawerContent/Navigation'; // Import your navigation component

const AuthLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Navigation /> {/* Render the navigation component */}
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet /> {/* This is where the routed components render */}
      </div>
    </div>
  );
};

export default AuthLayout;