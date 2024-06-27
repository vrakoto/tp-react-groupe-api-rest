import React, { useState } from 'react';
import api from '../services/Api_services';
import { Line } from 'react-chartjs-2';

const Graphique = () => {
    const [graphData, setGraphData] = useState(null);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        specialty: '',
        graphType: 'line'
    });

    const generateGraph = async () => {
        try {
            const response = await api.get('/generate-graph/', { params: filters });
            setGraphData(response.data);
        } catch (error) {
            console.error('Erreur lors de la génération du graphique', error);
        }
    };

    return (
        <div>
            <h1>Génération de Graphique</h1>
            <form onSubmit={(e) => { e.preventDefault(); generateGraph(); }}>
                {/* Champs de sélection pour les filtres */}
                <input
                    type="date"
                    placeholder="Date de début"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Date de fin"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Spécialité"
                    value={filters.specialty}
                    onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                />
                <select
                    value={filters.graphType}
                    onChange={(e) => setFilters({ ...filters, graphType: e.target.value })}
                >
                    <option value="line">Courbe</option>
                    <option value="bar">Histogramme</option>
                    <option value="pie">Secteurs</option>
                </select>
                <button type="submit">Générer le graphique</button>
            </form>
            {graphData && (
                <Line data={graphData} />
            )}
        </div>
    );
};

export default Graphique;