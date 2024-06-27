import React, { useState, useEffect } from 'react';
import api from '../services/Api_services';

const Publication = () => {
	const [publications, setPublications] = useState([]);
	const [projets, setProjets] = useState([]);
	const [newPublication, setNewPublication] = useState({
		titre: '',
		resume: '',
		projet_associe: '',
		date_publication: ''
	});
	const [error, setError] = useState('');

	useEffect(() => {
		fetchPublications();
		fetchProjets();
	}, []);

	const fetchPublications = async () => {
		try {
			const response = await api.get('/publications/');
			setPublications(response.data);
		} catch (error) {
			console.error('Erreur lors de la récupération des publications', error);
		}
	};

	const fetchProjets = async () => {
		try {
			const response = await api.get('/projets/');
			setProjets(response.data);
		} catch (error) {
			console.error('Erreur lors de la récupération des projets', error);
		}
	};

	const createPublication = async () => {
		try {
			await api.post('/publications/', newPublication);
			setNewPublication({
				titre: '',
				resume: '',
				projet_associe: '',
				date_publication: ''
			});
			setError('');
			fetchPublications();
		} catch (error) {
			console.error('Erreur lors de la création de la publication', error);
			setError('Erreur lors de la création de la publication');
		}
	};

	const deletePublication = async (id) => {
		try {
			await api.delete(`/publications/${id}/`);
			fetchPublications();
		} catch (error) {
			console.error('Erreur lors de la suppression de la publication', error);
			setError('Erreur lors de la suppression de la publication');
		}
	};

	return (
		<div>
			<h1>Publications</h1>
			<ul>
				{publications.map((publication) => (
					<li key={publication.id}>
						{publication.titre} - {publication.resume}
                        <button onClick={() => deletePublication(publication.id)}>Supprimer</button>
					</li>
				))}
			</ul>
			<h2>Ajouter une Publication</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<form onSubmit={(e) => { e.preventDefault(); createPublication(); }}>
				<input
					type="text"
					placeholder="Titre"
					value={newPublication.titre}
					onChange={(e) => setNewPublication({ ...newPublication, titre: e.target.value })}
				/>
				<textarea
					placeholder="Résumé"
					value={newPublication.resume}
					onChange={(e) => setNewPublication({ ...newPublication, resume: e.target.value })}
				/>
				<select
					value={newPublication.projet_associe}
					onChange={(e) => setNewPublication({ ...newPublication, projet_associe: e.target.value })}
				>
					<option value="">Sélectionner un projet associé</option>
					{projets.map((projet) => (
						<option key={projet.id} value={projet.id}>
							{projet.titre}
						</option>
					))}
				</select>
				<input
					type="date"
					placeholder="Date de publication"
					value={newPublication.date_publication}
					onChange={(e) => setNewPublication({ ...newPublication, date_publication: e.target.value })}
				/>
				<button type="submit">Ajouter</button>
			</form>
		</div>
	);
};

export default Publication;