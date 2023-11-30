import {Component, h, Listen, State, Watch} from "@stencil/core";
import {ControlButton, ICell} from "@global/types";
import {GAME_CATALOG} from "@global/constants";
import {getBrickLetter} from "@global/helpers/select-game/brick-letters";
import {getBrickNumber} from "@global/helpers/select-game/brick-numbers";
import {getGamePreview} from "@global/helpers/select-game/game-preview";
import globalStore from "../../../../stores/global-store";

@Component({
  tag: 'select-game',
  styleUrl: 'select-game.scss'
})
export class SelectGame {
  @State() activeCells: ICell[] = [];
  @State() selectedGameIndex = 0;
  @State() level = 1;

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

  @Watch('selectedGameIndex')
  @Watch('level')
  updateActiveCells() {
    const game = GAME_CATALOG[this.selectedGameIndex];
    if (!game) {
      this.activeCells = [];
      return;
    }

    const preview = getGamePreview(game.game);
    const number = getBrickNumber(this.level);
    const letter = getBrickLetter(game.letter);
    this.activeCells = [...letter, ...number, ...preview];
  } 

  componentWillLoad() {
    this.updateActiveCells();
  }

  nextGame() {
    const maxIndex = GAME_CATALOG.length - 1;
    
    if (this.selectedGameIndex === maxIndex) {
      this.selectedGameIndex = 0;
    } else {
      this.selectedGameIndex++;
    }
    this.level = 1;
  }

  prevGame() {
    if (this.selectedGameIndex === 0) {
      this.selectedGameIndex = GAME_CATALOG.length - 1;
    } else {
      this.selectedGameIndex--;
    }
    this.level = 1;
  }

  nextLevel() {
    if (this.level < 99) {
      this.level++;
    }
  }

  prevLevel() {
    if (this.level > 1) {
      this.level--;
    }
  }

  startGame() {
    const game = GAME_CATALOG[this.selectedGameIndex];
    if (game && !game.locked) {
      globalStore.state.game = game.game;
    }
  }

  render() {
    return (
      <brick-screen activeCells={this.activeCells}/>
    );
  }
}
