export enum Axis {
  None,
  X,
  Y
}

export interface IBorders {
  left: ICell[];
  right: ICell[];
  top: ICell[];
  bottom: ICell[]
}

export type BorderPatter = boolean[];

export interface ICell {
  x: number;
  y: number;
  blink?: boolean;
}

// don't change values!
export enum Direction {
  None = 0,
  Up = 1,
  Right = 2,
  Down = 3,
  Left = 4
}

export enum ControlButton {
  None = 0,
  Up,
  Down,
  Left,
  Right,
  Rotate,
  Pause,
  Sound,
  Settings,
  Exit
}

export enum Figure {
  None = 0,
  BlockI,
  BlockJ,
  BlockL,
  BlockO,
  BlockS,
  BlockT,
  BlockZ,
  Car,
  CarPlayer,
  Crash1,
  Crash2,
  Tank,
  TankPlayer,
}

export enum Game {
  None,
  Snake,
  Racing,
  Tanks,
  Tetris,
  LockedGame,
  RowFiller,
}

export interface IGameCatalogItem {
  name: string;
  game: Game;
  letter: Letter;
  lives: number;
  locked?: boolean;
}

export enum GameStatus {
  NewGame,
  Play,
  Win,
  Lose
}

export enum Icon {
  None = 0,
  Music,
  Pause,
  Poo
}

export type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export enum LetterPosition {
  Top,
  Bottom
}

export enum View {
  None,
  ClearScreen,
  Game,
  SelectGame,
}
