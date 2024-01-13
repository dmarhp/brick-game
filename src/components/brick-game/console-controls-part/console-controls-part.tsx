import {Component, Event, EventEmitter, h, Host, Listen} from "@stencil/core";
import {ControlButton} from "@global/types";
import helpers from "./helpers";
import gameStore from "@stores/game-store";
import {gameHelpers} from "@global/helpers/game";

@Component({
  tag: 'console-controls-part',
  styleUrl: 'console-controls-part.scss'
})
export class ConsoleControlsPart {
  @Event() controlButtonClick: EventEmitter<ControlButton>;

  @Listen('keydown', {target: 'window'})
  keydownHandler(event: KeyboardEvent) {
    const button = helpers.getControlButtonFromKeyBoardEvent(event);
    if (button !== ControlButton.None) {
      this.controlButtonClickHandler(button);
    }
  }

  controlButtonClickHandler(button: ControlButton) {
    if (helpers.isDirectionOrRotateButton(button)) {
      gameStore.state.pause = false;
    }

    switch (button) {
      case ControlButton.Exit:
        gameHelpers.exit();
        return;
      case ControlButton.Pause:
        gameHelpers.togglePause();
        return;
      case ControlButton.Sounds:
        gameHelpers.toggleSounds();
        return;
      default:
        this.controlButtonClick.emit(button);
    }
  }

  render() {
    return (
      <Host>
        <console-settings-controls
          onButtonClick={(e: CustomEvent<ControlButton>) => this.controlButtonClickHandler(e.detail)}
        />
        <console-main-controls
          onButtonClick={(e: CustomEvent<ControlButton>) => this.controlButtonClickHandler(e.detail)}
        />
      </Host>
    );
  }
}
