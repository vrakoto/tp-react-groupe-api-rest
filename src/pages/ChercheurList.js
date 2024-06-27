import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chercheur from '../components/Chercheur';

const API_URL = 'http://localhost:8000/api/';

const ChercheurList = () => {
	const [chercheurs, setChercheurs] = useState([]);

	useEffect(() => {
		fetchChercheurs();
	}, []);

	const fetchChercheurs = async () => {
		try {
			const response = await axios.get(`${API_URL}chercheurs/`);
			setChercheurs(response.data);
		} catch (error) {
			console.error('Erreur lors de la récupération des chercheurs:', error);
		}
	};

	return (
		<div>
			<h2>Liste des chercheurs</h2>
			{chercheurs.map((chercheur) => (
				<Chercheur key={chercheur.id} chercheur={chercheur} />
			))}
		</div>
	);
};

export default ChercheurList;