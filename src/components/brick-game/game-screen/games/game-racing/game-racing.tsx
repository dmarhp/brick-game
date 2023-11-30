import {Component, h, Listen, State, Watch} from "@stencil/core";
import helpers from "./helpers";
import statsStore from "../../../../../stores/stats-store";
import {CarPosition, IRacingBorders, IRacingCompetitorCar} from "./types";
import {ControlButton, GameStatus, ICell} from "@global/types";
import globalStore from "../../../../../stores/global-store";

@Component({
  tag: 'game-racing',
  styleUrl: 'game-racing.scss'
})
export class GameRacing {
  @State() borders: IRacingBorders = {left: [], right: []};
  @State() playersCar: ICell[] = [];
  @State() position = CarPosition.Left;
  @State() competitors: IRacingCompetitorCar[];
  @State() moveInterval = 100;

  @Watch('position')
  positionChangeHandler() {
    this.playersCar = helpers.getCar(this.position);
  }

  @Listen('controlButtonClick', {target: 'window'})
  controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    switch (detail) {
      case ControlButton.Right:
        this.position = CarPosition.Right;
        break;
      case ControlButton.Left:
        this.position = CarPosition.Left;
        break;
      case ControlButton.Up:
      case ControlButton.Rotate:
        this.startGame();
        break;
    }
  }

  componentWillLoad() {
    this.getInitialGameState();
  }

  startGame() {
    if (globalStore.state.gameStatus === GameStatus.NewGame) {
      this.drive();
    }
  }
  
  getInitialGameState() {
    this.borders = helpers.getInitialBorders();
    this.playersCar = helpers.getCar();
    this.competitors = helpers.getInitialCompetitors();
    this.position = CarPosition.Left;
    this.moveInterval = 100;
    statsStore.reset();
  }

  drive() {
    this.borders = helpers.moveBorders(this.borders);
    this.competitors = helpers.updateCompetitorsAfterMove(this.competitors);
    const isCarCrashed = helpers.isCarCrashed(this.competitors, this.position);
    if (isCarCrashed) {
      this.playersCar = helpers.getCar(this.position, 0, true);
      setTimeout(() => this.getInitialGameState(), 3000);
      return;
    }
    
    if (!statsStore.state.pause) {
      setTimeout(() => this.drive(), this.moveInterval);
    }
  }

  

  getActiveCells() {
    const borders = [...this.borders.right, ...this.borders.left];
    const competitors = this.competitors.map(({cells}) => cells).flat();
    return [...borders, ...competitors, ...this.playersCar];
  }

  render() {
    const activeCells = this.getActiveCells();
    return (
      <brick-screen
        activeCells={activeCells}
      />
    );
  }
}
