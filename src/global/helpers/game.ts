import {GameStatus} from "@global/types";
import globalStore from "../../stores/global-store";

const isFinished = () => {
  return [GameStatus.Win, GameStatus.Lose].includes(globalStore.state.gameStatus);
}

export const gameHelpers = {
  isFinished,
}