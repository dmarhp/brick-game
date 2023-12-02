import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {Direction, ICell} from "@global/types";

const getRandom = (blink = false): ICell => {
  const x = Math.floor(Math.random() * SCREEN_WIDTH);
  const y = Math.floor(Math.random() * SCREEN_HEIGHT);
  return {x, y, blink};
}

const isEqual = (cell1: ICell, cell2: ICell) => {
  return cell1?.x === cell2?.x && cell1?.y === cell2?.y;
}

const isVisible = ({x, y}: ICell) => {
  return x >= 0 && x < SCREEN_WIDTH && y >= 0 && y < SCREEN_HEIGHT;
}

const isVisibleOrAbove = ({x, y}: ICell) => {
  return x >= 0 && x < SCREEN_WIDTH && y >= 0;
}

const move = (cell: ICell, direction: Direction, distance = 1) => {
  const updatedCell = {...cell};
  switch (direction) {
    case Direction.Up:
      updatedCell.y += distance;
      break;
    case Direction.Down:
      updatedCell.y -= distance;
      break;
    case Direction.Left:
      updatedCell.x -= distance;
      break;
    case Direction.Right:
      updatedCell.x += distance;
      break;
  }

  return updatedCell;
}

export const cellHelpers = {
  getRandom,
  isEqual,
  isVisible,
  isVisibleOrAbove,
  move
}
