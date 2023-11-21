import {Component, h, Host, Prop} from "@stencil/core";

@Component({
  tag: 'stats-screen-level',
  styleUrl: 'stats-screen-level.scss'
})
export class StatsScreenLevel {
  @Prop() count = 1;
  @Prop() text = 'Level';

  getLevelDigitsArray() {
    const reversedScoreCharArray = this.count
      .toString()
      .split('')
      .reverse();

    return Array(2)
      .fill('')
      .map((_, i) => reversedScoreCharArray[i] || _)
      .reverse();
  }

  render() {
    return (
      <Host class="stats-screen-level">
        <div class="stats-screen-level__digits">
          {this.getLevelDigitsArray().map((d, i) => (
            <seven-segment-digit
              digit={d}
              key={`level-digits-${i}`}
            />
          ))}
        </div>
        <span>{this.text}</span>
      </Host>
    )
  }
}