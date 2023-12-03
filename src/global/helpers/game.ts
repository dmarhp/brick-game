import {Game, GameStatus} from "@global/types";
import globalStore from "../../stores/global-store";
import statsStore from "@stores/stats-store";

const canStart = () => {
  return globalStore.state.gameStatus === GameStatus.NewGame;
}

const exit = () => {
  globalStore.state.game = Game.None;
  statsStore.state.score = 0;
  statsStore.state.bricks = [];
}

const handleLose = () => {
  statsStore.state.lives --;
  if (!hasLives()) {
    exit();
  }
  globalStore.state.gameStatus = GameStatus.NewGame;
}

const hasLives = () => {
  return statsStore.state.lives > 0;
}

const isFinished = () => {
  return [GameStatus.Win, GameStatus.Lose].includes(globalStore.state.gameStatus);
}

const start = () => {
  globalStore.state.gameStatus = GameStatus.Play;
}

export const gameHelpers = {
  canStart,
  exit,
  handleLose,
  hasLives,
  isFinished,
  start,
}