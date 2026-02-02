import React from 'react';
import { JewelColor } from '../types';
import { GEM_STYLES } from '../constants';
import { Diamond } from 'lucide-react';

interface JewelProps {
  color: JewelColor;
  id: number;
  isSelected: boolean;
  onMouseDown: (id: number) => void;
  onMouseEnter: (id: number) => void;
  onMouseUp: () => void;
  onTouchStart: (id: number) => void;
  onTouchEnd: () => void;
}

export const Jewel: React.FC<JewelProps> = ({ 
  color, 
  id, 
  isSelected,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onTouchStart,
  onTouchEnd
}) => {
  const styleClass = GEM_STYLES[color];

  return (
    <div
      className={`
        w-full h-full p-1 cursor-pointer transition-transform duration-150
        ${isSelected ? 'scale-110 z-10 brightness-125' : 'hover:scale-105'}
      `}
      onMouseDown={() => onMouseDown(id)}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseUp={onMouseUp}
      onTouchStart={(e) => {
        // Prevent scrolling when trying to play
        e.stopPropagation();
        onTouchStart(id);
      }}
      onTouchEnd={onTouchEnd}
      data-id={id} // Helper for touch move calculation if needed
    >
      <div 
        className={`
          w-full h-full rounded-lg sm:rounded-xl
          flex items-center justify-center
          border-t-2 border-b-4 
          relative overflow-hidden
          ${styleClass}
          ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}
        `}
      >
        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
        
        {/* Icon overlay for accessibility / style */}
        {color !== JewelColor.Empty && (
          <Diamond className="w-1/2 h-1/2 text-white/40 drop-shadow-md" strokeWidth={2.5} />
        )}
      </div>
    </div>
  );
};