import {Direction} from "@global/types";

const getRandomDirection = (): Direction => {
  return Math.floor(Math.random() * 4) + 1;
}

const moveObject = ({x, y, direction}: { x: number, y: number, direction: Direction }) => {
  switch (direction) {
    case Direction.Up:
      y++;
      break;
    case Direction.Down:
      y--;
      break;
    case Direction.Left:
      x--;
      break;
    case Direction.Right:
      x++;
      break;
  }

  return {x, y};
}

export const objectsHelpers = {
  getRandomDirection,
  moveObject
}
