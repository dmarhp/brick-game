import {Component, h, Listen, State} from "@stencil/core";
import {ControlButton, Direction, Game, GameStatus, ICell} from "@global/types";
import helpers from "./helpers";
import {cellHelpers} from "@global/helpers/cells";
import {controlsHelpers} from "@global/helpers/controls";
import {gameHelpers} from "@global/helpers/game";
import {objectHelpers} from "@global/helpers/objects";
import {screenHelpers} from "@global/helpers/screen";
import gameStore from "@stores/game-store";
import {commonHelpers} from "@global/helpers/common";

@Component({
  tag: 'game-snake',
})
export class GameSnake {
  @State() direction = Direction.None;
  @State() mouse: ICell;
  @State() moveInterval = 1000;
  @State() snake: ICell[];
  @State() disableDirectionChange = false;

  @Listen('controlButtonClick', {target: 'window'})
  async controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    const {gameStatus, pause} = gameStore.state;

    if (!controlsHelpers.isDirectionButton(detail)) {
      if (detail === ControlButton.Rotate && gameHelpers.isFinished()) {
        this.startNewGame();
      }
    }

    const newDirection = controlsHelpers.getDirectionAfterButtonClick(detail, this.direction);
    if (this.disableDirectionChange && newDirection !== this.direction) {
      return;
    }
    this.direction = newDirection;

    if (controlsHelpers.isDirectionButton(detail) && (pause || gameStatus === GameStatus.NewGame)) {
      gameHelpers.setStatus(GameStatus.Play);
      await this.moveSnake();
    }
    this.disableDirectionChange = true;
  }

  componentWillLoad() {
    gameStore.onChange('score', this.updateMoveInterval.bind(this));
    gameStore.onChange('pause', this.pauseHandler.bind(this));
    this.startNewGame();
  }

  async finishGame() {
    this.direction = Direction.None;
    this.snake = this.snake.map(c => ({...c, blink: true}));
    await commonHelpers.sleep(1000);

    const activeCells = [
      ...this.snake.map(c => ({...c, blink: false})),
      this.mouse
    ];

    gameHelpers.setStatus(GameStatus.Lose);
    await screenHelpers.clearScreen(activeCells);
    gameStore.state.game = Game.None;
  }

  async moveSnake() {
    if (this.direction === Direction.None || gameStore.state.pause) {
      return;
    }

    const newHead = cellHelpers.move(this.snake[0], this.direction);
    const isSnakeCrossed = objectHelpers.isObjectCell(this.snake, newHead);

    if (isSnakeCrossed || !cellHelpers.isVisible(newHead)) {
      await this.finishGame();
      return;
    }

    const ateMouse = cellHelpers.isEqual(newHead, this.mouse);
    const updatedSnake = [newHead, ...this.snake];

    if (!ateMouse) {
      updatedSnake.pop();
    }
    this.snake = [...updatedSnake];

    if (ateMouse) {
      gameStore.state.score++;
      this.placeNewMouse();
    }

    this.disableDirectionChange = false;

    if (!gameStore.state.pause) {
      setTimeout(() => this.moveSnake(), this.moveInterval);
    }
  }

  async pauseHandler() {
    if (!gameStore.state.pause) {
      await this.moveSnake();
    }
  }

  placeNewMouse() {
    const newMouse = cellHelpers.getRandom(true);
    newMouse.blink = true;
    const isNewMouseValid = !objectHelpers.isObjectCell(this.snake, newMouse);
    if (isNewMouseValid) {
      this.mouse = newMouse;
    } else {
      this.placeNewMouse();
    }
  }

  startNewGame() {
    this.snake = helpers.getInitialSnake();
    this.placeNewMouse();
    gameHelpers.setStatus(GameStatus.NewGame);
  }

  updateMoveInterval() {
    this.moveInterval = helpers.getSnakeMoveInterval();
  }

  render() {
    return (
      <brick-screen
        activeCells={[...this.snake, this.mouse]}
      />
    );
  }
}
