import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        history('/login');
    };

    return (
        <button onClick={handleLogout}>
            Déconnexion
        </button>
    );
};

export default Logout;