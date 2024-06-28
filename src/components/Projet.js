import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/Api_services';

const Projet = () => {
    const [projets, setProjets] = useState([]);
    const [chercheurs, setChercheurs] = useState([]);
    const [newProjet, setNewProjet] = useState({
        titre: '',
        description: '',
        date_debut: '',
        date_fin_prevue: '',
        chef_de_projet: ''
    });
    // Ajouter les états pour les filtres
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
                chef_de_projet: ''
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
        <div>
            <h1>Projets de Recherche</h1>
            <div>
                <h2>Filtres</h2>
                <input
                    type="text"
                    placeholder="Titre"
                    value={filtres.titre}
                    onChange={(e) => setFiltres({ ...filtres, titre: e.target.value })}
                />
                <select
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
                <input
                    type="date"
                    placeholder="Date de début"
                    value={filtres.date_debut}
                    onChange={(e) => setFiltres({ ...filtres, date_debut: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Date de fin"
                    value={filtres.date_fin_prevue}
                    onChange={(e) => setFiltres({ ...filtres, date_fin_prevue: e.target.value })}
                />
            </div>


            {/* AFFICHAGE DES DONNEES */}
            <ul>
                {projets.length > 0 && projets.map((projet) => (
                    <li key={projet.id}>
                        {projet.titre} - {projet.description} Du : {projet.date_debut} au : {projet.date_fin_prevue}
                        <button onClick={() => setSelectedProjet(projet)}>Modifier</button>
                        <button onClick={() => deleteProjet(projet.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            <h2>Ajouter un Projet</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {chercheurs && chercheurs.length > 0 ? (
                <form onSubmit={(e) => { e.preventDefault(); createProjet(); }}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={newProjet.titre}
                        onChange={(e) => setNewProjet({ ...newProjet, titre: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        value={newProjet.description}
                        onChange={(e) => setNewProjet({ ...newProjet, description: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Date de début"
                        value={newProjet.date_debut}
                        onChange={(e) => setNewProjet({ ...newProjet, date_debut: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Date de fin prévue"
                        value={newProjet.date_fin_prevue}
                        onChange={(e) => setNewProjet({ ...newProjet, date_fin_prevue: e.target.value })}
                    />
                    <select
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
                    <button type="submit">Ajouter</button>
                </form>
            ) : "Impossible d'ajouter un projet car aucun chercheur n'a été créé"}

            {/* MODIFICATION D'UN PROJET */}
            {selectedProjet && (
                <div>
                    <h2>Modifier un Projet</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={(e) => { e.preventDefault(); updateProjet(); }}>
                        <input
                            type="text"
                            placeholder="Titre"
                            value={selectedProjet.titre}
                            onChange={(e) => setSelectedProjet({ ...selectedProjet, titre: e.target.value })}
                        />
                        <textarea
                            placeholder="Description"
                            value={selectedProjet.description}
                            onChange={(e) => setSelectedProjet({ ...selectedProjet, description: e.target.value })}
                        />
                        <input
                            type="date"
                            placeholder="Date de début"
                            value={selectedProjet.date_debut}
                            onChange={(e) => setSelectedProjet({ ...selectedProjet, date_debut: e.target.value })}
                        />
                        <input
                            type="date"
                            placeholder="Date de fin prévue"
                            value={selectedProjet.date_fin_prevue}
                            onChange={(e) => setSelectedProjet({ ...selectedProjet, date_fin_prevue: e.target.value })}
                        />
                        <select
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
                        <button type="submit">Modifier</button>
                        <button onClick={() => setSelectedProjet(null)}>Annuler</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Projet;