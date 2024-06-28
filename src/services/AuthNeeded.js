import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthNeeded = ({ children }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('access_token');
        return token !== null;
    };

    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default AuthNeeded;