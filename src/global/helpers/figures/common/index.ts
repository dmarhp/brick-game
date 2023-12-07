import {Figure, ICell} from "@global/types";

const getCrashFirstFrame = (): ICell[] => {
  return [
    {y: 0, x: 0},
    {y: 0, x: 3},
    {y: 1, x: 1},
    {y: 1, x: 2},
    {y: 2, x: 1},
    {y: 2, x: 2},
    {y: 3, x: 0},
    {y: 3, x: 3}
  ];
}

const getCrashSecondFrame = (): ICell[] => {
  return [
    {y: 0, x: 1},
    {y: 0, x: 2},
    {y: 1, x: 0},
    {y: 1, x: 3},
    {y: 2, x: 0},
    {y: 2, x: 3},
    {y: 3, x: 1},
    {y: 3, x: 2}
  ];
}

export default (figure: Figure): ICell[] => {
  switch (figure) {
    case Figure.Crash1:
      return getCrashFirstFrame();
    case Figure.Crash2:
      return getCrashSecondFrame();
    default:
      return [];
  }
}
