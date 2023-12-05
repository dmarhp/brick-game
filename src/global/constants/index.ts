import {Game, IGameCatalogItem} from "@global/types";
import {LOCALIZATION} from "@global/localization";

export const CELL_BLINK_INTERVAL = 500;
export const CLEAR_SCREEN_INTERVAL = 50;
export const SCREEN_HEIGHT = 20;
export const SCREEN_WIDTH = 10;

export const GAME_CATALOG: IGameCatalogItem[] = [
  {
    game: Game.Racing,
    name: LOCALIZATION.racing,
    letter: 'A',
    lives: 4
  },
  {
    game: Game.Snake,
    name: LOCALIZATION.snake,
    letter: 'B',
    lives: 1
  },
  {
    game: Game.Tanks,
    name: LOCALIZATION.tanks,
    letter: 'C',
    lives: 1
  },
  {
    game: Game.Tetris,
    name: LOCALIZATION.tetris,
    letter: 'D',
    lives: 1
  },
];
