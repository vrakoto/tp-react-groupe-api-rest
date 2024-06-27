import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api/';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const history = useNavigate();

	// Exemple de stockage du token après authentification
	const handleLogin = async (credentials) => {
		try {
			const response = await axios.post('http://localhost:8000/api/token/', credentials);
			localStorage.setItem('access_token', response.data.access);
			localStorage.setItem('refresh_token', response.data.refresh);
			// Redirigez l'utilisateur vers la page souhaitée
		} catch (error) {
			console.error('Erreur de connexion', error);
		}
	};


	return (
		<div>
			<h2>Connexion</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Nom d'utilisateur:</label>
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					<label>Mot de passe:</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button type="submit">Se connecter</button>
			</form>
		</div>
	);
};

export default Login;