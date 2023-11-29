import {Component, h, Listen} from "@stencil/core";
import {ControlButton, Direction} from "@global/types";
import {controlsHelpers} from "@global/helpers/controls";
import store from "../../../../../stores/game-tanks-store";
import helpers from "./helpers";
import {tankCellHelpers} from "./helpers/cells";

@Component({
  tag: 'game-tanks',
  styleUrl: 'game-tanks.scss'
})
export class GameTanks {
  private enemyMoveInterval = 500;

  @Listen('controlButtonClick', {target: 'window'})
  controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    if (controlsHelpers.isDirectionButton(detail)) {
      const direction = controlsHelpers.getDirectionFromControlButton(detail);
      this.movePlayer(direction);
    } else if (detail === ControlButton.Rotate) {
      this.shoot();
    }
  }

  componentWillLoad() {
    this.updatePlayersCells();
    this.placeInitialEnemies();
    this.moveBullets();
    this.moveEnemies();
  }

  updatePlayersCells() {
    store.state.player.cells = tankCellHelpers.getTank(store.state.player);
    store.state.player.id = 'player';
  }

  movePlayer(direction: Direction) {
    store.state.player = helpers.moveTank(store.state.player, direction);
  }

  moveEnemies() {
    const {enemies} = store.state;
    for (let i = 0; i < enemies.length; i++) {
      store.state.enemies[i] = helpers.moveEnemy(enemies[i]);
    }

    setTimeout(() => this.moveEnemies(), this.enemyMoveInterval);
  }

  placeInitialEnemies() {
    helpers.placeNewEnemy();
    helpers.placeNewEnemy();
    helpers.placeNewEnemy();
  }

  moveBullets() {
    store.state.playerBullets = store.state.playerBullets
      .map(helpers.moveBullet)
      .filter(b => !!b);

    setTimeout(() => this.moveBullets(), 150);
  }

  shoot() {
    store.state.playerBullets.push({...store.state.player, isPlayer: true});
  }

  render() {
    const {player, playerBullets, enemies} = store.state;
    const activeCells = [
      ...player.cells,
      ...playerBullets,
      ...enemies.map(e => e.cells).flat()
    ];
    return (
      <brick-screen
        activeCells={activeCells}
      />
    );
  }
}
