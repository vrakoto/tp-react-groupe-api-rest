import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chercheur from './components/Chercheur';
import Projet from './components/Projet';
import Publication from './components/Publication';
import Header from './components/Header';
import Graphique from './components/Graphique';
import Login from './components/Login';
import AuthNeeded from './services/AuthNeeded';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/chercheurs"
                    element={
                        <AuthNeeded>
                            <Chercheur />
                        </AuthNeeded>
                    }
                />
                <Route
                    path="/projets"
                    element={
                        <AuthNeeded>
                            <Projet />
                        </AuthNeeded>
                    }
                />
                <Route
                    path="/publications"
                    element={
                        <AuthNeeded>
                            <Publication />
                        </AuthNeeded>
                    }
                />
                <Route
                    path="/graphique"
                    element={
                        <AuthNeeded>
                            <Graphique />
                        </AuthNeeded>
                    }
                />
            </Routes>
        </>
    );
};

export default App;