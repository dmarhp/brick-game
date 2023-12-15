import {Component, Event, EventEmitter, h, Host, Listen} from "@stencil/core";
import {ControlButton} from "@global/types";
import helpers from "./helpers";
import gameStore from "@stores/game-store";

@Component({
  tag: 'console-controls-part',
  styleUrl: 'console-controls-part.scss'
})
export class ConsoleControlsPart {
  @Event() controlButtonClick: EventEmitter<ControlButton>;

  @Listen('keydown', {target: 'window'})
  keydownHandler(event: KeyboardEvent) {
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
