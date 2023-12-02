import {Component, h, Listen, State, Watch} from "@stencil/core";
import helpers from "./helpers";
import {IRacingBorders, IRacingCompetitorCar} from "./types";
import {ControlButton, Direction, Game, GameStatus, ICell} from "@global/types";
import globalStore from "@stores/global-store";
import statsStore from "@stores/stats-store";
import {commonHelpers} from "@global/helpers/common";
import {controlsHelpers} from "@global/helpers/controls";
import {gameHelpers} from "@global/helpers/game";
import {SCREEN_HEIGHT} from "@global/constants";
import {screenHelpers} from "@global/helpers/screen";

@Component({
  tag: 'game-racing',
  styleUrl: 'game-racing.scss'
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
        await this.startGame();
        break;
    }
  }

  componentWillLoad() {
    this.getInitialGameState();
  }

  async drive() {
    this.borders = helpers.moveBorders(this.borders);
    this.competitors = helpers.updateCompetitorsAfterMove(this.competitors);
    const isCarCrashed = helpers.isCarCrashed(this.competitors, this.position);
    if (isCarCrashed) {
      await this.finishGame();
      return;
    }

    if (!statsStore.state.pause) {
      setTimeout(() => this.drive(), this.moveInterval);
    }
  }

  async finishGame() {
    globalStore.state.gameStatus = GameStatus.Lose;
    await this.showCrashedCar();

    let i = SCREEN_HEIGHT;

    while (i > 0) {
      i--;
      this.activeCells = screenHelpers.fillRow(this.activeCells, i);
      await commonHelpers.sleep(50);
    }

    while (i < SCREEN_HEIGHT) {
      this.activeCells = screenHelpers.clearRow(this.activeCells, i);
      await commonHelpers.sleep(50);
      i++;
    }

    globalStore.state.game = Game.None;
  }

  async showCrashedCar() {
    let i = 0
    while (i < 5) {
      this.playersCar = helpers.getCrashedCar(this.position, i % 2 === 0);
      await commonHelpers.sleep(150);
      i++;
    }
  }

  async startGame() {
    if (globalStore.state.gameStatus === GameStatus.NewGame) {
      await this.drive();
    }
  }

  getInitialGameState() {
    this.borders = helpers.getInitialBorders();
    this.playersCar = helpers.getCar();
    this.competitors = helpers.getInitialCompetitors();
    this.position = Direction.Left;
    this.moveInterval = 100;
    statsStore.reset();
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
