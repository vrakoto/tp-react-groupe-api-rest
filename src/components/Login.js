import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api/';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}token/`, { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            history('/chercheurs');
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5 text-center">Connexion</h2>
            <form onSubmit={handleLogin}>
                <div class="mb-3">
                    <label htmlFor="identifiant" class="form-label">Identifiant</label>
                    <input type="text" id="identifiant" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label htmlFor="mdp" class="form-label">Mot de passe</label>
                    <input type="password" id="mdp" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;