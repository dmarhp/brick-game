import {Direction, ICell} from "@global/types";

export interface IRacingBorders {
  left: ICell[];
  right: ICell[];
}

export interface IRacingCompetitorCar {
  position: Direction;
  offsetY: number;
  cells: ICell[];
}
