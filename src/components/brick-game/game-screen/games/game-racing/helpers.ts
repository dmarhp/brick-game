import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {ICell} from "@global/types";
import {CarPosition, IRacingBorders, IRacingCompetitorCar} from "./types";
import statsStore from "../../../../../stores/stats-store";

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
  return border.map(c => ({...c, y: c.y - 1}));
}

const getCar = (position = CarPosition.Left, offsetY = 0, blink = false): ICell[] => {
  const positionOffset = position === CarPosition.Left ? 2 : SCREEN_WIDTH - 5;
  return [
    {x: positionOffset, y: offsetY, blink},
    {x: positionOffset + 2, y: offsetY, blink},
    {x: positionOffset + 1, y: offsetY + 1, blink},
    {x: positionOffset, y: offsetY + 2, blink},
    {x: positionOffset + 1, y: offsetY + 2, blink},
    {x: positionOffset + 2, y: offsetY + 2, blink},
    {x: positionOffset + 1, y: offsetY + 3, blink},
  ];
}

const shouldPlaceNewCompetitor = (competitors: IRacingCompetitorCar[]) => {
  return competitors.every(({cells}) => cells.every(c => c.y < SCREEN_HEIGHT - COMPETITOR_DISTANCE));
}

const getCompetitorsCar = (offsetY = SCREEN_HEIGHT, position: CarPosition = null): IRacingCompetitorCar => {
  if (position === null) {
    position = getRandomPosition();
  }

  return {
    position, offsetY: offsetY, cells: getCar(position, offsetY)
  };
}

const getRandomPosition = (): CarPosition => {
  return Math.round(Math.random());

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

const isCarCrashed = (competitors: IRacingCompetitorCar[], position: CarPosition) => {
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
  isCarCrashed
}
