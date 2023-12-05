import {Game, GameStatus, ICell, View} from "@global/types";
import {createStore} from "@stencil/store";
import {gameHelpers} from "@global/helpers/game";
import {screenHelpers} from "@global/helpers/screen";

interface IGameStore {
  game: Game;
  gameStatus: GameStatus;
  level: number;
  lives: number;
  smallBrickScreen: ICell[];
  pause: boolean;
  score: number;
  speed: number;
}

const store = createStore<IGameStore>({
  game: Game.None,
  gameStatus: GameStatus.NewGame,
  level: 1,
  lives: 0,
  smallBrickScreen: [],
  pause: false,
  score: 0,
  speed: 1
});

store.onChange('game', () => gameChangeHandler());
store.onChange('lives', () => gameHelpers.renderLives());

const gameChangeHandler = () => {
  const {game} = store.state;
  const view = game === Game.None ? View.SelectGame : View.Game;
  screenHelpers.setView(view);
}

export default store;
