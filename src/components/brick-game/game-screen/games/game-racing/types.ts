import {Direction, ICell} from "@global/types";

export interface IRacingCar {
  position: Direction;
  offsetY: number;
  cells: ICell[];
}
