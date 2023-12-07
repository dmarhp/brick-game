import {Direction, Figure, ICell} from "@global/types";
import getCarFigure from "./cars";
import getCommonFigure from "./common";
import getTankFigure from "./tanks";
import getTetrisFigure from "./tetris";

const applyOffset = (figure: ICell[], offset: ICell): ICell[] => {
  return figure.map(({x, y}) => ({x: x + offset.x, y: y + offset.y}));
}

const get = (figure: Figure, offset = {x: 0, y: 0},direction: Direction = Direction.Up, blink = false): ICell[] => {
  let cells: ICell[] = [];

  switch (figure) {
    case Figure.Car:
    case Figure.CarPlayer:
      cells = getCarFigure(figure);
      break;
    case Figure.Crash1:
    case Figure.Crash2:
      cells = getCommonFigure(figure);
      break;
    case Figure.Tank:
    case Figure.TankPlayer:
      cells = getTankFigure(figure, direction);
      break;
    case Figure.BlockI:
    case Figure.BlockJ:
    case Figure.BlockL:
    case Figure.BlockO:
    case Figure.BlockS:
    case Figure.BlockT:
    case Figure.BlockZ:
      cells = getTetrisFigure(figure, direction);
      break;
    default:
      return [];
  }

  return applyOffset(cells, offset).map(c => ({...c, blink}));
}


export const figureHelpers = {
  get,
}