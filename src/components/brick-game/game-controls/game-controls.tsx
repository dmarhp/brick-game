import {Component, Event, EventEmitter, h, Host, Listen} from "@stencil/core";
import {ControlButton} from "@global/types";
import helpers from "./helpers";
import {LOCALIZATION} from "@global/localization";
import globalStore from "../../../stores/global-store";

@Component({
  tag: 'game-controls',
  styleUrl: 'game-controls.scss'
})
export class GameControls {
  @Event() controlButtonClick: EventEmitter<ControlButton>;

  @Listen('keydown', {target: 'window'})
  handleKeyDown(event: KeyboardEvent) {
    const button = helpers.getControlButtonFromKeyBoardEvent(event);
    if (button === ControlButton.Pause) {
      globalStore.state.isPause = !globalStore.state.isPause;
      return;
    }

    this.controlButtonClickHandler(button);
    if (helpers.isDirectionOrRotateButton(button)) {
      globalStore.state.isPause = false;
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