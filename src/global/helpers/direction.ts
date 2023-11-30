import {Direction} from "@global/types";

const getRandom = (): Direction => {
  return Math.floor(Math.random() * 4) + 1;
}


//getRandomDirection
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
