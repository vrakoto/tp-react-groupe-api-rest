import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../services/Logout';

const Header = () => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('access_token');
        return token !== null;
    };
    
    return (
        <nav>
            <ul>
                <li><Link to="/chercheurs">Chercheurs</Link></li>
                <li><Link to="/projets">Projets</Link></li>
                <li><Link to="/publications">Publications</Link></li>
            </ul>
            {isAuthenticated() && <Logout />}
        </nav>
    );
};

export default Header;