import {createStore} from "@stencil/store";
import {GameStatus, ICell} from "@global/types";

interface IStatsStore {
  bricks: ICell[];
  gameStatus: GameStatus;
  level: number;
  music: boolean;
  pause: boolean;
  score: number;
  showHiScore: boolean;
  speed: number;
}

const store = createStore<IStatsStore>({
  bricks: [],
  gameStatus: GameStatus.NewGame,
  level: 1,
  music: true,
  pause: false,
  score: 0,
  showHiScore: false,
  speed: 1
})

export default store;
