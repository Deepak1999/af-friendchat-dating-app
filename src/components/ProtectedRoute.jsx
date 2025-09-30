import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        localStorage.clear();
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;