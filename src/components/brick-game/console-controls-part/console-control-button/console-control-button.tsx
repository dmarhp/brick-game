import {Component, h, Host, Prop} from "@stencil/core";

@Component({
  tag: 'console-control-button',
  styleUrl: 'console-control-button.scss'
})
export class ConsoleControlButton {
  @Prop() text = '';
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  render() {
    return (
      <Host>
        <div
          class="control-button"
          data-size={this.size}
        />

        {this.text && (
          <div class="control-button-text">
            {this.text}
          </div>
        )}
      </Host>
    );
  }
}
