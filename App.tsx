import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { GameBoard } from './components/GameBoard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<GameBoard />} />
      </Routes>
    </Router>
  );
};

export default App;