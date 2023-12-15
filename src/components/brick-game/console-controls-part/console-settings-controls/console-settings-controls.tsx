import {Component, Event, EventEmitter, h, Host} from "@stencil/core";
import {LOCALIZATION} from "@global/localization";
import {ControlButton} from "@global/types";

@Component({
  tag: 'console-settings-controls',
  styleUrl: 'console-settings-controls.scss'
})
export class ConsoleSettingsControls {
  @Event({bubbles: false}) buttonClick: EventEmitter<ControlButton>;

  clickHandler(button: ControlButton) {
    this.buttonClick.emit(button);
  }

  render() {
    return (
      <Host>
        <console-control-button
          text={LOCALIZATION.pause}
          size="sm"
          onClick={() => this.clickHandler(ControlButton.Pause)}
        />
        <console-control-button
          text={LOCALIZATION.sound}
          size="sm"
          onClick={() => this.clickHandler(ControlButton.Sound)}
        />
        <console-control-button
          text={LOCALIZATION.settings}
          size="sm"
          onClick={() => this.clickHandler(ControlButton.Settings)}
        />
        <console-control-button
          text={LOCALIZATION.exit}
          size="sm"
          onClick={() => this.clickHandler(ControlButton.Exit)}
        />
      </Host>
    );
  }
}
