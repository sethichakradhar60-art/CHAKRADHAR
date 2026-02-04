import React from 'react';
import { Play, Gem, Star } from 'lucide-react';

interface HomeProps {
  onStart?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-rose-500/20 animate-pulse-slow">
        <Gem size={120} />
      </div>
      <div className="absolute bottom-20 right-10 text-blue-500/20 animate-bounce-short">
        <Gem size={80} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md w-full">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-full mb-4 ring-1 ring-indigo-500/30">
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400 drop-shadow-2xl">
            Gem Rush
          </h1>
          <p className="text-slate-400 text-lg font-medium">The Ultimate Match-3 Challenge</p>
        </div>

        {/* Action Button */}
        <button 
          onClick={onStart}
          className="group relative w-full text-left"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative w-full bg-slate-900 rounded-xl py-6 px-8 flex items-center justify-center gap-4 hover:bg-slate-800 transition-all border border-slate-700">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">Play Now</span>
            <Play className="fill-white" size={24} />
          </div>
        </button>

        {/* Footer Info */}
        <div className="grid grid-cols-2 gap-4 w-full text-center text-sm text-slate-500">
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <p className="font-bold text-white mb-1">Infinite</p>
            <p>Levels</p>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <p className="font-bold text-white mb-1">Offline</p>
            <p>Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};