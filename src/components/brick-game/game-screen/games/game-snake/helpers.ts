import {ICell} from "@global/types";
import statsStore from "../../../../../stores/stats-store";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";

const getInitialSnake = (): ICell[] => {
  const x = Math.round((SCREEN_WIDTH / 2) - 2);
  const y = Math.round((SCREEN_HEIGHT / 2));
  const head = {x, y};
  const body1 = {x: x - 1, y};
  const body2 = {x: x - 2, y};
  return [head, body1, body2]
}

const getSnakeMoveInterval = () => {
  const initialInterval = 1000;
  const minimalInterval = 100;
  const {score} = statsStore.state;
  return Math.max(initialInterval - Math.floor(score / 5) * 150, minimalInterval);
}

export default {
  getInitialSnake,
  getSnakeMoveInterval
}