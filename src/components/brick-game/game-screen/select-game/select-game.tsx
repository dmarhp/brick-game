import {Component, h, Listen, State} from "@stencil/core";
import {ControlButton, GameStatus, ICell} from "@global/types";
import {GAME_CATALOG} from "@global/constants";
import {getBrickLetter} from "@global/helpers/select-game/brick-letters";
import {getBrickNumber} from "@global/helpers/select-game/brick-numbers";
import {getGamePreview} from "@global/helpers/select-game/game-preview";
import globalStore from "@stores/global-store";
import statsStore from "@stores/stats-store";

@Component({
  tag: 'select-game',
  styleUrl: 'select-game.scss'
})
export class SelectGame {
  @State() activeCells: ICell[] = [];

  @Listen('controlButtonClick', {target: 'window'})
  controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    switch (detail) {
      case ControlButton.Right:
        this.nextLevel();
        break;
      case ControlButton.Left:
        this.prevLevel();
        break;
      case ControlButton.Up:
        this.prevGame();
        break;
      case ControlButton.Down:
        this.nextGame();
        break;
      case ControlButton.Rotate:
        this.startGame()
        break;
    }
  }
  
  componentWillLoad() {
    globalStore.state.gameStatus = GameStatus.NewGame;
    statsStore.state.score = 0;
    statsStore.state.bricks = [];
  }

  nextGame() {
    const maxIndex = GAME_CATALOG.length - 1;

    if (globalStore.state.selectedMenuItem === maxIndex) {
      globalStore.state.selectedMenuItem = 0;
    } else {
      globalStore.state.selectedMenuItem++;
    }
    statsStore.state.level = 1;
  }

  prevGame() {
    if (globalStore.state.selectedMenuItem === 0) {
      globalStore.state.selectedMenuItem = GAME_CATALOG.length - 1;
    } else {
      globalStore.state.selectedMenuItem--;
    }
    statsStore.state.level = 1;
  }

  nextLevel() {
    if (statsStore.state.level < 99) {
      statsStore.state.level++;
    }
  }

  prevLevel() {
    if (statsStore.state.level > 1) {
      statsStore.state.level--;
    }
  }

  startGame() {
    const game = GAME_CATALOG[globalStore.state.selectedMenuItem];
    if (game && !game.locked) {
      globalStore.state.game = game.game;
    }
  }

  render() {
    const {level} = statsStore.state;
    const {selectedMenuItem} = globalStore.state;
    const game = GAME_CATALOG[selectedMenuItem];

    const activeCells = [
      ...getBrickLetter(game.letter),
      ...getGamePreview(game.game),
      ...getBrickNumber(level)
    ]
    return (
      <brick-screen activeCells={activeCells}/>
    );
  }
}
