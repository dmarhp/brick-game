import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {Game, ICell} from "@global/types";

const offsetY = Math.floor(SCREEN_HEIGHT / 2 + 3);
const screenCenter = Math.floor(SCREEN_WIDTH / 2);

const racing: ICell[] = [
  // borders:
  {y: offsetY - 0, x: 0},
  {y: offsetY - 0, x: SCREEN_WIDTH - 1},
  {y: offsetY - 1, x: 0},
  {y: offsetY - 1, x: SCREEN_WIDTH - 1},
  {y: offsetY - 2, x: 0},
  {y: offsetY - 2, x: SCREEN_WIDTH - 1},
  {y: offsetY - 4, x: 0},
  {y: offsetY - 4, x: SCREEN_WIDTH - 1},
  {y: offsetY - 5, x: 0},
  {y: offsetY - 5, x: SCREEN_WIDTH - 1},
  {y: offsetY - 6, x: 0},
  {y: offsetY - 6, x: SCREEN_WIDTH - 1},

  // car1:
  {y: offsetY - 4, x: 3},
  {y: offsetY - 5, x: 2},
  {y: offsetY - 5, x: 3},
  {y: offsetY - 5, x: 4},
  {y: offsetY - 6, x: 3},
  {y: offsetY - 7, x: 2},
  {y: offsetY - 7, x: 4},

  // car2:
  {y: offsetY - 0, x: SCREEN_WIDTH - 4},
  {y: offsetY - 1, x: SCREEN_WIDTH - 3},
  {y: offsetY - 1, x: SCREEN_WIDTH - 4},
  {y: offsetY - 1, x: SCREEN_WIDTH - 5},
  {y: offsetY - 2, x: SCREEN_WIDTH - 4},
  {y: offsetY - 3, x: SCREEN_WIDTH - 3},
  {y: offsetY - 3, x: SCREEN_WIDTH - 4},
  {y: offsetY - 3, x: SCREEN_WIDTH - 5}
];

const snake: ICell[] = [
  // mouse:
  {y: offsetY - 2, x: 2},

  // snake:
  {y: offsetY - 4, x: SCREEN_WIDTH - 3},
  {y: offsetY - 5, x: SCREEN_WIDTH - 3},
  {y: offsetY - 6, x: SCREEN_WIDTH - 3},
  {y: offsetY - 6, x: SCREEN_WIDTH - 4},
  {y: offsetY - 6, x: SCREEN_WIDTH - 5},
  {y: offsetY - 6, x: SCREEN_WIDTH - 6},
];

const tanks: ICell[] = [
  // tank1:
  {y: offsetY - 0, x: 3},
  {y: offsetY - 0, x: 5},
  {y: offsetY - 1, x: 3},
  {y: offsetY - 1, x: 4},
  {y: offsetY - 1, x: 5},
  {y: offsetY - 2, x: 4},
  
  // tank2:
  {y: offsetY - 4, x: SCREEN_WIDTH - 5},
  {y: offsetY - 5, x: SCREEN_WIDTH - 5},
  {y: offsetY - 6, x: SCREEN_WIDTH - 6},
  {y: offsetY - 6, x: SCREEN_WIDTH - 5},
  {y: offsetY - 6, x: SCREEN_WIDTH - 4},
  {y: offsetY - 7, x: SCREEN_WIDTH - 6},
  {y: offsetY - 7, x: SCREEN_WIDTH - 4},
];

const lock: ICell[] = [
  {x: screenCenter - 2, y: offsetY - 0},
  {x: screenCenter - 1, y: offsetY - 0},
  {x: screenCenter + 0, y: offsetY - 0},
  //{x: screenCenter + 1, y: offsetY - 0},

  {x: screenCenter - 3, y: offsetY - 1},
  {x: screenCenter + 1, y: offsetY - 1},

  {x: screenCenter - 3, y: offsetY - 2},
  {x: screenCenter + 1, y: offsetY - 2},

  {x: screenCenter - 3, y: offsetY - 3},
  //{x: screenCenter - 2, y: offsetY - 3},
  //{x: screenCenter - 1, y: offsetY - 3},
  //{x: screenCenter + 0, y: offsetY - 3},
  {x: screenCenter + 1, y: offsetY - 3},
  //{x: screenCenter + 2, y: offsetY - 3},

  {x: screenCenter - 3, y: offsetY - 4},
  {x: screenCenter - 2, y: offsetY - 4},
  {x: screenCenter - 1, y: offsetY - 4},
  {x: screenCenter + 0, y: offsetY - 4},
  {x: screenCenter + 1, y: offsetY - 4},
  //{x: screenCenter + 2, y: offsetY - 4},

  {x: screenCenter - 3, y: offsetY - 5},
  {x: screenCenter - 2, y: offsetY - 5},
  //{x: screenCenter - 1, y: offsetY - 5},
  {x: screenCenter + 0, y: offsetY - 5},
  {x: screenCenter + 1, y: offsetY - 5},
  //{x: screenCenter + 2, y: offsetY - 5},

  {x: screenCenter - 3, y: offsetY - 6},
  {x: screenCenter - 2, y: offsetY - 6},
  //{x: screenCenter - 1, y: offsetY - 6},
  {x: screenCenter + 0, y: offsetY - 6},
  {x: screenCenter + 1, y: offsetY - 6},
  //{x: screenCenter + 2, y: offsetY - 6},

  {x: screenCenter - 2, y: offsetY - 7},
  {x: screenCenter - 1, y: offsetY - 7},
  {x: screenCenter + 0, y: offsetY - 7},
  //{x: screenCenter + 1, y: offsetY - 7}
];

export const getGamePreview = (game: Game): ICell[] => {
  switch (game) {
    case Game.Racing:
      return racing;
    case Game.Snake:
      return snake;
    case Game.Tanks:
      return tanks;
    case Game.LockedGame:
      return lock;
    default:
      return [];
  }
}
