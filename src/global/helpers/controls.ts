import {ControlButton, Direction} from "@global/types";
import {directionHelpers} from "@global/helpers/direction";

const getDirectionAfterButtonClick = (button: ControlButton, currentDirection: Direction) => {
  if (!isDirectionButton(button)) {
    return currentDirection;
  }
  const newDirection = getDirectionFromControlButton(button);
  const isOpposite = directionHelpers.isOpposite(currentDirection, newDirection);
  return isOpposite ? currentDirection : newDirection;
}

const getDirectionFromControlButton = (button: ControlButton) => {
  switch (button) {
    case ControlButton.Up:
      return Direction.Up;
    case ControlButton.Left:
      return Direction.Left;
    case ControlButton.Right:
      return Direction.Right;
    case ControlButton.Down:
      return Direction.Down;
    default:
      return Direction.None;
  }
}

const isDirectionButton = (button: ControlButton) => {
  return [
    ControlButton.Up,
    ControlButton.Left,
    ControlButton.Right,
    ControlButton.Down
  ].includes(button);
}

export const controlsHelpers = {
  getDirectionAfterButtonClick,
  getDirectionFromControlButton,
  isDirectionButton,
}
