import {Component, h, Host, Prop} from "@stencil/core";

@Component({
  tag: 'control-button',
  styleUrl: 'control-button.scss'
})
export class ControlButton {
  @Prop() text = '';
  @Prop() size: 'sm' | 'lg' = 'sm';
  
  render() {
    return (
      <Host size={this.size}>
        <span>
          {this.text}
        </span>
      </Host>
    )
  }
}