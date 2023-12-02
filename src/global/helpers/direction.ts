import {Axis, Direction} from "@global/types";

const getRandom = (axis = Axis.None): Direction => {
  switch (axis) {
    case Axis.X:
      return Math.random() < 0.5 ? 2 : 4;
    case Axis.Y:
      return Math.random() < 0.5 ? 1 : 3;
    default:
      return Math.floor(Math.random() * 4) + 1;
  }
}

const isOpposite = (currentDir: Direction, newDir: Direction) => {
  const oppositeDirections = [
    [Direction.Up, Direction.Down],
    [Direction.Down, Direction.Up],
    [Direction.Left, Direction.Right],
    [Direction.Right, Direction.Left]
  ];
  return oppositeDirections.some(([dir1, dir2]) => currentDir === dir1 && newDir === dir2);
}

const rotateRight = (direction: Direction) => {
  if (direction === Direction.Left) {
    return Direction.Up;
  } else {
    return direction + 1;
  }
}


export const directionHelpers = {
  getRandom,
  isOpposite,
  rotateRight
}
