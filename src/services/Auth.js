import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null);

    const loginUser = async (username, password) => {
        const response = await axios.post('http://localhost:8000/api/token/', {
            username,
            password
        });
        if (response.data.access) {
            setAuthTokens(response.data);
            localStorage.setItem('tokens', JSON.stringify(response.data));
            return true;
        } else {
            return false;
        }
    };

    const refreshToken = async () => {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: authTokens.refresh
        });
        setAuthTokens(response.data);
        localStorage.setItem('tokens', JSON.stringify(response.data));
    };

    const logoutUser = () => {
        setAuthTokens(null);
        localStorage.removeItem('tokens');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (authTokens) {
                refreshToken();
            }
        }, 4 * 60 * 1000); // Refresh token every 4 minutes
        return () => clearInterval(interval);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={{ authTokens, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;