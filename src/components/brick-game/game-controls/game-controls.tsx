import {Component, Event, EventEmitter, h, Host, Listen} from "@stencil/core";
import {ControlButton} from "@global/types";
import helpers from "./helpers";
import {LOCALIZATION} from "@global/localization";
import gameStore from "@stores/game-store";

@Component({
  tag: 'console-controls',
  styleUrl: 'game-controls.scss'
})
export class GameControls {
  @Event() controlButtonClick: EventEmitter<ControlButton>;

  @Listen('keydown', {target: 'window'})
  async handleKeyDown(event: KeyboardEvent) {
    const button = helpers.getControlButtonFromKeyBoardEvent(event);
    if (button === ControlButton.Pause) {
      gameStore.state.pause = !gameStore.state.pause;
      return;
    }

    this.controlButtonClickHandler(button);
    if (helpers.isDirectionOrRotateButton(button)) {
      gameStore.state.pause = false;
    }
  }

  controlButtonClickHandler(button: ControlButton) {
    this.controlButtonClick.emit(button);
  }

  render() {
    return (
      <Host>
        <div class="main-buttons">
          <div class="main-buttons__cross">
            <control-button
              text={LOCALIZATION.up}
              onClick={() => this.controlButtonClickHandler(ControlButton.Up)}
            />
            <div class="main-buttons__cross--horizontal">
              <control-button
                text={LOCALIZATION.left}
                onClick={() => this.controlButtonClickHandler(ControlButton.Left)}
              />
              <control-button
                text={LOCALIZATION.right}
                onClick={() => this.controlButtonClickHandler(ControlButton.Right)}
              />
            </div>
            <control-button
              text={LOCALIZATION.down}
              onClick={() => this.controlButtonClickHandler(ControlButton.Down)}
            />
          </div>

          <control-button
            text={LOCALIZATION.rotate}
            onClick={() => this.controlButtonClickHandler(ControlButton.Rotate)}
          />
        </div>
      </Host>
    );
  }
}