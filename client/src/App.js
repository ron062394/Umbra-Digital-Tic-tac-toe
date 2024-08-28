// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/HomePage';
import NewGameSession from './components/NewGameSession';
import Game from './components/Game';
import Footer from './components/Footer';

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/new-game" element={<NewGameSession />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
