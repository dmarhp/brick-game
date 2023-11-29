import {Component, h, Host, State} from "@stencil/core";
import {Game, ICell} from "@global/types";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import globalStore from "../../../stores/global-store";

@Component({
  tag: 'game-screen',
  styleUrl: 'game-screen.scss'
})
export class GameScreen {
  private brickScreenRef: HTMLDivElement;
  @State() activeCells: ICell[] = [];

  componentDidRender() {
    if (!this.brickScreenRef) {
      return;
    }

    this.brickScreenRef.style.height = this.getScreenSizeInPixels(SCREEN_HEIGHT);
    this.brickScreenRef.style.width = this.getScreenSizeInPixels(SCREEN_WIDTH);
  }
  
  getScreenSizeInPixels(cells: number) {
    const gaps = (cells - 1) * 2;
    const cellsSize = cells * 14;
    return `${gaps + cellsSize}px`

  }

  renderGame() {

    switch (globalStore.state.game) {
      case Game.Snake:
        return <game-snake/>;
      case Game.Racing:
        return <game-racing/>;
      case Game.Tanks:
        return <game-tanks/>;
      case Game.None:
        return <select-game/>;
      default:
        return <brick-screen activeCells={this.activeCells}/>
    }
  }

  render() {
    return (
      <Host>
        <div class="game-screen-wrapper">
          <div
            class="brick-screen-wrapper"
            ref={ref => this.brickScreenRef = ref}
          >
            {this.renderGame()}
          </div>
          <stats-screen/>
        </div>
      </Host>
    );
  }
}
