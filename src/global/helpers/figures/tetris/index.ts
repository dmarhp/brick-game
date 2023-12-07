import {Direction, Figure, ICell} from "@global/types";

const getIBlock = (direction: Direction): ICell[] => {
  switch (direction) {
    case Direction.Down:
    case Direction.Up:
      return [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0}
      ];
    case Direction.Right:
    case Direction.Left:
      return [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 0, y: 3}
      ];
  }
}

const getJBlock = (direction: Direction): ICell[] => {
  switch (direction) {
    case Direction.Up:
      return [
        {x: 0, y: 1},
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0}
      ];
    case Direction.Right:
      return [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 1, y: 2}
      ];
    case Direction.Down:
      return [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 2, y: 0}
      ];
    case Direction.Left:
      return [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2}
      ];
  }
}

const getLBlock = (direction: Direction): ICell[] => {
  switch (direction) {
    case Direction.Up:
      return [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 2, y: 1}
      ];
    case Direction.Right:
      return [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 1, y: 0}
      ];
    case Direction.Down:
      return [
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 1, y: 2},
        {x: 2, y: 2}
      ];
    case Direction.Left:
      return [
        {x: 0, y: 2},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2}
      ];
  }
}

const getOBlock = (): ICell[] => {
  return [
    {x: 0, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 1, y: 1}
  ];
}

const getSBlock = (direction: Direction): ICell[] => {
  switch (direction) {
    case Direction.Down:
    case Direction.Up:
      return [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 1}
      ];
    case Direction.Left:
    case Direction.Right:
      return [
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 1, y: 0},
        {x: 1, y: 1}
      ];
  }
}

const getTBlock = (direction: Direction): ICell[] => {
  switch (direction) {
    case Direction.Up:
      return [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 0}
      ];
    case Direction.Right:
      return [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 1, y: 1}
      ];
    case Direction.Down:
      return [
        {x: 0, y: 1},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 1}
      ];
    case Direction.Left:
      return [
        {x: 0, y: 1},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2}
      ];
  }
}

const getZBlock = (direction: Direction): ICell[] => {
  switch (direction) {
    case Direction.Down:
    case Direction.Up:
      return [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 1, y: 0},
        {x: 2, y: 0}
      ];
    case Direction.Left:
    case Direction.Right:
      return [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 1, y: 2}
      ];
  }
}

export default (figure: Figure, direction: Direction = Direction.Up, offset: ICell = null) => {
  let cells: ICell[] = [];
  switch (figure) {
    case Figure.BlockI:
      cells = getIBlock(direction);
      break;
    case Figure.BlockJ:
      cells = getJBlock(direction);
      break;
    case Figure.BlockL:
      cells = getLBlock(direction);
      break;
    case Figure.BlockO:
      cells = getOBlock();
      break;
    case Figure.BlockS:
      cells = getSBlock(direction);
      break;
    case Figure.BlockT:
      cells = getTBlock(direction);
      break;
    case Figure.BlockZ:
      cells = getZBlock(direction);
      break;
    default:
      return [];
  }

  if (!offset) {
    return;
  }

  return cells.map(({x, y}) => ({x: x + offset.x, y: y + offset.y}))
}