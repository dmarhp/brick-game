import {objectHelpers} from "@global/helpers/objects";
import statsStore from "@stores/stats-store";
import {GAME_CATALOG} from "@global/constants";
import globalStore from "@stores/global-store";

const updateLives = () => {
  const game = GAME_CATALOG[globalStore.state.game];
  if (!game || game.lives === 1) {
    statsStore.state.bricks = [];
  }
  statsStore.state.bricks = objectHelpers.getLives();
}

const sleep = async (millis: number) => {
  return new Promise((r) => setTimeout(r, millis));
}

export const commonHelpers = {
  updateLives,
  sleep
}