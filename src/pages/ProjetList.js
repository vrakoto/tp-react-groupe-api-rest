import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Projet from '../components/Projet';

const API_URL = 'http://localhost:8000/api/';

const ProjetList = () => {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetchProjets();
  }, []);

  const fetchProjets = async () => {
    try {
      const response = await axios.get(`${API_URL}projets/`);
      setProjets(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
  };

  return (
    <div>
      <h2>Liste des projets</h2>
      {projets.map((projet) => (
        <Projet key={projet.id} projet={projet} />
      ))}
    </div>
  );
};

export default ProjetList;
