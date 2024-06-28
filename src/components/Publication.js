import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/Api_services';

const Publication = () => {
	const [publications, setPublications] = useState([]);
	const [enableForm, setEnableForm] = useState(false);
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
		<div className="container">
			<h1 className="text-center mt-5">Publications</h1>

			<div className="text-center mt-3 mb-5">
				<button className="btn btn-primary" onClick={() => setEnableForm(!enableForm)}>Ajouter une publication</button>
			</div>

			{error && <p style={{ color: 'red' }}>{error}</p>}
			{enableForm ? (
				<form onSubmit={(e) => { e.preventDefault(); createPublication(); }}>
					<div className="mb-3">
						<input
							className="form-control"
							type="text"
							placeholder="Titre"
							value={newPublication.titre}
							onChange={(e) => setNewPublication({ ...newPublication, titre: e.target.value })}
						/>
					</div>
					<div className="mb-3">
						<textarea
							className="form-control"
							placeholder="Résumé"
							value={newPublication.resume}
							onChange={(e) => setNewPublication({ ...newPublication, resume: e.target.value })}
						/>
					</div>
					<div className="mb-3">
						<select
							className="form-select"
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
					</div>
					<div className="mb-3">
						<input
							className="form-control"
							type="date"
							placeholder="Date de publication"
							value={newPublication.date_publication}
							onChange={(e) => setNewPublication({ ...newPublication, date_publication: e.target.value })}
						/>
					</div>
					<button className="btn btn-success" type="submit">Ajouter</button>
				</form>
			) : ''}

			{/* FORMULAIRE DE FILTRE */}
			<div>
				<div className="mb-3">
					<input
						className="form-control"
						type="text"
						placeholder="Titre"
						value={filtres.titre}
						onChange={(e) => setFiltres({ ...filtres, titre: e.target.value })}
					/>
				</div>
				<div className="mb-3">
					<select
						className="form-select"
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
				</div>
				<div className="mb-3">
					<input
						className="form-control"
						type="date"
						placeholder="Date de publication"
						value={filtres.date_publication}
						onChange={(e) => setFiltres({ ...filtres, date_publication: e.target.value })}
					/>
				</div>
			</div>


			{/* AFFICHAGE DES DONNEES */}
			<table className="table table-bordered">
				<thead>
					<tr>
						<th scope="col" className="text-center">Id</th>
						<th scope="col">Titre</th>
						<th scope="col">Résumé</th>
						<th scope="col">Date de publication</th>
						<th scope="col" className="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{publications.length > 0 && publications.map((publication) => (
						<tr key={publication.id}>
							<th scope="row" className="text-center">{publication.id}</th>
							<td>{publication.titre}</td>
							<td>{publication.resume}</td>
							<td>{publication.date_publication}</td>
							<th className="text-center">
								<button data-bs-toggle="modal" data-bs-target="#editPublication" className="btn btn-secondary" onClick={() => setSelectedPublication(publication)}>Modifier</button>
								<button className="btn btn-danger ms-3" onClick={() => deletePublication(publication.id)}>Supprimer</button>
							</th>
						</tr>
					))}
				</tbody>
			</table>


			<div class="modal fade" id="editPublication" tabIndex="-1" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="exampleModalLabel">Modifier une publication</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							{selectedPublication !== null ? (
								<form onSubmit={(e) => { e.preventDefault(); updatePublication(); }}>
									<div className="mb-3">
										<input
											className="form-control"
											type="text"
											placeholder="Titre"
											value={selectedPublication.titre}
											onChange={(e) => setSelectedPublication({ ...selectedPublication, titre: e.target.value })}
										/>
									</div>
									<div className="mb-3">
										<textarea
											className="form-control"
											placeholder="Résumé"
											value={selectedPublication.resume}
											onChange={(e) => setSelectedPublication({ ...selectedPublication, resume: e.target.value })}
										/>
									</div>
									<div className="mb-3">
										<select
											className="form-select"
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
									</div>
									<div className="mb-3">
										<input
											className="form-control"
											type="date"
											placeholder="Date de publication"
											value={selectedPublication.date_publication}
											onChange={(e) => setSelectedPublication({ ...selectedPublication, date_publication: e.target.value })}
										/>
									</div>
									<div class="modal-footer">
										<button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Modifier</button>
									</div>
								</form>
							) : ''}

						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default Publication;