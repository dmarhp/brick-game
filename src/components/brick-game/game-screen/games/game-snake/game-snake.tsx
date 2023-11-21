import {Component, h, Listen, State} from "@stencil/core";
import {ControlButton, Direction, GameStatus, ICell} from "@global/types";
import helpers from "./helpers";
import statsStore from "../../../../../stores/stats-store";
import {cellHelpers} from "@global/helpers/cells";
import {controlsHelpers} from "@global/helpers/controls";
import globalStore from "../../../../../stores/global-store";
import {gameHelpers} from "@global/helpers/game";

@Component({
  tag: 'game-snake',
  styleUrl: 'game-snake.scss'
})
export class GameSnake {
  @State() direction = Direction.None;
  @State() mouse: ICell;
  @State() moveInterval = 1000;
  @State() snake: ICell[];
  @State() disableDirectionChange = false;

  @Listen('controlButtonClick', {target: 'window'})
  controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    const {isPause, gameStatus} = globalStore.state;

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
      
    if (controlsHelpers.isDirectionButton(detail) && (isPause || gameStatus === GameStatus.NewGame)) {
      globalStore.state.gameStatus = GameStatus.Play;
      this.moveSnake();
    }
    this.disableDirectionChange = true;
  }

  componentWillLoad() {
    statsStore.onChange('score', this.updateMoveInterval.bind(this));
    globalStore.onChange('isPause', this.pauseHandler.bind(this));
    this.startNewGame();
  }
  
  startNewGame() {
    this.snake = helpers.getInitialSnake();
    this.placeNewMouse();
    globalStore.state.gameStatus = GameStatus.NewGame;
  }

  pauseHandler() {
    if (!globalStore.state.isPause) {
      this.moveSnake();
    }
  }

  moveSnake() {
    if (this.direction === Direction.None || globalStore.state.isPause) {
      return;
    }

    const newHead = helpers.getHeadCoordinatesAfterMove(this.snake[0], this.direction);
    const isSnakeCrossed = this.snake.some(c => cellHelpers.compareTwoCells(c, newHead));
    const isSnakeMovedOutOfScreen = cellHelpers.isCellOutsideScreen(newHead);

    if (isSnakeCrossed || isSnakeMovedOutOfScreen) {
      this.direction = Direction.None;
      globalStore.state.gameStatus = GameStatus.Lose;
      this.snake = this.snake.map(c => ({...c, blink: true}));
      return;
    }

    const ateMouse = cellHelpers.compareTwoCells(newHead, this.mouse);
    const updatedSnake = [newHead, ...this.snake];
    if (!ateMouse) {
      updatedSnake.pop();
    }
    this.snake = [...updatedSnake];

    if (ateMouse) {
      statsStore.state.score++;
      this.placeNewMouse();
    }
    this.disableDirectionChange = false;
    if (!globalStore.state.isPause) {
      setTimeout(() => this.moveSnake(), this.moveInterval);
    }
  }

  placeNewMouse() {
    const newMouse = cellHelpers.getRandomCell();
    newMouse.blink = true;
    const isNewMouseValid = this.snake.every(c => !cellHelpers.compareTwoCells(c, newMouse));
    if (isNewMouseValid) {
      this.mouse = newMouse;
    } else {
      this.placeNewMouse();
    }
  }

  updateMoveInterval() {
    const newMoveInterval = helpers.getSnakeMoveInterval();

    if (this.moveInterval === newMoveInterval) {
      return;
    }
    this.moveInterval = newMoveInterval;
  }

  render() {
    return (
      <brick-screen
        activeCells={[...this.snake, this.mouse]}
      />
    );
  }
}