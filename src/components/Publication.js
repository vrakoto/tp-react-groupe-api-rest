import React, { useState, useEffect, useCallback } from 'react';
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
	const [filtres, setFiltres] = useState({
		titre: '',
		projet_associe: '',
		date_publication: ''
	});
	const [selectedPublication, setSelectedPublication] = useState(null);
	const [error, setError] = useState('');


	const fetchPublications = useCallback(async () => {
		try {
			const response = await api.get('/publications/', { params: filtres });
			setPublications(response.data);
		} catch (error) {
			console.error('Erreur lors de la récupération des publications', error);
		}
	}, [filtres]);

	const fetchProjets = useCallback(async () => {
		try {
			const response = await api.get('/projets/');
			setProjets(response.data);
		} catch (error) {
			console.error('Erreur lors de la récupération des projets', error);
		}
	}, []);

	useEffect(() => {
		fetchPublications();
		fetchProjets();
	}, [fetchPublications, fetchProjets]);



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

	const updatePublication = async () => {
		try {
			await api.put(`/publications/${selectedPublication.id}/`, selectedPublication);
			setSelectedPublication(null);
			setError('');
			fetchPublications();
		} catch (error) {
			console.error('Erreur lors de la modification de la publication', error);
			setError('Erreur lors de la modification de la publication');
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

			{/* FORMULAIRE DE FILTRE */}
			<div>
				<h2>Filtres</h2>
				<input
					type="text"
					placeholder="Titre"
					value={filtres.titre}
					onChange={(e) => setFiltres({ ...filtres, titre: e.target.value })}
				/>
				<select
					value={filtres.projet_associe}
					onChange={(e) => setFiltres({ ...filtres, projet_associe: e.target.value })}
				>
					<option value="">Tous les projets</option>
					{projets.map((projet) => (
						<option key={projet.id} value={projet.id}>
							{projet.titre}
						</option>
					))}
				</select>
				<input
					type="date"
					placeholder="Date de publication"
					value={filtres.date_publication}
					onChange={(e) => setFiltres({ ...filtres, date_publication: e.target.value })}
				/>
			</div>

			
			{/* AFFICHAGE DES DONNEES */}
			<ul>
				{publications.length > 0 && publications.map((publication) => (
					<li key={publication.id}>
						{publication.titre} - {publication.resume}
						<button onClick={() => setSelectedPublication(publication)}>Modifier</button>
						<button onClick={() => deletePublication(publication.id)}>Supprimer</button>
					</li>
				))}
			</ul>


			<h2>Ajouter une Publication</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{projets && projets.length > 0 ? (
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
			) : "Impossible d'ajouter une publication car aucun projet n'a été créé"}


			{/* Modification d'une PUBLICATION */}
			{selectedPublication && (
				<div>
					<h2>Modifier une Publication</h2>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<form onSubmit={(e) => { e.preventDefault(); updatePublication(); }}>
						<input
							type="text"
							placeholder="Titre"
							value={selectedPublication.titre}
							onChange={(e) => setSelectedPublication({ ...selectedPublication, titre: e.target.value })}
						/>
						<textarea
							placeholder="Résumé"
							value={selectedPublication.resume}
							onChange={(e) => setSelectedPublication({ ...selectedPublication, resume: e.target.value })}
						/>
						<select
							value={selectedPublication.projet_associe}
							onChange={(e) => setSelectedPublication({ ...selectedPublication, projet_associe: e.target.value })}
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
							value={selectedPublication.date_publication}
							onChange={(e) => setSelectedPublication({ ...selectedPublication, date_publication: e.target.value })}
						/>
						<button type="submit">Modifier</button>
						<button onClick={() => setSelectedPublication(null)}>Annuler</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Publication;