import {Game, GameStatus} from "@global/types";
import {createStore} from "@stencil/store";

interface IGlobalStore {
  game: Game;
  isPause: boolean;
  gameStatus: GameStatus;
}

const store = createStore<IGlobalStore>({
  game: Game.None,
  isPause: false,
  gameStatus: GameStatus.NewGame
});

export default store;