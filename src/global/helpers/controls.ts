import {ControlButton, Direction} from "@global/types";

const getDirectionAfterButtonClick = (button: ControlButton, currentDirection: Direction) => {
  if (!isDirectionButton(button)) {
    return currentDirection;
  }
  const newDirection = getDirectionFromControlButton(button);
  const isOpposite = isNewDirectionOpposite(currentDirection, newDirection);
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

const isNewDirectionOpposite = (currentDir: Direction, newDir: Direction) => {
  const oppositeDirections: [Direction, Direction][] = [
    [Direction.Up, Direction.Down],
    [Direction.Down, Direction.Up],
    [Direction.Left, Direction.Right],
    [Direction.Right, Direction.Left]
  ];
  return oppositeDirections.some(([dir1, dir2]) => currentDir === dir1 && newDir === dir2);
}

export const controlsHelpers = {
  getDirectionAfterButtonClick,
  getDirectionFromControlButton,
  isDirectionButton,
}
