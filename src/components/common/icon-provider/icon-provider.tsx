import {Component, h, Host, Prop} from "@stencil/core";
import {Icon} from "@global/types";

import sounds from "./assets/sounds.svg";
import pause from "./assets/pause.svg";
import poo from "./assets/poo.svg";

@Component({
  tag: 'icon-provider',
  styleUrl: 'icon-provider.scss'
})
export class IconProvider {
  @Prop() icon: Icon;

  getIcon() {
    switch (this.icon) {
      case Icon.Sounds:
        return sounds;
      case Icon.Pause:
        return pause
      case Icon.Poo:
        return poo;
      default:
        return poo;
    }
  }

  render() {
    return (
      <Host innerHTML={this.getIcon()}/>
    );
  }
}
