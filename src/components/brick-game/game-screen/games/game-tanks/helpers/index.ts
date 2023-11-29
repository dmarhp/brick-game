import {EnemyMoveType, IBullet, ITank} from "../types";
import {objectsHelpers} from "@global/helpers/objects";
import {Direction} from "@global/types";
import {gameHelpers} from "@global/helpers/game";
import {tankCellHelpers} from "./cells";
import store from "../../../../../../stores/game-tanks-store";
import {cellHelpers} from "@global/helpers/cells";
import {nanoid} from 'nanoid'

const getEnemyMoveType = (): EnemyMoveType => {
  return Math.random() < 0.67 ? 1 : 2;
}

const moveEnemy = (enemy: ITank) => {
  const moveType = getEnemyMoveType();
  let newDirection = moveType === EnemyMoveType.Rotate
    ? objectsHelpers.getRandomDirection()
    : null;

  let updatedEnemy = moveTank(enemy, newDirection);

  if (cellHelpers.compareTwoCellArrays(updatedEnemy.cells, enemy.cells)) {
    newDirection = objectsHelpers.getRandomDirection();
    updatedEnemy = moveTank(enemy, newDirection);
  }
  return updatedEnemy;
}

const moveTank = (tank: ITank, direction: Direction = null) => {
  if (tank.isPlayer && gameHelpers.isFinished()) {
    return tank;
  }

  let updatedTank: ITank = {...tank};

  if (direction && direction !== tank.direction) {
    updatedTank.direction = direction;
    updatedTank.cells = tankCellHelpers.getTank(updatedTank);
  } else {
    const {x, y} = objectsHelpers.moveObject(tank) as ITank;
    updatedTank.x = x;
    updatedTank.y = y;
    updatedTank.cells = tankCellHelpers.getTank(updatedTank);
  }

  if (tankCellHelpers.canBePlaced(updatedTank)) {
    return updatedTank;
  }

  return tank;
}

const placeNewEnemy = () => {
  const {x, y} = cellHelpers.getRandomCell();
  const direction = objectsHelpers.getRandomDirection();
  const enemy: ITank = {x, y, direction};
  enemy.cells = tankCellHelpers.getTank(enemy);

  const {enemies, player} = store.state
  const otherTanks = [...enemies, player];
  const isSomeCellsTakenByOtherTanks = tankCellHelpers.isSomeCellTakenByOtherTanks(enemy, otherTanks);

  if (!tankCellHelpers.isOutsideScreen(enemy) && !isSomeCellsTakenByOtherTanks) {
    enemy.id = nanoid();
    store.state.enemies.push(enemy);
  } else {
    placeNewEnemy();
  }
}

const moveBullet = (bullet: IBullet) => {
  const {enemies} = store.state;
  const {x, y} = objectsHelpers.moveObject(bullet)

  const updatedBullet = {...bullet, x, y};
  const destroyedEnemy = enemies.find(({cells}) => cells.some(c => c.x === x && c.y === y));

  if (destroyedEnemy) {
    store.state.enemies = store.state.enemies.filter(e => e.id !== destroyedEnemy.id);
    setTimeout(() => placeNewEnemy(), 500);
    return null;
  }
  return updatedBullet
}

export default {
  moveEnemy,
  moveTank,
  placeNewEnemy,
  moveBullet
}