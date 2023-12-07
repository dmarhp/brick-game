import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {Axis, Direction, Figure, ICell} from "@global/types";
import {IRacingCar} from "./types";
import {directionHelpers} from "@global/helpers/direction";
import {objectHelpers} from "@global/helpers/objects";
import {figureHelpers} from "@global/helpers/figures";

const COMPETITOR_DISTANCE = 4;

const getCrashedCar = ({position, offsetY}: IRacingCar, frame: 1 | 2): IRacingCar => {
  const offsetX = position === Direction.Left ? 2 : SCREEN_WIDTH - 6;
  const offset = {x: offsetX, y: offsetY};
  const figure = frame === 1 ? Figure.Crash1 : Figure.Crash2;
  const cells = figureHelpers.get(figure, offset);

  return {position, offsetY, cells};
}

const getInitialCompetitors = () => {
  const carHeight = 4;
  const offsetY = SCREEN_HEIGHT - COMPETITOR_DISTANCE - carHeight;
  return [getCompetitor(offsetY)];
}

const getCar = (figure: Figure.Car | Figure.CarPlayer, position: Direction, offsetY: number): IRacingCar => {
  const offset = getOffset(offsetY, position);
  const cells = figureHelpers.get(figure, offset);
  return {offsetY, position, cells};
}

const getCompetitor = (offsetY = SCREEN_HEIGHT, position: Direction = Direction.None): IRacingCar => {
  if (position === Direction.None) {
    position = directionHelpers.getRandom(Axis.X);
  }

  return getCar(Figure.Car, position, offsetY);
}

const getPlayer = (position: Direction = Direction.None): IRacingCar => {
  if (position === Direction.None) {
    position = directionHelpers.getRandom(Axis.X);
  }

  return getCar(Figure.CarPlayer, position, 0);
}

const getOffset = (offsetY: number, position: Direction): ICell => {
  const offsetX = position === Direction.Left ? 3 : SCREEN_WIDTH - 4;
  return {x: offsetX, y: offsetY};
}

const isPlayerCrashed = (competitors: IRacingCar[], player: IRacingCar) => {
  const competitorCells = competitors
    .filter(({position}) => position === player.position)
    .map(({cells}) => cells)
    .flat();

  return objectHelpers.isOverlapping(competitorCells, player.cells);
}

const moveCompetitor = ({offsetY, position}: IRacingCar) => {
  const updatedCar = getCompetitor(offsetY - 1, position);
  if (objectHelpers.isHiddenOrAbove(updatedCar.cells)) {
    return null;
  }
  return updatedCar;
}

const shouldPlaceNewCompetitor = (competitors: IRacingCar[]) => {
  const offsetY = SCREEN_HEIGHT - COMPETITOR_DISTANCE;
  return competitors.every(({cells}) => cells.every(({y}) => y < offsetY));
}

export default {
  getCompetitor,
  getCrashedCar,
  getInitialCompetitors,
  getPlayer,
  isPlayerCrashed,
  moveCompetitor,
  shouldPlaceNewCompetitor
}
