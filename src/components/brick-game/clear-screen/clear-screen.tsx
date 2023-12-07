import {Component, Event, EventEmitter, h, Listen, Prop, State} from "@stencil/core";
import {ICell} from "@global/types";
import {commonHelpers} from "@global/helpers/common";
import {CLEAR_SCREEN_INTERVAL, SCREEN_HEIGHT} from "@global/constants";
import {screenHelpers} from "@global/helpers/screen";

@Component({
  tag: 'clear-screen',
})
export class ClearScreen {
  @Prop() isHidden = false;
  @State() activeCells: ICell[] = [];
  @Event({eventName: 'clear-screen.finish'}) finish: EventEmitter;

  @Listen('clear-screen.start', {target: 'window'})
  async showClearScreenHandler({detail}: CustomEvent<{ cells: ICell[] }>) {
    const {cells} = detail;
    this.activeCells = cells;
    await this.start();
  }

  async start() {
    let i = SCREEN_HEIGHT;
    while (i > 0) {
      i--;
      this.activeCells = screenHelpers.fillRow(this.activeCells, i);
      await commonHelpers.sleep(CLEAR_SCREEN_INTERVAL);
    }

    while (i < SCREEN_HEIGHT) {
      this.activeCells = screenHelpers.clearRow(this.activeCells, i);
      await commonHelpers.sleep(CLEAR_SCREEN_INTERVAL);
      i++;
    }

    this.finish.emit();
  }

  render() {
    return (
      <brick-screen
        id="ClearScreen"
        activeCells={this.activeCells}
        isHidden={this.isHidden}
      />
    );
  }
}
