import React, { useState, useEffect } from 'react';
import api from '../services/Api_services';

const Chercheur = () => {
    const [chercheurs, setChercheurs] = useState([]);
    const [newChercheur, setNewChercheur] = useState({ nom: '', specialite: '' });
    const [selectedChercheur, setSelectedChercheur] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchChercheurs();
    }, []);

    const fetchChercheurs = async () => {
        try {
            const response = await api.get('/chercheurs/');
            if (response.data) {
                setChercheurs(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des chercheurs', error);
        }
    };

    const createChercheur = async () => {
        try {
            await api.post('/chercheurs/', newChercheur);
            setNewChercheur({ nom: '', specialite: '' });
            setError('');
            fetchChercheurs();
        } catch (error) {
            console.error('Erreur lors de la création du chercheur', error);
            setError('Erreur lors de la création du chercheur');
        }
    };

    const updateChercheur = async () => {
        try {
            await api.put(`/chercheurs/${selectedChercheur.id}/`, selectedChercheur);
            setSelectedChercheur(null);
            setError('');
            fetchChercheurs();
        } catch (error) {
            console.error('Erreur lors de la modification du chercheur', error);
            setError('Erreur lors de la modification du chercheur');
        }
    };

    const deleteChercheur = async (id) => {
        try {
            await api.delete(`/chercheurs/${id}/`);
            fetchChercheurs();
        } catch (error) {
            console.error('Erreur lors de la suppression du chercheur', error);
            setError('Erreur lors de la suppression du chercheur');
        }
    };

    return (
        <div>
            <h1>Chercheurs</h1>
            <ul>
                {chercheurs.length > 0 && chercheurs.map((chercheur) => (
                    <li key={chercheur.id}>
                        {chercheur.nom} - {chercheur.specialite}
                        <button onClick={() => setSelectedChercheur(chercheur)}>Modifier</button>
                        <button onClick={() => deleteChercheur(chercheur.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <h2>Ajouter un Chercheur</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={(e) => { e.preventDefault(); createChercheur(); }}>
                <input
                    type="text"
                    placeholder="Nom"
                    value={newChercheur.nom}
                    onChange={(e) => setNewChercheur({ ...newChercheur, nom: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Spécialité"
                    value={newChercheur.specialite}
                    onChange={(e) => setNewChercheur({ ...newChercheur, specialite: e.target.value })}
                />
                <button type="submit">Ajouter</button>
            </form>

            {/* MODIFICATION D'UN CHERCHEUR */}
            {selectedChercheur && (
                <div>
                    <h2>Modifier un Chercheur</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={(e) => { e.preventDefault(); updateChercheur(); }}>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={selectedChercheur.nom}
                            onChange={(e) => setSelectedChercheur({ ...selectedChercheur, nom: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Spécialité"
                            value={selectedChercheur.specialite}
                            onChange={(e) => setSelectedChercheur({ ...selectedChercheur, specialite: e.target.value })}
                        />
                        <button type="submit">Modifier</button>
                        <button onClick={() => setSelectedChercheur(null)}>Annuler</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chercheur;