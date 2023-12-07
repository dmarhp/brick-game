import {Component, h, Listen, State, Watch} from "@stencil/core";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {ControlButton, Direction, GameStatus, ICell} from "@global/types";
import helpers from "./helpers";
import {cellHelpers} from "@global/helpers/cells";
import {screenHelpers} from "@global/helpers/screen";
import {objectHelpers} from "@global/helpers/objects";
import {commonHelpers} from "@global/helpers/common";
import gameStore from "@stores/game-store";

@Component({
  tag: 'game-row-filler'
})
export class GameRowFiller {
  @State() activeCells: ICell[] = [];
  @State() highlightedCell: ICell = {} as ICell;
  @State() bullets: ICell[] = [];
  @State() position = SCREEN_WIDTH / 2;

  @Watch('position')
  @Watch('activeCells')
  async highlightedCellHandler() {
    const cellsAtPosition = this.activeCells.filter(c => c.x === this.position);

    if (cellsAtPosition.length === 0) {
      this.highlightedCell = {x: this.position, y: SCREEN_HEIGHT - 1};
      return;
    }

    const min = Math.min(...cellsAtPosition.map(({y}) => y));
    this.highlightedCell = {x: this.position, y: min - 1};
  }

  @Watch('activeCells')
  async activeCellChangeHandler() {
    if (gameStore.state.gameStatus === GameStatus.Lose) {
      return;
    }
    await this.handleGameOver();

    let activeRow = 0;

    for (let i = SCREEN_HEIGHT; i > 0; i--) {
      if (screenHelpers.isRowActive(this.activeCells, i)) {
        activeRow = i;
        break
      }
    }

    if (activeRow === 0) {
      return;
    }

    await commonHelpers.sleep(200);
    this.activeCells = screenHelpers.removeRowAndMoveCells(this.activeCells, activeRow, Direction.Up);
  }

  @Listen('controlButtonClick', {target: 'window'})
  async controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    switch (detail) {
      case ControlButton.Right:
      case ControlButton.Left:
        this.movePlayer(detail);
        break;
      case ControlButton.Up:
      case ControlButton.Rotate:
        this.shoot();
        break;
      default:
        return;
    }
  }

  componentWillLoad() {
    this.getInitialGameState();
  }

  async handleGameOver() {
    const player = helpers.getPlayer(this.position);
    if (!objectHelpers.isOutsideScreen(this.activeCells) && !objectHelpers.isOverlapping(this.activeCells, player)) {
      return;
    }

    gameStore.state.gameStatus = GameStatus.Lose;
    await screenHelpers.clearScreen(this.getActiveCells())
    this.getInitialGameState();
  }

  getActiveCells() {
    return [
      ...this.activeCells,
      ...this.bullets,
      ...helpers.getPlayer(this.position)
    ];
  }

  getInitialGameState() {
    gameStore.state.gameStatus = GameStatus.NewGame;
    this.position = SCREEN_WIDTH / 2;
    this.activeCells = helpers.getInitialFilledRows();
    this.moveBullets();

    setTimeout(() => {
      this.insertNewRow()
    }, 5000);
  }

  insertNewRow() {
    if (gameStore.state.gameStatus === GameStatus.Lose) {
      return
    }

    const newRow = helpers.getRandomlyFilledRow();
    const updatedActiveCells = objectHelpers.move(this.activeCells, Direction.Down);
    this.activeCells = [...updatedActiveCells, ...newRow];

    setTimeout(() => {
      this.insertNewRow()
    }, 5000);
  }

  moveBullets() {
    if (gameStore.state.gameStatus === GameStatus.Lose) {
      return;
    }

    if (this.bullets.length > 0) {
      this.bullets = this.bullets
        .map(b => this.moveBullet(b))
        .filter(c => !!c);
    }

    setTimeout(() => this.moveBullets(), 25);
  }

  moveBullet(bullet: ICell): ICell {
    const {x, y} = cellHelpers.move(bullet, Direction.Up);
    if (this.activeCells.some(c => cellHelpers.isEqual(c, {x, y})) || y === SCREEN_HEIGHT) {
      this.activeCells = [...this.activeCells, bullet];
      return null;
    }
    return {...bullet, x, y};
  }

  movePlayer(control: ControlButton) {
    let position = this.position;
    switch (control) {
      case ControlButton.Left:
        position--;
        break;
      case ControlButton.Right:
        position++;
        break;
      default:
        return;
    }

    if (position >= 0 && position < SCREEN_WIDTH) {
      this.position = position;
    }
  }

  shoot() {
    const bullet = {x: this.position, y: 0};
    if (this.bullets.every(b => !cellHelpers.isEqual(b, bullet))) {
      this.bullets = [...this.bullets, bullet];
    }
  }

  render() {
    return (
      <brick-screen
        id="GameRowFiller"
        activeCells={this.getActiveCells()}
        highlightedCells={[this.highlightedCell]}
      />
    );
  }
}