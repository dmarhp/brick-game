import {Direction, Figure, ICell} from "@global/types";

const getTankWithDownDirection = (isPlayer: boolean): ICell[] => {
  const tankCells: ICell[] = [
    {y: 1, x: -1},
    {y: 1, x: 1},
    {y: 0, x: -1},
    {y: 0, x: 0},
    {y: 0, x: 1},
    {y: -1, x: 0}
  ];

  if (isPlayer) {
    tankCells.push({y: 1, x: 0});
  }
  return tankCells;
}

const getTankWithUpDirection = (isPlayer: boolean): ICell[] => {
  const tankCells: ICell[] = [
    {y: -1, x: -1},
    {y: -1, x: 1},
    {y: 0, x: -1},
    {y: 0, x: 0},
    {y: 0, x: 1},
    {y: 1, x: 0}
  ];

  if (isPlayer) {
    tankCells.push({y: -1, x: 0});
  }
  return tankCells;
}

const getTankWithRightDirection = (isPlayer: boolean): ICell[] => {
  const tankCells: ICell[] = [
    {y: -1, x: -1},
    {y: -1, x: 0},
    {y: 0, x: 0},
    {y: 0, x: 1},
    {y: 1, x: -1},
    {y: 1, x: 0}
  ];

  if (isPlayer) {
    tankCells.push({y: 0, x: -1});
  }

  return tankCells
}
const getTankWithLeftDirection = (isPlayer: boolean): ICell[] => {
  let tankCells: ICell[] = [
    {y: -1, x: 1},
    {y: -1, x: 0},
    {y: 0, x: -1},
    {y: 0, x: 0},
    {y: 1, x: 1},
    {y: 1, x: 0}
  ];

  if (isPlayer) {
    tankCells.push({y: 0, x: 1});
  }

  return tankCells;
}

export default (figure: Figure, direction: Direction = Direction.Up): ICell[] => {
  const isPlayer = figure === Figure.TankPlayer;

  switch (direction) {
    case Direction.Up:
      return getTankWithUpDirection(isPlayer);
    case Direction.Down:
      return getTankWithDownDirection(isPlayer);
    case Direction.Right:
      return getTankWithRightDirection(isPlayer);
    case Direction.Left:
      return getTankWithLeftDirection(isPlayer);
    default:
      return [];
  }
}
