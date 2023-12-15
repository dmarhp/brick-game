import {Component, h, Host} from "@stencil/core";
import {LOCALIZATION} from "@global/localization";

@Component({
  tag: 'console-name',
  styleUrl: 'console-name.scss'
})
export class ConsoleName {
  renderDots() {
    return (
      <div class="dots">
        <div class="dot"/>
        <div class="dot"/>
        <div class="dot"/>
      </div>
    );
  }

  render() {
    return (
      <Host>
        {this.renderDots()}
        <span>{LOCALIZATION.brickGame}</span>
        {this.renderDots()}
      </Host>
    );
  }
}
