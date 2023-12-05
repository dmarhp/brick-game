import {IBullet, ITank} from "../components/brick-game/game-screen/games/game-tanks/types";
import {createStore} from "@stencil/store";
import {SCREEN_WIDTH} from "@global/constants";
import {Direction} from "@global/types";

const initialPlayersPosition: ITank = {
  x: Math.floor(SCREEN_WIDTH / 2),
  y: 1,
  direction: Direction.Up,
  cells: [],
  isPlayer: true
}

interface IGameTanksStore {
  player: ITank;
  enemies: ITank[];
  playerBullets: IBullet[];
  enemyBullets: IBullet[];
  isPlayerDestroyed: boolean;
}

const store = createStore<IGameTanksStore>({
  player: initialPlayersPosition,
  enemies: [],
  playerBullets: [],
  enemyBullets: [],
  isPlayerDestroyed: false
});

export default store;
