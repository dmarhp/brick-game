import {Direction, ICell} from "@global/types";
import {cellHelpers} from "@global/helpers/cells";
import statsStore from "@stores/stats-store";

const getCell = (obj: ICell[] = [], x:number, y: number) => {
  return obj.find(c => c.x === x && c.y === y);
}

const getLives = () => {
  const lives: ICell[] = []
  for (let i=0; i< statsStore.state.lives; i++) {
    lives.push({x: 0, y: i});
  }
  return lives;
}

const isObjectCell = (obj: ICell[] = [], cell: ICell) => {
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
  getCell,
  getLives,
  isObjectCell,
  isOutsideScreen,
  isOverlapping,
  isVisible,
  isVisibleOrAbove,
  move,
}
