import {ICell} from "@global/types";

export interface IRacingBorders {
  left: ICell[];
  right: ICell[];
}

export enum CarPosition {
  Left,
  Right
}

export interface IRacingCompetitorCar {
  position: CarPosition;
  offsetY: number;
  cells: ICell[];
}
