import {Direction, Figure, ICell} from "@global/types";
import {SCREEN_HEIGHT} from "@global/constants";
import {figureHelpers} from "@global/helpers/figures";

const getInitialFilledRows = () => {
  const rows: ICell[][] = [];
  let y = SCREEN_HEIGHT - 1;

  while (y >= SCREEN_HEIGHT - 3) {
    const row = getRandomlyFilledRow(y)
    rows.push(row);
    y--;
  }

  return rows.flat();
}

const getPlayer = (position: number) => {
  const offset = {x: position - 1, y: 0};
  return figureHelpers.get(Figure.BlockT, offset, Direction.Up);
}

const getRandomlyFilledRow = (y: number = SCREEN_HEIGHT - 1, min: number = 5, max: number = 8): ICell[] => {
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  const uniqueNumbers = new Set<number>();
  while (uniqueNumbers.size < length) {
    const randomNumber = Math.floor(Math.random() * 10);
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers).map((x: number) => ({x, y}))
}

export default {
  getInitialFilledRows,
  getPlayer,
  getRandomlyFilledRow,
}