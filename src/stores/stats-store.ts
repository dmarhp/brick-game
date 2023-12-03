import {createStore} from "@stencil/store";
import {GameStatus, ICell} from "@global/types";
import {commonHelpers} from "@global/helpers/common";

interface IStatsStore {
  bricks: ICell[];
  gameStatus: GameStatus;
  level: number;
  lives: number;
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
  lives: 1,
  music: true,
  pause: false,
  score: 0,
  showHiScore: false,
  speed: 1
});

store.onChange('lives', commonHelpers.updateLives);

export default store;
