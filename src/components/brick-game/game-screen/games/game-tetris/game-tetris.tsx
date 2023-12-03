import {Component, h, Listen, State, Watch} from "@stencil/core";
import {ControlButton, Direction, Game, GameStatus, ICell} from "@global/types";
import {Block} from "./types";
import helpers from "./helpers";
import {objectHelpers} from "@global/helpers/objects";
import {controlsHelpers} from "@global/helpers/controls";
import tetrisCellHelpers from "./helpers/cells";
import {CLEAR_SCREEN_INTERVAL, SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {commonHelpers} from "@global/helpers/common";
import store from "../../../../../stores/global-store";
import globalStore from "../../../../../stores/global-store";
import {screenHelpers} from "@global/helpers/screen";
import {directionHelpers} from "@global/helpers/direction";
import statsStore from "../../../../../stores/stats-store";

@Component({
  tag: 'game-tetris',
  styleUrl: 'game-tetris.scss'
})
export class GameTetris {
  @State() activeCells: ICell[] = [];
  @State() currentBlock: { block: Block, direction: Direction };

  @State() currentBlockCells: ICell[] = [];
  @State() highlightedCells: ICell[] = [];
  @State() nextBlock: Block;

  @Watch('activeCells')
  @Watch('currentBlockCells')
  updateHighlightedCells() {
    this.highlightedCells = helpers.dropBlock(this.activeCells, this.currentBlockCells);
  }

  @Listen('controlButtonClick', {target: 'window'})
  async controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    if (controlsHelpers.isDirectionButton(detail)) {
      const direction = controlsHelpers.getDirectionFromControlButton(detail);
      if (direction === Direction.Up) {
        this.rotateBlock();
        return;
      }
      await this.moveBlock(direction);
    } else if (detail === ControlButton.Rotate) {
      this.rotateBlock();
    }
  }

  async componentWillLoad() {
    this.getNextBlock(true)
    await this.lowerBlock();
  }

  async finishGame() {
    this.currentBlock = null;
    this.currentBlockCells = [];
    globalStore.state.gameStatus = GameStatus.Lose;

    let i = SCREEN_HEIGHT;
    
    while (i > 0) {
      i--;
      this.activeCells = screenHelpers.fillRow(this.activeCells, i);
      await commonHelpers.sleep(CLEAR_SCREEN_INTERVAL);
    }

    while (i < SCREEN_HEIGHT) {
      this.activeCells = screenHelpers.clearRow(this.activeCells, i);
      await commonHelpers.sleep(CLEAR_SCREEN_INTERVAL);
      i++;
    }

    globalStore.state.game = Game.None;
  }

  async lowerBlock() {
    if (store.state.gameStatus === GameStatus.Lose) {
      return;
    }

    await this.moveBlock(Direction.Down);
    setTimeout(() => {
      this.lowerBlock();
    }, 1000);
  }

  async moveBlock(direction: Direction) {
    const updatedBlock = objectHelpers.move(this.currentBlockCells, direction);
    const intersection = objectHelpers.isOverlapping(this.activeCells, updatedBlock);

    if (objectHelpers.isVisibleOrAbove(updatedBlock) && !intersection) {
      this.currentBlockCells = updatedBlock;
    } else if (direction === Direction.Down) {
      this.activeCells = [...this.activeCells, ...this.currentBlockCells];
      if (this.activeCells.some((c => c.y >= SCREEN_HEIGHT))) {
        await this.finishGame();
        return;
      }

      this.getNextBlock();
      await this.removeCompletedRows()
    }
  }

  async removeCompletedRows() {
    const completedRows: number[] = [];

    for (let i = 0; i < SCREEN_HEIGHT; i++) {
      if (screenHelpers.isRowActive(this.activeCells, i)) {
        completedRows.push(i);
      }
    }

    if (completedRows.length === 0) {
      return;
    }

    // remove rows with animation
    for (let i = SCREEN_WIDTH; i >= 0; i--) {
      this.activeCells = this.activeCells.filter(c => !completedRows.includes(c.y) || c.x !== i);
      await commonHelpers.sleep(25)
    }

    statsStore.state.score += completedRows.length;
    let updatedActiveCells = [...this.activeCells];

    for (let i = 0; i < SCREEN_HEIGHT; i++) {
      const rowIsEmpty = updatedActiveCells.every(c => c.y !== i)
      if (rowIsEmpty) {
        const nextActiveRow = screenHelpers.getIndexOfNextRowWithActiveCells(updatedActiveCells, i);
        if (nextActiveRow) {
          updatedActiveCells = updatedActiveCells.map(c => c.y === nextActiveRow ? {...c, y: i} : c);
        }
      }
    }

    this.activeCells = updatedActiveCells;
  }

  getNextBlock(initial = false) {
    const block = initial ? helpers.getRandomBlock() : this.nextBlock;
    this.currentBlock = {block, direction: Direction.Up};
    this.currentBlockCells = helpers.getBlockCells(block);
    this.nextBlock = helpers.getRandomBlock();
    helpers.updateNextBlockInStats(this.nextBlock);
  }
  rotateBlock() {
    const direction = directionHelpers.rotateRight(this.currentBlock.direction);
    const offset = tetrisCellHelpers.getOffset(this.currentBlockCells);
    const updatedCells = helpers.getBlockCells(this.currentBlock.block, direction, offset);
    if (objectHelpers.isVisibleOrAbove(updatedCells)) {
      this.currentBlockCells = updatedCells;
      this.currentBlock.direction = direction;
    }
  }

  render() {
    const activeCells: ICell[] = [...this.currentBlockCells, ...this.activeCells];
    return (
      <brick-screen
        activeCells={activeCells}
        highlightedCells={this.highlightedCells}
      />
    );
  }
}
