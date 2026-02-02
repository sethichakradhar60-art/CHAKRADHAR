import { BOARD_WIDTH, CANDY_COLORS } from '../constants';
import { JewelColor } from '../types';

/**
 * Generates a random board.
 * Ideally, we would ensure no initial matches, but for simplicity
 * we'll let the initial cascade handle it.
 */
export const generateRandomBoard = (size: number): JewelColor[] => {
  const board: JewelColor[] = [];
  for (let i = 0; i < size; i++) {
    const randomColor = CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)];
    board.push(randomColor);
  }
  return board;
};

/**
 * Checks for matches of 3 or more in rows and columns.
 * Returns a unique set of indices that are part of a match.
 */
export const checkForMatches = (grid: JewelColor[]): Set<number> => {
  const matchedIndices = new Set<number>();

  // Check Rows
  for (let i = 0; i < 64; i++) {
    // Only check if it's a valid starting point for a row of 3
    // Columns 0-5 are valid starts. 6 and 7 cannot start a match of 3.
    if (i % BOARD_WIDTH < BOARD_WIDTH - 2) {
      const rowThree = [i, i + 1, i + 2];
      const decidedColor = grid[i];
      const isBlank = decidedColor === JewelColor.Empty;

      if (!isBlank && rowThree.every(index => grid[index] === decidedColor)) {
        rowThree.forEach(index => matchedIndices.add(index));
      }
    }
  }

  // Check Columns
  for (let i = 0; i < 47; i++) { // 47 is the last index that can start a vertical match of 3 (64 - 2*8 - 1)
    const colThree = [i, i + BOARD_WIDTH, i + BOARD_WIDTH * 2];
    const decidedColor = grid[i];
    const isBlank = decidedColor === JewelColor.Empty;

    if (!isBlank && colThree.every(index => grid[index] === decidedColor)) {
      colThree.forEach(index => matchedIndices.add(index));
    }
  }

  return matchedIndices;
};

/**
 * Checks if two indices are adjacent (horizontally or vertically, not diagonally).
 */
export const isAdjacent = (id1: number, id2: number): boolean => {
  const row1 = Math.floor(id1 / BOARD_WIDTH);
  const col1 = id1 % BOARD_WIDTH;
  const row2 = Math.floor(id2 / BOARD_WIDTH);
  const col2 = id2 % BOARD_WIDTH;

  const rowDiff = Math.abs(row1 - row2);
  const colDiff = Math.abs(col1 - col2);

  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};