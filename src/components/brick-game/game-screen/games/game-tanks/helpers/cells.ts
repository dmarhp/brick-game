import {ITank} from "../types";
import {Direction, ICell} from "@global/types";
import {cellHelpers} from "@global/helpers/cells";
import store from "../../../../../../stores/game-tanks-store";

const getTankWithDownDirection = ({x, y, isPlayer}: ITank): ICell[] => {
  const tankCells: ICell[] = [
    {y: y + 1, x: x - 1},
    {y: y + 1, x: x + 1},
    {y: y + 0, x: x - 1},
    {y: y + 0, x: x + 0},
    {y: y + 0, x: x + 1},
    {y: y - 1, x: x + 0},
  ];

  if (isPlayer) {
    tankCells.push({y: y + 1, x: x + 0})
  }
  return tankCells;
}

const getTankWithUpDirection = ({x, y, isPlayer}: ITank): ICell[] => {
  const tankCells: ICell[] = [
    {y: y + 1, x: x + 0},
    {y: y + 0, x: x - 1},
    {y: y + 0, x: x + 0},
    {y: y + 0, x: x + 1},
    {y: y - 1, x: x - 1},
    {y: y - 1, x: x + 1},
  ];

  if (isPlayer) {
    tankCells.push({y: y - 1, x: x + 0})
  }
  return tankCells;
}

const getTankWithRightDirection = ({x, y, isPlayer}: ITank): ICell[] => {
  const tankCells: ICell[] = [
    {y: y + 1, x: x - 1},
    {y: y + 1, x: x + 0},
    {y: y + 0, x: x + 0},
    {y: y + 0, x: x + 1},
    {y: y - 1, x: x - 1},
    {y: y - 1, x: x + 0},
  ];

  if (isPlayer) {
    tankCells.push({y: y + 0, x: x - 1})
  }

  return tankCells
}
const getTankWithLeftDirection = ({x, y, isPlayer}: ITank): ICell[] => {
  let tankCells: ICell[] = [
    {y: y + 1, x: x + 1},
    {y: y + 1, x: x + 0},
    {y: y + 0, x: x - 1},
    {y: y + 0, x: x + 0},
    {y: y - 1, x: x + 1},
    {y: y - 1, x: x + 0},
  ];

  if (isPlayer) {
    tankCells.push({y: y + 0, x: x + 1})
  }

  return tankCells;
}

const getTank = (tank: ITank): ICell[] => {
  let tankCells: ICell[] = [];
  switch (tank.direction) {
    case Direction.Up:
      tankCells = getTankWithUpDirection(tank);
      break;
    case Direction.Down:
      tankCells = getTankWithDownDirection(tank);
      break;
    case Direction.Right:
      tankCells = getTankWithRightDirection(tank);
      break;
    case Direction.Left:
      tankCells = getTankWithLeftDirection(tank);
      break;
  }

  if (tank.blink) {
    tankCells = tankCells.map(c => ({...c, blink: true}));
  }

  return tankCells;
}

const isOutsideScreen = ({cells}: ITank) => {
  return cells.some(cellHelpers.isCellOutsideScreen);
}

const isSomeCellTakenByOtherTanks = ({cells}: ITank, tanks: ITank[]) => {
  const otherTanksCells = tanks.map(t => t.cells || []).flat();
  return cells.some((c) => otherTanksCells.some(({x, y}) => c.x === x && c.y === y));
}

const canBePlaced = (tank: ITank) => {

  if (isOutsideScreen(tank)) {
    return false;
  }

  const {enemies, player} = store.state;
  let otherTanks = enemies;

  if (!tank.isPlayer) {
    otherTanks = enemies.filter(({id}) => id !== tank.id);
    otherTanks.push(player);
  }

  return !isSomeCellTakenByOtherTanks(tank, otherTanks);
}

export const tankCellHelpers = {
  getTank,
  isOutsideScreen,
  isSomeCellTakenByOtherTanks,
  canBePlaced,
}
