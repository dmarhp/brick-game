import {ICell} from "@global/types";
import {SCREEN_WIDTH} from "@global/constants";

const getIndexOfNextRowWithActiveCells = (cells: ICell[], row: number) => {
  const filteredCells = cells.filter(({y}) => y > row);

  if (filteredCells.length === 0) {
    return null;
  }

  const nextRow = filteredCells.reduce((min, cell) => (cell.y < min.y ? cell : min), filteredCells[0]);
  return nextRow.y;
}

const isColumnActive = (activeCells: ICell[], col: number) => {
  const colActiveCells = activeCells.filter(({x}) => x === col);
  return colActiveCells.length === SCREEN_WIDTH
}

const isRowActive = (activeCells: ICell[], row: number) => {
  const rowActiveCells = activeCells.filter(({y}) => y === row);
  return rowActiveCells.length === SCREEN_WIDTH;
}

export const screenHelpers = {
  getIndexOfNextRowWithActiveCells,
  isColumnActive,
  isRowActive,
}
