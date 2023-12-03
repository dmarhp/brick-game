import {Game, IGameCatalogItem} from "@global/types";
import {LOCALIZATION} from "@global/localization";

export const CLEAR_SCREEN_INTERVAL = 50;
export const SCREEN_HEIGHT = 20;
export const SCREEN_WIDTH = 10;

export const GAME_CATALOG: IGameCatalogItem[] = [
  {name: LOCALIZATION.racing, game: Game.Racing, letter: 'A'},
  {name: LOCALIZATION.snake, game: Game.Snake, letter: 'B'},
  {name: LOCALIZATION.tanks, game: Game.Tanks, letter: 'C'},
  {name: LOCALIZATION.tetris, game: Game.Tetris, letter: 'D'},
];
