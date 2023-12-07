import {Direction, Figure, ICell} from "@global/types";
import getTetrisFigure from "./tetris";

const isTetrisFigure = (figure: Figure) => {
  return [
    Figure.BlockI,
    Figure.BlockJ,
    Figure.BlockL,
    Figure.BlockO,
    Figure.BlockS,
    Figure.BlockT,
    Figure.BlockZ
  ].includes(figure);
}

const get = (figure: Figure, direction: Direction = Direction.Up, offset: ICell = null): ICell[] => {
  if (isTetrisFigure(figure)) {
    return getTetrisFigure(figure, direction, offset);
  }
  return [];
}

const rotate = () => {
  
}

const rotateRight = () => {
  
}

export const figureHelpers = {
  get,
  rotate,
  rotateRight,
}