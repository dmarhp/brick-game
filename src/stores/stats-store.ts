import {createStore} from "@stencil/store";
import {GameStatus, ICell} from "@global/types";

interface IStatsStore {
  score: number;
  level: number;
  speed: number;
  bricks: ICell[][];
  gameStatus: GameStatus;
  music: boolean;
  pause: boolean;
}

const store = createStore<IStatsStore>({
  score: 0,
  level: 1,
  speed: 1,
  bricks: [],
  gameStatus: GameStatus.NewGame,
  music: true,
  pause: false
})

export default store;
