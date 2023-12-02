import {Game, GameStatus} from "@global/types";
import {createStore} from "@stencil/store";

interface IGlobalStore {
  game: Game;
  gameStatus: GameStatus;
  selectedMenuItem: Game;
}

const store = createStore<IGlobalStore>({
  game: Game.None,
  gameStatus: GameStatus.NewGame,
  selectedMenuItem: Game.None
});

export default store;