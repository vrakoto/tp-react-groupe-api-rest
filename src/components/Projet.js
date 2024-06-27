import React, { useState, useEffect } from 'react';
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
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProjets();
        fetchChercheurs();
    }, []);

    const fetchProjets = async () => {
        try {
            const response = await api.get('/projets/');
            setProjets(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des projets', error);
        }
    };

    const fetchChercheurs = async () => {
        try {
            const response = await api.get('/chercheurs/');
            setChercheurs(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des chercheurs', error);
        }
    };

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
            <ul>
                {projets.map((projet) => (
                    <li key={projet.id}>
                        {projet.titre} - {projet.description}
                        <button onClick={() => deleteProjet(projet.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <h2>Ajouter un Projet</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
        </div>
    );
};

export default Projet;