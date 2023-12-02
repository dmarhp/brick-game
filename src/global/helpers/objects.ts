import {Direction, ICell} from "@global/types";
import {cellHelpers} from "@global/helpers/cells";

const isObjectCell = (obj: ICell[], cell: ICell) => {
  return obj.some((c) => cellHelpers.isEqual(cell, c));
}

const isOutsideScreen = (obj: ICell[]) => {
  return !obj.some(cellHelpers.isVisible);
}

const isOverlapping = (obj1: ICell[], obj2: ICell[]) => {
  return obj1.some(c1 => obj2.some(c2 => cellHelpers.isEqual(c1, c2)));
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
  isObjectCell,
  isOutsideScreen,
  isOverlapping,
  isVisible,
  isVisibleOrAbove,
  move,
}
