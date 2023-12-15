import {Component, Event, EventEmitter, h, Host} from "@stencil/core";
import {LOCALIZATION} from "@global/localization";
import {ControlButton} from "@global/types";

@Component({
  tag: 'console-main-controls',
  styleUrl: 'console-main-controls.scss'
})
export class ConsoleMainControls {
  @Event({bubbles: false}) buttonClick: EventEmitter<ControlButton>;

  clickHandler(button: ControlButton) {
    this.buttonClick.emit(button);
  }

  render() {
    return (
      <Host>
        <div class="console-direction-controls">
          <console-control-button
            text={LOCALIZATION.up}
            onClick={() => this.clickHandler(ControlButton.Up)}
          />
          <div>
            <console-control-button
              text={LOCALIZATION.left}
              onClick={() => this.clickHandler(ControlButton.Left)}
            />
            <console-control-button
              text={LOCALIZATION.right}
              onClick={() => this.clickHandler(ControlButton.Right)}
            />
          </div>
          <console-control-button
            text={LOCALIZATION.down}
            onClick={() => this.clickHandler(ControlButton.Down)}
          />
        </div>

        <console-control-button
          text={LOCALIZATION.rotate}
          size="lg"
          onClick={() => this.clickHandler(ControlButton.Rotate)}
        />
      </Host>
    );
  }
}
