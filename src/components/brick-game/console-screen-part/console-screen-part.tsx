import {Component, h, Host} from "@stencil/core";

@Component({
  tag: 'console-screen-part',
  styleUrl: 'console-screen-part.scss'
})
export class ConsoleScreenPart {
  render() {
    return (
      <Host>
        <console-side-figures side="LEFT"/>
        <div class="console__screen-borders">
          <console-name/>
          <div class="console__screen">
            <game-screen/>
          </div>
        </div>
        <console-side-figures side="RIGHT"/>
      </Host>
    );
  }
}
