import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/Api_services';

const Projet = () => {
    const [projets, setProjets] = useState([]);
    const [enableForm, setEnableForm] = useState(false);
    const [chercheurs, setChercheurs] = useState([]);
    const [newProjet, setNewProjet] = useState({
        titre: '',
        description: '',
        date_debut: '',
        date_fin_prevue: '',
        chef_de_projet: '',
        chercheurs: []
    });
    const [filtres, setFiltres] = useState({
        titre: '',
        date_debut: '',
        date_fin_prevue: '',
        chef_de_projet: ''
    });
    const [selectedProjet, setSelectedProjet] = useState(null);
    const [error, setError] = useState('');

    const fetchProjets = useCallback(async () => {
        try {
            const response = await api.get('/projets/', { params: filtres });
            if (response.data) {
                setProjets(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des projets', error);
        }
    }, [filtres]);

    const fetchChercheurs = useCallback(async () => {
        try {
            const response = await api.get('/chercheurs/');
            if (response.data) {
                setChercheurs(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des chercheurs', error);
        }
    }, []);

    useEffect(() => {
        fetchProjets();
        fetchChercheurs();
    }, [fetchProjets, fetchChercheurs]);

    const createProjet = async () => {
        try {
            await api.post('/projets/', newProjet);
            setNewProjet({
                titre: '',
                description: '',
                date_debut: '',
                date_fin_prevue: '',
                chef_de_projet: '',
                chercheurs: []
            });
            setError('');
            fetchProjets();
        } catch (error) {
            console.error('Erreur lors de la création du projet', error);
            setError('Erreur lors de la création du projet');
        }
    };

    const updateProjet = async () => {
        try {
            await api.put(`/projets/${selectedProjet.id}/`, selectedProjet);
            setSelectedProjet(null);
            setError('');
            fetchProjets();
        } catch (error) {
            console.error('Erreur lors de la modification du projet', error);
            setError('Erreur lors de la modification du projet');
        }
    };

    const deleteProjet = async (id) => {
        try {
            await api.delete(`/projets/${id}/`);
            fetchProjets();
        } catch (error) {
            console.error('Erreur lors de la suppression du projet', error);
            setError('Erreur lors de la suppression du projet');
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Projets de Recherche</h1>

            <div className="text-center mt-3 mb-5">
                <button className="btn btn-primary" onClick={() => setEnableForm(!enableForm)}>Ajouter un projet</button>
            </div>


            {/* FORMULAIRE AJOUT PROJET */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {enableForm ? (
                <form onSubmit={(e) => { e.preventDefault(); createProjet(); }}>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Titre"
                            value={newProjet.titre}
                            onChange={(e) => setNewProjet({ ...newProjet, titre: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Description"
                            value={newProjet.description}
                            onChange={(e) => setNewProjet({ ...newProjet, description: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="date"
                            placeholder="Date de début"
                            value={newProjet.date_debut}
                            onChange={(e) => setNewProjet({ ...newProjet, date_debut: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="date"
                            placeholder="Date de fin prévue"
                            value={newProjet.date_fin_prevue}
                            onChange={(e) => setNewProjet({ ...newProjet, date_fin_prevue: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <select
                            className="form-select"
                            value={newProjet.chef_de_projet}
                            onChange={(e) => setNewProjet({ ...newProjet, chef_de_projet: e.target.value })}
                        >
                            <option value="">Sélectionner un chef de projet</option>
                            {chercheurs.map((chercheur) => (
                                <option key={chercheur.id} value={chercheur.id}>
                                    {chercheur.nom} {chercheur.prenom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <select
                            className="form-select"
                            multiple
                            onChange={(e) => {
                                const selectedChercheurs = Array.from(
                                    e.target.selectedOptions,
                                    (option) => option.value
                                );
                                setNewProjet({ ...newProjet, chercheurs: selectedChercheurs });
                            }}
                        >
                            <option value="">Sélectionnez des chercheurs</option>
                            {chercheurs.map((chercheur) => (
                                <option key={chercheur.id} value={chercheur.id}>
                                    {chercheur.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-success" type="submit">Ajouter</button>
                </form>
            ) : ''}


            {/* FILTRE DE RECHERCHE */}
            <div className="mt-5">
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
                        className="form-control"
                        value={filtres.chercheur}
                        onChange={(e) => setFiltres({ ...filtres, chef_de_projet: e.target.value })}
                    >
                        <option value="">Tous les chercheurs</option>
                        {chercheurs.map((chercheur) => (
                            <option key={chercheur.id} value={chercheur.id}>
                                {chercheur.nom} {chercheur.prenom}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <input
                        className="form-control"
                        type="date"
                        placeholder="Date de début"
                        value={filtres.date_debut}
                        onChange={(e) => setFiltres({ ...filtres, date_debut: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="form-control"
                        type="date"
                        placeholder="Date de fin"
                        value={filtres.date_fin_prevue}
                        onChange={(e) => setFiltres({ ...filtres, date_fin_prevue: e.target.value })}
                    />
                </div>
            </div>


            {/* AFFICHAGE DES DONNEES */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">Id</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Chef de projet</th>
                        <th scope="col">Date de début</th>
                        <th scope="col">Date de fin</th>
                        <th scope="col" className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projets.length > 0 && projets.map((projet) => (
                        <tr key={projet.id}>
                            <th scope="row" className="text-center">{projet.id}</th>
                            <td>{projet.titre}</td>
                            <td>{projet.description}</td>
                            <td>{projet.chef_de_projet}</td>
                            <td>{projet.date_debut}</td>
                            <td>{projet.date_fin_prevue}</td>
                            <th className="text-center">
                                <button data-bs-toggle="modal" data-bs-target="#editModal" className="btn btn-secondary" onClick={() => setSelectedProjet(projet)}>Modifier</button>
                                <button className="btn btn-danger ms-3" onClick={() => deleteProjet(projet.id)}>Supprimer</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* MODIFICATION D'UN PROJET */}
            <div class="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modifier un projet</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {selectedProjet !== null ? (
                                <form onSubmit={(e) => { e.preventDefault(); updateProjet(); }}>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Titre"
                                            value={selectedProjet.titre}
                                            onChange={(e) => setSelectedProjet({ ...selectedProjet, titre: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            placeholder="Description"
                                            value={selectedProjet.description}
                                            onChange={(e) => setSelectedProjet({ ...selectedProjet, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            type="date"
                                            placeholder="Date de début"
                                            value={selectedProjet.date_debut}
                                            onChange={(e) => setSelectedProjet({ ...selectedProjet, date_debut: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            type="date"
                                            placeholder="Date de fin prévue"
                                            value={selectedProjet.date_fin_prevue}
                                            onChange={(e) => setSelectedProjet({ ...selectedProjet, date_fin_prevue: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            className="form-select"
                                            value={selectedProjet.chef_de_projet}
                                            onChange={(e) => setSelectedProjet({ ...selectedProjet, chef_de_projet: e.target.value })}
                                        >
                                            <option value="">Sélectionner un chef de projet</option>
                                            {chercheurs.map((chercheur) => (
                                                <option key={chercheur.id} value={chercheur.id}>
                                                    {chercheur.nom} {chercheur.prenom}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Modifier</button>
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

export default Projet;