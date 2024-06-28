import React, { useState } from 'react';
import api from '../services/Api_services';

const ChartGenerator = () => {
    const [chartType, setChartType] = useState('pie');
    const [filters, setFilters] = useState({ date_debut: '', date_fin: '' });
    const [chart, setChart] = useState(null);
    const [error, setError] = useState('');

    const generateChart = async () => {
        try {
            const response = await api.post('/api/generate-chart/', { chart_type: chartType, filters });
            setChart(response.data.chart);
            setError('');
        } catch (error) {
            console.error('Erreur lors de la génération du graphique', error);
            setError('Erreur lors de la génération du graphique');
        }
    };

    return (
        <div>
            <h1>Génération de Graphiques</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={(e) => { e.preventDefault(); generateChart(); }}>
                <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                    <option value="pie">Graphique en Secteurs</option>
                    <option value="bar">Histogramme</option>
                    <option value="line">Courbe</option>
                </select>
                <input
                    type="date"
                    placeholder="Date de début"
                    value={filters.date_debut}
                    onChange={(e) => setFilters({ ...filters, date_debut: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Date de fin"
                    value={filters.date_fin}
                    onChange={(e) => setFilters({ ...filters, date_fin: e.target.value })}
                />
                <button type="submit">Générer</button>
            </form>
            {chart && <img src={`data:image/png;base64,${chart}`} alt="Chart" />}
        </div>
    );
};

export default ChartGenerator;