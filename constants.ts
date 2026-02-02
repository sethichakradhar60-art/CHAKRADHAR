import { JewelColor } from './types';

export const BOARD_WIDTH = 8;
export const BOARD_SIZE = BOARD_WIDTH * BOARD_WIDTH;

export const CANDY_COLORS: JewelColor[] = [
  JewelColor.Red,
  JewelColor.Blue,
  JewelColor.Green,
  JewelColor.Yellow,
  JewelColor.Purple,
  JewelColor.Orange,
];

// Tailwind classes for each gem type for a glossy look
export const GEM_STYLES: Record<JewelColor, string> = {
  [JewelColor.Red]: "bg-gradient-to-br from-red-400 to-red-700 border-red-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
  [JewelColor.Blue]: "bg-gradient-to-br from-blue-400 to-blue-700 border-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
  [JewelColor.Green]: "bg-gradient-to-br from-emerald-400 to-emerald-700 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  [JewelColor.Yellow]: "bg-gradient-to-br from-yellow-300 to-yellow-600 border-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.5)]",
  [JewelColor.Purple]: "bg-gradient-to-br from-purple-400 to-purple-700 border-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]",
  [JewelColor.Orange]: "bg-gradient-to-br from-orange-400 to-orange-700 border-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.5)]",
  [JewelColor.Empty]: "invisible",
};

export const ANIMATION_DELAY = 100; // ms between cascade steps