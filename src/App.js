import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chercheur from './components/Chercheur';
import Projet from './components/Projet';
import Publication from './components/Publication';
import Header from './components/Header';
import Graphique from './components/Graphique';
import Login from './components/Login';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/chercheurs" element={<Chercheur />} />
                <Route path="/projets" element={<Projet />} />
                <Route path="/publications" element={<Publication />} />
                <Route path="/graphique" element={<Graphique />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
};

export default App;