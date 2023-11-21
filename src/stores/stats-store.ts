import {createStore} from "@stencil/store";
import {GameStatus, ICell} from "@global/types";

interface IStatsStore {
  score: number;
  level: number;
  speed: number;
  bricks: ICell[][];
  gameStatus: GameStatus;
}

const store = createStore<IStatsStore>({
  score:0,
  level: 1,
  speed:1,
  bricks: [],
  gameStatus: GameStatus.NewGame
})

export default store;
