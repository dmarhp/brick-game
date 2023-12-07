import {EnemyMoveType, IBullet, ITank} from "./types";
import {objectHelpers} from "@global/helpers/objects";
import {Direction, Figure} from "@global/types";
import {gameHelpers} from "@global/helpers/game";
import store from "@stores/game-tanks-store";
import {cellHelpers} from "@global/helpers/cells";
import {nanoid} from 'nanoid'
import {directionHelpers} from "@global/helpers/direction";
import {figureHelpers} from "@global/helpers/figures";

const canBePlaced = (tank: ITank) => {
  if (!objectHelpers.isVisible(tank.cells)) {
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

const getEnemyMoveType = (): EnemyMoveType => {
  return Math.random() < 0.67 ? 1 : 2;
}

const getTankCells = (tank: ITank) => {
  const {isPlayer, y, x, blink, direction} = tank;
  const figure = isPlayer ? Figure.TankPlayer : Figure.Tank;
  
  return figureHelpers.get(figure, {x,y}, direction, blink);
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

const isSomeCellTakenByOtherTanks = ({cells}: ITank, tanks: ITank[]) => {
  const otherTanksCells = tanks.map(t => t.cells || []).flat();
  return cells.some((c) => otherTanksCells.some(({x, y}) => c.x === x && c.y === y));
}

const moveTank = (tank: ITank, direction: Direction = null) => {
  if (tank.isPlayer && gameHelpers.isFinished()) {
    return tank;
  }

  let updatedTank: ITank = {...tank};

  if (direction && direction !== tank.direction) {
    updatedTank.direction = direction;
    updatedTank.cells = getTankCells(updatedTank);
  } else {
    const {x, y} = cellHelpers.move(tank, tank.direction);
    updatedTank.x = x;
    updatedTank.y = y;
    updatedTank.cells = getTankCells(updatedTank);
  }

  if (canBePlaced(updatedTank)) {
    return updatedTank;
  }

  return tank;
}

const placeNewEnemy = () => {
  const {x, y} = cellHelpers.getRandom();
  const direction = directionHelpers.getRandom();
  const enemy: ITank = {x, y, direction};
  enemy.cells = getTankCells(enemy);

  const {enemies, player} = store.state
  const otherTanks = [...enemies, player];
  const isSomeCellsTakenByOtherTanks = isSomeCellTakenByOtherTanks(enemy, otherTanks);

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
  getTankCells,
  moveEnemy,
  moveTank,
  placeNewEnemy,
  moveBullet,
  moveEnemyBullet
}
