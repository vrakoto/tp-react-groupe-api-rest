import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/chercheurs">Chercheurs</Link></li>
                <li><Link to="/projets">Projets</Link></li>
                <li><Link to="/publications">Publications</Link></li>
            </ul>
        </nav>
    );
};

export default Header;