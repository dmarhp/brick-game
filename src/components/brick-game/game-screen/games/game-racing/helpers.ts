import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {Axis, Direction, ICell} from "@global/types";
import {IRacingBorders, IRacingCompetitorCar} from "./types";
import statsStore from "../../../../../stores/stats-store";
import {cellHelpers} from "@global/helpers/cells";
import {directionHelpers} from "@global/helpers/direction";

const BORDER_PATTERN = [true, true, true, false, false];
const COMPETITOR_DISTANCE = 4;
const CAR_HEIGHT = 4;

const getInitialBorders = (): IRacingBorders => {
  const left: ICell[] = [];
  const right: ICell[] = [];

  for (let y = 0; y < SCREEN_HEIGHT; y++) {
    const indexInPattern = y % BORDER_PATTERN.length;
    if (BORDER_PATTERN[indexInPattern]) {
      const leftCell = {x: 0, y};
      const rightCell = {x: SCREEN_WIDTH - 1, y};
      left.push(leftCell);
      right.push(rightCell);
    }
  }
  return {left, right};
}

const moveBorders = ({left, right}: IRacingBorders) => {
  return {
    left: moveBorder(left),
    right: moveBorder(right)
  };
}

const moveBorder = (border: ICell[]) => {
  if (border[0].y === 0) {
    const shiftedCell = border.shift();
    shiftedCell.y = SCREEN_HEIGHT;
    border.push(shiftedCell);
  }
  return border.map(c => cellHelpers.move(c, Direction.Down));
}

const getCar = (position = Direction.Left, offsetY = 0): ICell[] => {
  const positionOffset = position === Direction.Left ? 2 : SCREEN_WIDTH - 5;
  return [
    {x: positionOffset + 0, y: offsetY + 0},
    {x: positionOffset + 2, y: offsetY + 0},
    {x: positionOffset + 1, y: offsetY + 1},
    {x: positionOffset + 0, y: offsetY + 2},
    {x: positionOffset + 1, y: offsetY + 2},
    {x: positionOffset + 2, y: offsetY + 2},
    {x: positionOffset + 1, y: offsetY + 3},
  ];
}

const getCrashedCar = (position: Direction, firstFrame: boolean) => {
  const offsetX = position === Direction.Left ? 1 : SCREEN_WIDTH - 5;
  if (firstFrame) {
    return [
      {y: 0, x: offsetX + 0},
      {y: 0, x: offsetX + 3},
      {y: 1, x: offsetX + 1},
      {y: 1, x: offsetX + 2},
      {y: 2, x: offsetX + 1},
      {y: 2, x: offsetX + 2},
      {y: 3, x: offsetX + 0},
      {y: 3, x: offsetX + 3},
    ];
  } else {
    return [
      {y: 0, x: offsetX + 1},
      {y: 0, x: offsetX + 2},
      {y: 1, x: offsetX + 0},
      {y: 1, x: offsetX + 3},
      {y: 2, x: offsetX + 0},
      {y: 2, x: offsetX + 3},
      {y: 3, x: offsetX + 1},
      {y: 3, x: offsetX + 2},
    ]
  }
}

const shouldPlaceNewCompetitor = (competitors: IRacingCompetitorCar[]) => {
  return competitors.every(({cells}) => cells.every(c => c.y < SCREEN_HEIGHT - COMPETITOR_DISTANCE));
}

const getCompetitorsCar = (offsetY = SCREEN_HEIGHT, position: Direction = null): IRacingCompetitorCar => {
  if (position === null) {
    position = directionHelpers.getRandom(Axis.X);
  }

  return {
    position: position, offsetY: offsetY, cells: getCar(position, offsetY)
  };
}

const getInitialCompetitors = () => {
  const competitor1 = getCompetitorsCar(SCREEN_HEIGHT - CAR_HEIGHT - COMPETITOR_DISTANCE);

  return [competitor1];
}

const moveCompetitor = ({offsetY, position}: IRacingCompetitorCar) => {
  offsetY--;
  return getCompetitorsCar(offsetY, position);
}

const updateCompetitorsAfterMove = (competitors: IRacingCompetitorCar[]) => {
  const updatedCompetitors = competitors
    .map(moveCompetitor)
    .filter(c => c.cells.some(({y}) => y >= 0));

  if (updatedCompetitors < competitors) {
    statsStore.state.score++;
  }

  if (shouldPlaceNewCompetitor(competitors)) {
    const newCompetitor = getCompetitorsCar();
    updatedCompetitors.push(newCompetitor);
  }

  return updatedCompetitors;
}

const isCarCrashed = (competitors: IRacingCompetitorCar[], position: Direction) => {
  const car = getCar(position);
  return competitors
    .filter(c => c.position === position)
    .map(({cells}) => cells.map(({y}) => y))
    .flat()
    .some(y => car.some(c => c.y === y));
}

export default {
  getInitialBorders,
  moveBorders,
  getCar,
  getInitialCompetitors,
  updateCompetitorsAfterMove,
  isCarCrashed,
  getCrashedCar
}
