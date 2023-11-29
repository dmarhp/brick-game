import {Component, h, Host, Prop} from "@stencil/core";

@Component({
  tag: 'stats-screen-score',
  styleUrl: 'stats-screen-score.scss'
})
export class StatsScreenScore {
  @Prop() score: number = 0;
  @Prop() mode: 'score' | 'hi-score' = 'score'

  getScoreDigitsArray() {
    const reversedScoreCharArray = this.score
      .toString()
      .split('')
      .reverse();

    return Array(5)
      .fill('')
      .map((_, i) => reversedScoreCharArray[i] || _)
      .reverse();
  }

  render() {
    return (
      <Host>
        <div class="score-label">
          <span data-active={(this.mode === 'hi-score').toString()}>HI-</span>
          <span>SCORE</span>
        </div>
        <div class={"score-digits"}>
          {this.getScoreDigitsArray().map((d, i) => (
            <seven-segment-digit
              digit={d}
              key={`score-digits-${i}`}
            />
          ))}
        </div>
      </Host>
    );
  }
}
