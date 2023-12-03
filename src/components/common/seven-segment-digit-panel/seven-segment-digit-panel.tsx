import {Component, Element, h, Host, Prop} from "@stencil/core";

@Component({
  tag: 'seven-segment-digit-panel',
  styleUrl: 'seven-segment-digit-panel.scss'
})
export class SevenSegmentDigitPanel {
  @Element() el: HTMLSevenSegmentDigitPanelElement;
  @Prop() value = 0;
  @Prop() size = 1;

  getValueDigitsArray() {
    const reversedValueCharArray = this.value
      .toString()
      .split('')
      .reverse();

    return Array(this.size)
      .fill('')
      .map((_, i) => reversedValueCharArray[i] || _)
      .reverse();
  }

  render() {
    return (
      <Host>
        {this.getValueDigitsArray().map((d, i) => (
          <seven-segment-digit
            digit={d}
            key={`${this.el.id}_${i}`}
          />
        ))}
      </Host>
    );
  }
}
