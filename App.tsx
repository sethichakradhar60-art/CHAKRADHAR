import React, { useState } from 'react';
import { Home } from './components/Home';
import { GameBoard } from './components/GameBoard';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'game'>('home');

  return (
    <>
      {screen === 'home' ? (
        <Home onStart={() => setScreen('game')} />
      ) : (
        <GameBoard onHome={() => setScreen('home')} />
      )}
    </>
  );
};

export default App;