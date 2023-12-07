import {Direction, ICell, View} from "@global/types";
import {SCREEN_WIDTH} from "@global/constants";
import globalStore from "@stores/global-store";
import {commonHelpers} from "@global/helpers/common";
import {objectHelpers} from "@global/helpers/objects";

const clearRow = (cells: ICell[], row: number) => {
  return cells.filter(({y}) => y !== row);
}

const clearScreen = async (cells: ICell[]) => {
  const prevView = globalStore.state.view;
  setView(View.ClearScreen);
  commonHelpers.dispatchCustomEvent('clear-screen.start', {cells});

  const eventName = 'clear-screen.finish';
  return new Promise((resolve) => {
    const listener = () => {
      document.removeEventListener(eventName, listener);
      setView(prevView);
      resolve(true);
    }
    document.addEventListener(eventName, listener);
  });
}

const fillRow = (cells: ICell[], row: number) => {
  const activeRow = getRow(row);

  return cells
    .filter(({y}) => y !== row)
    .concat(activeRow);
}

const getRow = (row: number, width = SCREEN_WIDTH) => {
  return [...Array(width).keys()]
    .map(x => ({x, y: row} as ICell));
}

const isColumnActive = (activeCells: ICell[], col: number) => {
  const colActiveCells = activeCells.filter(({x}) => x === col);
  return colActiveCells.length === SCREEN_WIDTH
}

const isRowActive = (activeCells: ICell[], row: number) => {
  const rowActiveCells = activeCells.filter(({y}) => y === row);
  return rowActiveCells.length === SCREEN_WIDTH;
}

const removeRowAndMoveCells = (cells: ICell[], row: number, direction: Direction = Direction.Down) => {
  const cellsBelow = cells.filter(c => c.y < row);
  const cellsAbove = cells.filter(c => c.y > row);

  if (direction === Direction.Up) {
    return [...cellsAbove, ...objectHelpers.move(cellsBelow, Direction.Up)];
  } else {
    return [...cellsBelow, ...objectHelpers.move(cellsAbove, Direction.Down)];
  }
}

const setView = (view: View) => {
  // timeout to prevent blink when switching between views
  setTimeout(() => {
    globalStore.state.view = view;
  }, 50);
}

export const screenHelpers = {
  clearRow,
  clearScreen,
  fillRow,
  getRow,
  removeRowAndMoveCells,
  isColumnActive,
  isRowActive,
  setView,
}
