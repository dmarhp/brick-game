import {Component, h, Listen} from "@stencil/core";
import {ControlButton, Direction, GameStatus} from "@global/types";
import {controlsHelpers} from "@global/helpers/controls";
import store from "../../../../../stores/game-tanks-store";
import helpers from "./helpers";
import {commonHelpers} from "@global/helpers/common";
import {gameHelpers} from "@global/helpers/game";
import {screenHelpers} from "@global/helpers/screen";

@Component({
  tag: 'game-tanks',
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

    store.onChange('isPlayerDestroyed', this.finishGameIfPlayerIsDestroyed.bind(this));
  }

  async finishGameIfPlayerIsDestroyed() {
    const {isPlayerDestroyed, player} = store.state;
    if (!isPlayerDestroyed) {
      return;
    }

    const initialPlayersCells = [...player.cells];
    const updatedPlayersCells = player.cells.map(c => ({...c, blink: true}));
    store.state.player = {...player, cells: updatedPlayersCells};
    await commonHelpers.sleep(2000);
    store.state.player = {...player, cells: initialPlayersCells};
    store.state.isPlayerDestroyed = false;
    gameHelpers.setStatus(GameStatus.Lose);
    
    if (gameHelpers.isLastLive()) {
      const activeCells = this.getActiveCells();
      await screenHelpers.clearScreen(activeCells);
    }

    gameHelpers.handleLose();
  }

  updatePlayersCells() {
    store.state.player.cells = helpers.getTankCells(store.state.player);
    store.state.player.id = 'player';
  }

  movePlayer(direction: Direction) {
    store.state.player = helpers.moveTank(store.state.player, direction);
  }

  moveEnemies() {
    const {enemies} = store.state;
    for (let i = 0; i < enemies.length; i++) {
      helpers.moveEnemy(i);
    }

    setTimeout(() => this.moveEnemies(), this.enemyMoveInterval);
  }

  placeInitialEnemies() {
    helpers.placeNewEnemy();
    helpers.placeNewEnemy();
    helpers.placeNewEnemy();
  }

  moveBullets() {
    const playerBullets = store.state.playerBullets
      .map(helpers.moveBullet)
      .filter(b => !!b);

    const enemyBullets = store.state.enemyBullets
      .map(helpers.moveEnemyBullet)
      .filter(b => !!b);

    store.state.playerBullets = playerBullets;
    store.state.enemyBullets = enemyBullets;

    setTimeout(() => this.moveBullets(), 200);
  }

  shoot() {
    store.state.playerBullets.push({...store.state.player, isPlayer: true});
  }
  
  getActiveCells() {
    const {player, playerBullets, enemies, enemyBullets} = store.state;
     return [
      ...player.cells,
      ...playerBullets,
      ...enemyBullets,
      ...enemies.map(e => e.cells).flat()
    ];
  }

  render() {
    return (
      <brick-screen
        activeCells={this.getActiveCells()}
      />
    );
  }
}
