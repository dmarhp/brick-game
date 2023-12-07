import {Component, h, Host} from "@stencil/core";
import {Icon} from "@global/types";
import {LOCALIZATION} from "@global/localization";
import gameStore from "@stores/game-store";

@Component({
  tag: 'stats-screen',
  styleUrl: 'stats-screen.scss'
})
export class StatsScreen {
  render() {
    const {smallBrickScreen, level, pause, score, speed} = gameStore.state;

    return (
      <Host class="stats-screen">
        <div class="stats-screen__main-controls">
          <div class="stats-screen__score">
            <div>
              <span data-active={'false'}>{LOCALIZATION.hiScorePrefix}</span>
              <span>{LOCALIZATION.score}</span>
            </div>
            <seven-segment-digit-panel
              id="StatsScreenScoreDigitPanel"
              value={score}
              size={4}
            />
          </div>

          <brick-screen id="SecondaryScreen" width={4} height={4} activeCells={smallBrickScreen}/>

          <div class="stats-screen__speed-and-level">
            <div>
              <seven-segment-digit-panel
                id="StatsScreenLevelDigitPanel"
                value={level}
                size={2}
              />
              <span>{LOCALIZATION.level}</span>
            </div>

            <div>
              <seven-segment-digit-panel
                id="StatsScreenSpeedDigitPanel"
                value={speed}
                size={2}
              />
              <span>{LOCALIZATION.speed}</span>
            </div>
          </div>

          <icon-provider icon={Icon.Poo}/>

        </div>
        <div class="stats-screen__music-and-pause">
          <icon-provider icon={Icon.Music} class={{'active': false}}/>
          <icon-provider icon={Icon.Pause} class={{'active': pause}}/>
        </div>
      </Host>
    );
  }
}
