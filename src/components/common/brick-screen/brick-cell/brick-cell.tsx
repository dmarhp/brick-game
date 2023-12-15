import {Component, h, Host, Prop} from "@stencil/core";

@Component({
  tag: 'brick-cell',
  styleUrl: 'brick-cell.scss'
})
export class BrickCell {
  @Prop() active = false;
  @Prop() highlighted = false;
  @Prop() transparent = false;
  
  render() {
    return (
      <Host
        active={this.active}
        highlighted={this.highlighted}
        transparent={this.transparent}
      />
    );
  }
}
