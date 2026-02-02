import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Jewel } from './Jewel';
import { ScorePanel } from './ScorePanel';
import { JewelColor } from '../types';
import { BOARD_WIDTH, BOARD_SIZE, CANDY_COLORS, ANIMATION_DELAY } from '../constants';
import { generateRandomBoard, checkForMatches, isAdjacent } from '../utils/gameLogic';
import { playMatchSound, playSwapSound, playInvalidMoveSound } from '../utils/sound';

export const GameBoard: React.FC = () => {
  const [grid, setGrid] = useState<JewelColor[]>([]);
  const [score, setScore] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Initialize board
  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetGame = () => {
    setGrid(generateRandomBoard(BOARD_SIZE));
    setScore(0);
    setDragStart(null);
    setDragOver(null);
    setIsProcessing(false);
  };

  // Main game loop effect: Checks for matches whenever the grid changes
  useEffect(() => {
    if (grid.length === 0) return;

    const timer = setTimeout(() => {
      const matches = checkForMatches(grid);
      
      if (matches.size > 0) {
        setIsProcessing(true);
        playMatchSound();
        
        // Calculate Score (Simple: 10 per block, but could escalate)
        const points = matches.size * 10; 
        setScore(prev => prev + points);

        // 1. Remove Matches (Set to Empty)
        const newGrid = [...grid];
        matches.forEach(index => {
          newGrid[index] = JewelColor.Empty;
        });
        setGrid(newGrid);
        
        // 2. Schedule Gravity Fall
        setTimeout(() => moveJewelsDown(newGrid), ANIMATION_DELAY);
      } else {
        // No more matches, allow interaction
        setIsProcessing(false);
      }
    }, ANIMATION_DELAY);

    return () => clearTimeout(timer);
  }, [grid]);

  // Handles moving gems down into empty slots
  const moveJewelsDown = (currentGrid: JewelColor[]) => {
    const newGrid = [...currentGrid];
    
    // Process column by column
    for (let i = 0; i < BOARD_WIDTH; i++) {
      const column = [];
      for (let j = 0; j < BOARD_WIDTH; j++) {
        column.push(newGrid[i + j * BOARD_WIDTH]);
      }

      // Filter out empty spaces
      const actualJewels = column.filter(color => color !== JewelColor.Empty);
      
      // Calculate how many missing
      const missingCount = BOARD_WIDTH - actualJewels.length;
      
      // Add new random jewels at the top
      const newJewels = [];
      for (let k = 0; k < missingCount; k++) {
        newJewels.push(CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)]);
      }

      const combinedColumn = newJewels.concat(actualJewels);

      // Put back into grid
      for (let j = 0; j < BOARD_WIDTH; j++) {
        newGrid[i + j * BOARD_WIDTH] = combinedColumn[j];
      }
    }

    setGrid(newGrid);
  };

  // --- Interaction Handlers ---

  const handleDragStart = (id: number) => {
    if (isProcessing) return;
    setDragStart(id);
  };

  const handleDragEnter = (id: number) => {
    if (isProcessing) return;
    setDragOver(id);
  };

  const handleDragEnd = () => {
    if (isProcessing || dragStart === null || dragOver === null) {
      setDragStart(null);
      setDragOver(null);
      return;
    }

    const origin = dragStart;
    const target = dragOver;

    // Must be adjacent
    if (isAdjacent(origin, target)) {
      // Swap in a temporary grid to check validity
      const tempGrid = [...grid];
      const tempColor = tempGrid[origin];
      tempGrid[origin] = tempGrid[target];
      tempGrid[target] = tempColor;

      const validMove = checkForMatches(tempGrid).size > 0;

      if (validMove) {
        setGrid(tempGrid);
        playSwapSound();
      } else {
        playInvalidMoveSound();
        // Optionally animate an "invalid move" wiggle here
      }
    }

    setDragStart(null);
    setDragOver(null);
  };

  // Touch handling needs to manually find the element under the finger
  const touchTargetRef = useRef<number | null>(null);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isProcessing) return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const idString = element?.closest('[data-id]')?.getAttribute('data-id');
    
    if (idString) {
      const id = parseInt(idString);
      if (!isNaN(id)) {
        touchTargetRef.current = id;
        setDragOver(id);
      }
    }
  }, [isProcessing]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-game-bg">
      <ScorePanel score={score} onReset={resetGame} />
      
      {/* Game Grid Container */}
      <div 
        className="relative bg-slate-900/50 p-2 sm:p-4 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-sm"
        onTouchMove={handleTouchMove}
      >
        <div 
          className="grid grid-cols-8 gap-1 sm:gap-2"
          style={{ width: 'min(90vw, 400px)', height: 'min(90vw, 400px)' }}
        >
          {grid.map((color, index) => (
            <Jewel
              key={index}
              id={index}
              color={color}
              isSelected={dragStart === index}
              onMouseDown={handleDragStart}
              onMouseEnter={handleDragEnter}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={() => {
                // If we have a touch target from moving, use it, otherwise dragOver might be stale/null
                if (touchTargetRef.current !== null) {
                   setDragOver(touchTargetRef.current);
                   // Small delay to allow state update before checking
                   setTimeout(() => {
                     handleDragEnd();
                     touchTargetRef.current = null;
                   }, 0);
                } else {
                  handleDragEnd();
                }
              }}
            />
          ))}
        </div>

        {/* Loading/Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-20 bg-transparent cursor-wait" />
        )}
      </div>

      <div className="mt-6 text-slate-500 text-sm font-medium text-center max-w-xs">
        Drag or swipe adjacent gems to swap. Match 3 to score!
      </div>
    </div>
  );
};