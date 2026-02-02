import React, { useState } from 'react';
import { Trophy, RefreshCw, Home, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setMasterVolume } from '../utils/sound';

interface ScorePanelProps {
  score: number;
  onReset: () => void;
}

export const ScorePanel: React.FC<ScorePanelProps> = ({ score, onReset }) => {
  const [volume, setVolume] = useState(0.5);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);
    setVolume(newVal);
    setMasterVolume(newVal);
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto mb-4 px-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-game-panel rounded-2xl p-4 border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-lg">
             <Trophy className="text-yellow-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Score</p>
            <p className="text-2xl font-black text-white leading-none">{score.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={onReset}
            className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors text-slate-200"
            aria-label="Restart Game"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <Link 
            to="/"
            className="p-3 bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors text-white"
            aria-label="Quit"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 bg-slate-900/50 p-2 px-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
        <Volume2 className="w-4 h-4 text-slate-400" />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400 hover:accent-sky-300"
          aria-label="Sound Volume"
        />
      </div>
    </div>
  );
};