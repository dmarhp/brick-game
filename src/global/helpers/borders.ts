import {BorderPatter, Direction, IBorders, ICell} from "@global/types";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {cellHelpers} from "@global/helpers/cells";

const getVerticalBorders = (pattern: BorderPatter): IBorders => {
  const left: ICell[] = [];
  const right: ICell[] = [];

  for (let y = 0; y < SCREEN_HEIGHT; y++) {
    const indexInPattern = y % pattern.length;
    if (pattern[indexInPattern]) {
      const leftCell = {x: 0, y};
      const rightCell = {x: SCREEN_WIDTH - 1, y};
      left.push(leftCell);
      right.push(rightCell);
    }
  }
  return {left, right} as IBorders;
}

const moveBorderDown = (border: ICell[]) => {
  if (border[0].y === 0) {
    const shiftedCell = border.shift();
    shiftedCell.y = SCREEN_HEIGHT;
    border.push(shiftedCell);
  }
  return border.map(c => cellHelpers.move(c, Direction.Down));
}

const moveBorders = (borders: IBorders, direction: Direction): IBorders => {

  switch (direction) {
    case Direction.Down:
      return {
        ...borders,
        left: moveBorderDown(borders.left),
        right: moveBorderDown(borders.right)
      };
    default:
      return borders;
  }
}

export const borderHelpers = {
  getVerticalBorders,
  moveBorders
}