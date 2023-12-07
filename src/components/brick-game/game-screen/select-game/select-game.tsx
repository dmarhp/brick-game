import {Component, h, Listen, Prop, State} from "@stencil/core";
import {ControlButton, ICell, View} from "@global/types";
import {GAME_CATALOG} from "@global/constants";
import {getBrickLetter} from "@global/helpers/select-game/brick-letters";
import {getBrickNumber} from "@global/helpers/select-game/brick-numbers";
import {getGamePreview} from "@global/helpers/select-game/game-preview";
import globalStore from "@stores/global-store";
import gameStore from "@stores/game-store";
import {gameHelpers} from "@global/helpers/game";

@Component({
  tag: 'select-game',
})
export class SelectGame {
  @Prop() isHidden = false;
  @State() activeCells: ICell[] = [];
  @State() game = 0;
  @State() level = 1;
  @State() speed = 1;

  @Listen('controlButtonClick', {target: 'window'})
  controlButtonClickHandler({detail}: CustomEvent<ControlButton>) {
    if (globalStore.state.view !== View.SelectGame) {
      return;
    }

    switch (detail) {
      case ControlButton.Right:
        this.speedUp();
        break;
      case ControlButton.Left:
        this.speedDown();
        break;
      case ControlButton.Up:
        this.prevGame();
        break;
      case ControlButton.Down:
        this.nextGame();
        break;
      case ControlButton.Rotate:
        gameHelpers.startNewGame(this.game, this.speed);
        break;
    }
  }

  componentWillLoad() {
    gameStore.reset();
  }

  nextGame() {
    const maxIndex = GAME_CATALOG.length - 1;
    if (this.game === maxIndex) {
      this.game = 0;
    } else {
      this.game++;
    }
    this.level = 1;
    this.speed = 1;
  }

  prevGame() {
    if (this.game === 0) {
      this.game = GAME_CATALOG.length - 1;
    } else {
      this.game--;
    }
    this.level = 1;
    this.speed = 1;
  }

  speedDown() {
    if (this.speed > 1) {
      this.speed--;
    }
  }

  speedUp() {
    if (this.speed < 99) {
      this.speed++;
    }
  }

  render() {
    const game = GAME_CATALOG[this.game];
    const activeCells = [
      ...getBrickLetter(game.letter),
      ...getGamePreview(game.game),
      ...getBrickNumber(this.speed)
    ]
    return (
      <brick-screen
        id="SelectGame"
        activeCells={activeCells}
        isHidden={this.isHidden}
      />
    );
  }
}
