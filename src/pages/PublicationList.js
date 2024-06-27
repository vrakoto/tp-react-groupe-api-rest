import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Publication from '../components/Publication';

const API_URL = 'http://localhost:8000/api/';

const PublicationList = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axios.get(`${API_URL}publications/`);
      setPublications(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des publications:', error);
    }
  };

  return (
    <div>
      <h2>Liste des publications</h2>
      {publications.map((publication) => (
        <Publication key={publication.id} publication={publication} />
      ))}
    </div>
  );
};

export default PublicationList;
