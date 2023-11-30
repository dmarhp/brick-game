import {Direction, ICell} from "@global/types";
import {cellHelpers} from "@global/helpers/cells";

const isIntersecting = (obj1: ICell[], obj2: ICell[]) => {
  return obj1.some(c1 => obj2.some(c2 => c1.x === c2.x && c1.y === c2.y));
}

const isObjectCell = (obj: ICell[], cell: ICell) => {
  return obj.some(({x, y}) => cell.x === x && cell.y === y);
}

const isVisible = (cells: ICell[]) => {
  return cells.every(cellHelpers.isVisible);
}

const isVisibleOrAbove = (cells: ICell[]) => {
  return cells.every(cellHelpers.isVisibleOrAbove);
}

const move = (obj: ICell[], direction: Direction, distance: number = 1) => {
  return obj.map(c => {
    const {x, y} = cellHelpers.move(c, direction, distance);
    return {...c, x, y} as ICell;
  });
}

export const objectHelpers = {
  isIntersecting,
  isObjectCell,
  isVisible,
  isVisibleOrAbove,
  move,
}
