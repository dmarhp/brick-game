import {ControlButton} from "@global/types";

const getControlButtonFromKeyBoardEvent = (event: KeyboardEvent): ControlButton => {
  switch (event.key) {
    case 'w':
    case 'ArrowUp':
      return ControlButton.Up;
    case 's' :
    case 'ArrowDown':
      return ControlButton.Down;
    case 'a' :
    case 'ArrowLeft':
      return ControlButton.Left;
    case 'd':
    case 'ArrowRight':
      return ControlButton.Right;
    case ' ':
      return ControlButton.Rotate;
    case 'p':
      return ControlButton.Pause;
    case 'o':
      return ControlButton.Sounds;
    case 'Escape': 
      return ControlButton.Exit;
    default:
      return ControlButton.None;
  }
}

const isDirectionOrRotateButton = (button: ControlButton) => {
  return [
    ControlButton.Up,
    ControlButton.Down,
    ControlButton.Left,
    ControlButton.Right,
    ControlButton.Rotate
  ].includes(button);
}

export default {
  getControlButtonFromKeyBoardEvent,
  isDirectionOrRotateButton
}
