import {Figure, ICell} from "@global/types";

const getCar = (isPlayer: boolean) => {
  const cells: ICell[] = [
    {y: 0, x: -1},
    {y: 0, x: 1},
    {y: 1, x: 0},
    {y: 2, x: -1},
    {y: 2, x: 0},
    {y: 2, x: 1},
    {y: 3, x: 0},
  ];

  if (isPlayer) {
    cells.push({y: 0, x: 0});
  }

  return cells;
}



export default (figure: Figure): ICell[] => {
  const isPlayer = figure === Figure.CarPlayer;
  return getCar(isPlayer);
}
