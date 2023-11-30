import {Game, GameStatus} from "@global/types";
import {createStore} from "@stencil/store";

interface IGlobalStore {
  game: Game;
  gameStatus: GameStatus;
}

const store = createStore<IGlobalStore>({
  game: Game.None,
  gameStatus: GameStatus.NewGame
});

export default store;