import {Component, h, Host, Prop} from "@stencil/core";
import statsStore from "../../../../stores/stats-store";
import {Icon} from "@global/types";

@Component({
  tag: 'stats-screen',
  styleUrl: 'stats-screen.scss'
})
export class StatsScreen {
  @Prop() score: number;

  render() {
    const {pause, music, score, bricks} = statsStore.state;

    return (
      <Host class="stats-screen">
        <div class="stats-screen__main-controls">
          <stats-screen-score score={score}/>

          <brick-screen width={4} height={4} activeCells={bricks}/>

          <div class="stats-screen__speed-and-level">
            <stats-screen-level/>
            <stats-screen-level text="speed"/>
          </div>

          <icon-provider icon={Icon.Poo}/>

        </div>
        <div class="stats-screen__music-and-pause">
          <icon-provider icon={Icon.Music} class={{'active': music}}/>
          <icon-provider icon={Icon.Pause} class={{'active': pause}}/>
        </div>
      </Host>
    );
  }
}
