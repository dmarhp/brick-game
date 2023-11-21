import {Component, h, Host, Prop} from "@stencil/core";
import statsStore from "../../../../stores/stats-store";

@Component({
  tag: 'stats-screen',
  styleUrl: 'stats-screen.scss'
})
export class StatsScreen {
  @Prop() score: number;
  render() {
    return (
      <Host class="stats-screen">
        <stats-screen-score score={statsStore.state.score}/>
        <brick-screen width={4} height={4}/>
        <div class="stats-screen__speed-level">
          <stats-screen-level/>
          <stats-screen-level text="speed"/>
        </div>
      </Host>
    );
  }
}
