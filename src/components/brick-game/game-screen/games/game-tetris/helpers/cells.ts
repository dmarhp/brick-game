import {Block} from "../types";
import {Direction, ICell} from "@global/types";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";

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

const getBlock = (block: Block, direction: Direction = Direction.Up, offset: ICell = {x: 0, y: 0}): ICell[] => {
  let cells = [];
  switch (block) {
    case Block.I:
      cells = getIBlock(direction);
      break;
    case Block.J:
      cells = getJBlock(direction);
      break;
    case Block.L:
      cells = getLBlock(direction);
      break;
    case Block.O:
      cells = getOBlock();
      break;
    case Block.S:
      cells = getSBlock(direction);
      break;
    case Block.T:
      cells = getTBlock(direction);
      break;
    case Block.Z:
      cells = getZBlock(direction);
      break;
  }

  return cells.map(({x, y}) => ({x: x + offset.x, y: y + offset.y}));
}

const getInitialOffset = (): ICell => {
  return {
    x: SCREEN_WIDTH / 2 - 2,
    y: SCREEN_HEIGHT,
  }
}
const getOffset = (cells: ICell[]): ICell => {
  const {x} = cells.reduce((min, cell) => (cell.x < min.x ? cell : min), cells[0]);
  const {y} = cells.reduce((min, cell) => (cell.y < min.y ? cell : min), cells[0]);
  return {x, y}
}

export default {
  getBlock,
  getInitialOffset,
  getOffset,
}
