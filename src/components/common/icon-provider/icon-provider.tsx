import {Component,h, Host} from "@stencil/core";

@Component({
  tag:'icon-provider',
  styleUrl: 'icon-provider.scss'
})
export class IconProvider {
  
  render() {
    return (
      <Host
        innerHTML={123}
      />
    )
  }
}