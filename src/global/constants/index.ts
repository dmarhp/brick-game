import {Game, IGameCatalogItem} from "@global/types";

export const SCREEN_HEIGHT = 20;
export const SCREEN_WIDTH = 10;

export const GAME_CATALOG: IGameCatalogItem[] = [
  {name: 'Racing', game: Game.Racing, letter: 'A'},
  {name: 'Snake', game: Game.Snake, letter: 'B'},
  {name: 'Tanks', game: Game.Tanks, letter: 'C', locked: true},
];
