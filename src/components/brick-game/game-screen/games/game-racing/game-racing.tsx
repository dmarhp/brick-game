import {Component, h, Listen, State, Watch} from "@stencil/core";
import helpers from "./helpers";
import {IRacingBorders, IRacingCompetitorCar} from "./types";
import {ControlButton, Direction, GameStatus, ICell} from "@global/types";
import {commonHelpers} from "@global/helpers/common";
import {controlsHelpers} from "@global/helpers/controls";
import {gameHelpers} from "@global/helpers/game";
import {screenHelpers} from "@global/helpers/screen";
import gameStore from "@stores/game-store";

@Component({
  tag: 'game-racing',
})
export class GameRacing {
  @State() activeCells: ICell[] = [];
  @State() borders: IRacingBorders = {left: [], right: []};
  @State() playersCar: ICell[] = [];
  @State() position = Direction.Left;
  @State() competitors: IRacingCompetitorCar[] = [];
  @State() moveInterval = 100;

  @Watch('position')
  positionChangeHandler() {
    this.playersCar = helpers.getCar(this.position);
  }

  @Watch('borders')
  @Watch('competitors')
  @Watch('playersCar')
  activeCellsChangeHandler() {
    this.activeCells = this.getActiveCells();
  }

  @Listen('controlButtonClick', {target: 'window'})
  async controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    switch (detail) {
      case ControlButton.Right:
      case ControlButton.Left:
        if (!gameHelpers.isFinished()) {
          this.position = controlsHelpers.getDirectionFromControlButton(detail);
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
      await this.moveCar();
    }
  }

  async drive() {
    await this.moveCar();
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
  
  async moveCar() {
    if (gameHelpers.isFinished()) {
      return;
    }

    this.borders = helpers.moveBorders(this.borders);
    this.competitors = helpers.updateCompetitorsAfterMove(this.competitors);
    const isCarCrashed = helpers.isCarCrashed(this.competitors, this.position);
    if (isCarCrashed) {
      await this.finishGame();
      return;
    }
  }

  async showCrashedCar() {
    let i = 0
    while (i < 5) {
      this.playersCar = helpers.getCrashedCar(this.position, i % 2 === 0);
      await commonHelpers.sleep(150);
      i++;
    }
    this.playersCar = [];
  }

  getInitialGameState() {
    this.borders = helpers.getInitialBorders();
    this.playersCar = helpers.getCar();
    this.competitors = helpers.getInitialCompetitors();
    this.position = Direction.Left;
    gameHelpers.setStatus(GameStatus.NewGame);
    this.moveInterval = 100;
  }

  getActiveCells() {
    const borders = [...this.borders.right, ...this.borders.left];
    const competitors = this.competitors.map(({cells}) => cells).flat();
    return [...borders, ...competitors, ...this.playersCar];
  }

  render() {
    return (
      <brick-screen
        activeCells={this.activeCells}
      />
    );
  }
}
