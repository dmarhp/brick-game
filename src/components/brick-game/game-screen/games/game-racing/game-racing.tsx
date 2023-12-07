import {Component, h, Listen, State} from "@stencil/core";
import helpers from "./helpers";
import {IRacingCar} from "./types";
import {ControlButton, Direction, GameStatus, IBorders} from "@global/types";
import {commonHelpers} from "@global/helpers/common";
import {controlsHelpers} from "@global/helpers/controls";
import {gameHelpers} from "@global/helpers/game";
import {screenHelpers} from "@global/helpers/screen";
import gameStore from "@stores/game-store";
import {borderHelpers} from "@global/helpers/borders";

@Component({
  tag: 'game-racing',
})
export class GameRacing {
  @State() borders: IBorders = {left: [], right: []} as IBorders;
  @State() competitors: IRacingCar[] = [];
  @State() player = {cells: []} as IRacingCar;
  @State() moveInterval = 100;

  @Listen('controlButtonClick', {target: 'window'})
  async controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    switch (detail) {
      case ControlButton.Right:
      case ControlButton.Left:
        if (!gameHelpers.isFinished()) {
          const position = controlsHelpers.getDirectionFromControlButton(detail);
          this.player = helpers.getPlayer(position);
        }
        break;
      case ControlButton.Up:
      case ControlButton.Rotate:
        await this.driveButtonHandler();
        break;
    }
  }

  componentWillLoad() {
    this.getInitialGameState();
  }

  async driveButtonHandler() {
    if (gameHelpers.canStart()) {
      gameHelpers.start();
      await this.drive();
      return;
    } else {
      await this.moveCompetitorsAndBorders();
    }
  }

  async drive() {
    await this.moveCompetitorsAndBorders();
    const {gameStatus, pause} = gameStore.state;

    if (!pause && gameStatus === GameStatus.Play) {
      setTimeout(() => this.drive(), this.moveInterval);
    }
  }

  async finishGame() {
    gameHelpers.setStatus(GameStatus.Lose);
    await this.showCrashedCar();
    const activeCells = this.getActiveCells();
    await screenHelpers.clearScreen(activeCells);
    gameHelpers.handleLose();

    if (gameHelpers.hasLives()) {
      this.getInitialGameState();
    }
  }

  async moveCompetitorsAndBorders() {
    if (gameHelpers.isFinished()) {
      return;
    }

    this.borders = borderHelpers.moveBorders(this.borders, Direction.Down);

    const updatedCompetitors = this.competitors
      .map(helpers.moveCompetitor)
      .filter(c => c);

    if (updatedCompetitors < this.competitors) {
      gameStore.state.score++;
    }

    if (helpers.shouldPlaceNewCompetitor(updatedCompetitors)) {
      const newCompetitor = helpers.getCompetitor();
      updatedCompetitors.push(newCompetitor);
    }

    const isPlayerCrashed = helpers.isPlayerCrashed(updatedCompetitors, this.player);
    if (isPlayerCrashed) {
      await this.finishGame();
      return;
    }

    this.competitors = updatedCompetitors;
  }

  async showCrashedCar() {
    let i = 0
    while (i < 5) {
      const frame = i % 2 === 0 ? 1 : 2;
      this.player = helpers.getCrashedCar(this.player, frame);
      await commonHelpers.sleep(150);
      i++;
    }
    this.player = {...this.player, cells: []};
  }

  getActiveCells() {
    const player = this.player.cells;
    const borders = [...this.borders.right, ...this.borders.left];
    const competitors = this.competitors.map(({cells}) => cells).flat();
    return [...borders, ...competitors, ...player];
  }

  getInitialGameState() {
    const borderPattern = [true, true, true, false, false];
    this.borders = borderHelpers.getVerticalBorders(borderPattern);
    this.competitors = helpers.getInitialCompetitors()
    this.player = helpers.getPlayer();

    gameHelpers.setStatus(GameStatus.NewGame);
    this.moveInterval = 100;
  }

  render() {
    return (
      <brick-screen
        activeCells={this.getActiveCells()}
      />
    );
  }
}
