import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {ICell} from "@global/types";

const compareTwoCells = (cell1: ICell, cell2: ICell) => {
  return cell1?.x === cell2?.x && cell1?.y === cell2?.y;
}

const compareTwoCellArrays = (arr1: ICell[], arr2: ICell[]) => {
  return arr1.every(c1 => arr2.some(c2 => c1.x === c2.x && c1.y === c2.y));
}

const getEmptyScreenCells = (width: number = SCREEN_WIDTH, height: number = SCREEN_HEIGHT) => {
  const screen: ICell[][] = [];
  for (let y = height - 1; y >= 0; y--) {
    const row = getEmptyRow(width, y);
    screen.push(row);
  }
  return screen;
}

const getEmptyRow = (width: number = SCREEN_WIDTH, y = 0) => {
  const row: ICell[] = [];
  for (let x = 0; x < width; x++) {
    row.push({x, y});
  }
  return row;
}

const getRandomCell = (): ICell => {
  const x = Math.floor(Math.random() * SCREEN_WIDTH);
  const y = Math.floor(Math.random() * SCREEN_HEIGHT);
  return {x, y};
}

const isCellOutsideScreen = ({x, y}: ICell) => {
  return x < 0 || x >= SCREEN_WIDTH || y < 0 || y >= SCREEN_HEIGHT;
}

const isCellInsideScreen = ({x, y}: ICell) => {
  return x >= 0 && x < SCREEN_WIDTH && y >= 0 && y < SCREEN_HEIGHT;
}

export const cellHelpers = {
  compareTwoCells,
  compareTwoCellArrays,
  getEmptyScreenCells,
  getRandomCell,
  isCellInsideScreen,
  isCellOutsideScreen
}
