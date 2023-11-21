import {Component, h, Host} from "@stencil/core";

@Component({
  tag: 'brick-game',
  styleUrl: 'brick-game.scss'
})
export class BrickGame {
  render() {
    return (
      <Host>
        <div>
          <game-screen/>
        </div>
        <game-controls/>
      </Host>
    );
  }
}
