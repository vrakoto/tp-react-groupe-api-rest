import React, { useState, useEffect } from 'react';
import api from '../services/Api_services';

const Chercheur = () => {
    const [chercheurs, setChercheurs] = useState([]);
    const [enableForm, setEnableForm] = useState(false);
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
        <div className="container">
            <h1 className="text-center mt-5">Liste des Chercheurs</h1>

            <div className="text-center mt-3 mb-5">
                <button className="btn btn-primary" onClick={() => setEnableForm(!enableForm)}>Ajouter un chercheur</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {enableForm ? (
                <form className="mb-5" onSubmit={(e) => { e.preventDefault(); createChercheur(); }}>
                    <div class="mb-3">
                        <label htmlFor="nom" class="form-label">Nom</label>
                        <input
                            id="nom"
                            className="form-control"
                            type="text"
                            placeholder="Nom"
                            value={newChercheur.nom}
                            onChange={(e) => setNewChercheur({ ...newChercheur, nom: e.target.value })}
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="specialite" class="form-label">Spécialité</label>
                        <input
                            id="specialite"
                            className="form-control"
                            type="text"
                            placeholder="Spécialité"
                            value={newChercheur.specialite}
                            onChange={(e) => setNewChercheur({ ...newChercheur, specialite: e.target.value })}
                        />
                    </div>
                    <button type="submit" class="btn btn-success">Ajouter</button>
                </form>
            ) : ''}


            {/* AFFICHAGE DES DONNEES */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">Id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Spécialité</th>
                        <th scope="col" className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {chercheurs.length > 0 && chercheurs.map((chercheur) => (
                        <tr key={chercheur.id}>
                            <th scope="row" className="text-center">{chercheur.id}</th>
                            <td>{chercheur.nom}</td>
                            <td>{chercheur.specialite}</td>
                            <th className="text-center">
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-secondary" onClick={() => setSelectedChercheur(chercheur)}>Modifier</button>
                                <button className="btn btn-danger ms-3" onClick={() => deleteChercheur(chercheur.id)}>Supprimer</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modifier un chercheur</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => { e.preventDefault(); updateChercheur(); }}>
                                <div class="mb-3">
                                    <label htmlFor="nom" class="col-form-label">Nom:</label>
                                    <input type="text" class="form-control" id="nom" value={selectedChercheur !== null ? selectedChercheur.nom : ''}
                                        onChange={(e) => setSelectedChercheur({ ...selectedChercheur, nom: e.target.value })}
                                    ></input>
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="specialite" class="col-form-label">Spécialité:</label>
                                    <textarea class="form-control" id="specialite" value={selectedChercheur !== null ? selectedChercheur.specialite : ''}
                                        onChange={(e) => setSelectedChercheur({ ...selectedChercheur, specialite: e.target.value })}
                                    ></textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Modifier</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chercheur;