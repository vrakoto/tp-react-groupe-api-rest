import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../services/Logout';
import './css/Header.css';

const Header = () => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('access_token');
        return token !== null;
    };


    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Projet</a>
                <div className="collapse navbar-collapse justify-content-center">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/chercheurs" className="nav-link active">Chercheurs</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/projets" className="nav-link">Projets</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/publications" className="nav-link">Publications</Link>
                        </li>
                    </ul>
                </div>
                {isAuthenticated ? (
                    <div className="d-flex">
                        <Logout />
                    </div>
                ) : ''}
            </div>
        </nav>
    );
};

export default Header;