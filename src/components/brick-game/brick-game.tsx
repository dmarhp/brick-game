import {Component, h, Host} from "@stencil/core";

@Component({
  tag: 'brick-game',
  styleUrl: 'brick-game.scss'
})
export class BrickGame {
  render() {
    return (
      <Host>
        <div class="console">
          <console-screen-part/>
          <console-controls-part/>
        </div>
      </Host>
    );
  }
}
