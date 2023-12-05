import {EnemyMoveType, IBullet, ITank} from "../types";
import {objectHelpers} from "@global/helpers/objects";
import {Direction} from "@global/types";
import {gameHelpers} from "@global/helpers/game";
import {tankCellHelpers} from "./cells";
import store from "../../../../../../stores/game-tanks-store";
import {cellHelpers} from "@global/helpers/cells";
import {nanoid} from 'nanoid'
import {directionHelpers} from "@global/helpers/direction";

const getEnemyMoveType = (): EnemyMoveType => {
  return Math.random() < 0.67 ? 1 : 2;
}

const moveEnemy = (i: number) => {
  const enemy = store.state.enemies[i];
  const moveType = getEnemyMoveType();
  let newDirection = moveType === EnemyMoveType.Rotate
    ? directionHelpers.getRandom()
    : null;

  let updatedEnemy = moveTank(enemy, newDirection);

  if (objectHelpers.isOverlapping(updatedEnemy.cells, enemy.cells)) {
    newDirection = directionHelpers.getRandom();
    updatedEnemy = moveTank(enemy, newDirection);
  }
  
  const shouldShoot = Math.floor(Math.random() * 6) === 0 && !store.state.isPlayerDestroyed;
  
  if (shouldShoot) {
    store.state.enemyBullets.push({...enemy} as IBullet);
  }
  
  store.state.enemies[i] = updatedEnemy;
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
    const {x, y} = cellHelpers.move(tank, tank.direction);
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
  const {x, y} = cellHelpers.getRandom();
  const direction = directionHelpers.getRandom();
  const enemy: ITank = {x, y, direction};
  enemy.cells = tankCellHelpers.getTank(enemy);

  const {enemies, player} = store.state
  const otherTanks = [...enemies, player];
  const isSomeCellsTakenByOtherTanks = tankCellHelpers.isSomeCellTakenByOtherTanks(enemy, otherTanks);

  if (objectHelpers.isVisible(enemy.cells) && !isSomeCellsTakenByOtherTanks) {
    enemy.id = nanoid();
    store.state.enemies.push(enemy);
  } else {
    placeNewEnemy();
  }
}

const moveBullet = (bullet: IBullet) => {
  const {enemies, enemyBullets} = store.state;
  const {x, y} = cellHelpers.move(bullet, bullet.direction);

  const updatedBullet: IBullet = {...bullet, x, y};
  const destroyedEnemy = enemies.find(({cells}) => objectHelpers.isObjectCell(cells, updatedBullet));
  const destroyedEnemyBullet = enemyBullets.find(b => cellHelpers.isEqual(b, updatedBullet) || cellHelpers.isEqual(b, bullet));

  if (destroyedEnemy) {
    store.state.enemies = store.state.enemies.filter(e => e.id !== destroyedEnemy.id);
    setTimeout(() => placeNewEnemy(), 500);
  }
  
  if (destroyedEnemyBullet) {
    store.state.enemyBullets = store.state.enemyBullets.filter(b => !cellHelpers.isEqual(b, updatedBullet));
  }
  
  if (destroyedEnemyBullet || destroyedEnemy) {
    return null;
  }
  return updatedBullet
}

const moveEnemyBullet = (bullet: IBullet) => {
  const {player, isPlayerDestroyed} = store.state;
  const {x, y} = cellHelpers.move(bullet, bullet.direction);
  const updatedBullet: IBullet = {...bullet, x, y};
  const isPlayerDestroyedByBullet = objectHelpers.isObjectCell(player.cells, updatedBullet);
  if (isPlayerDestroyedByBullet && !isPlayerDestroyed) {
    store.state.isPlayerDestroyed = true;
    return null;
  }
  return updatedBullet;
}

export default {
  moveEnemy,
  moveTank,
  placeNewEnemy,
  moveBullet,
  moveEnemyBullet
}
