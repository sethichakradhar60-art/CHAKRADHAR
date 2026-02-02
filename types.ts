export enum JewelColor {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
  Purple = 'purple',
  Orange = 'orange',
  Empty = 'empty' // Used during cascading
}

export interface BoardState {
  grid: JewelColor[];
  score: number;
  isProcessing: boolean;
}

export interface JewelStyle {
  bg: string;
  inner: string;
  border: string;
  shadow: string;
}

export type DragState = {
  active: boolean;
  startIndex: number | null;
  endIndex: number | null;
}