import {Direction, ICell} from "@global/types";

export interface ITank extends ICell {
  id?: string;
  isPlayer?: boolean;
  direction: Direction;
  moveType?: EnemyMoveType;
  cells?: ICell[];
}

export interface IBullet extends ICell {
  direction: Direction;
  isPlayer?: boolean;
}

export enum EnemyMoveType {
  None = 0,
  Move = 1,
  Rotate = 2,
  Shoot = 3,
}
