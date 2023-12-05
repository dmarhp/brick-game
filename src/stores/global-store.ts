import {Game, View} from "@global/types";
import {createStore} from "@stencil/store";

interface IGlobalStore {
  selectedMenuItem: Game;
  music: boolean;
  view: View;
}

const store = createStore<IGlobalStore>({
  music: false,
  view: View.SelectGame,
  selectedMenuItem: Game.None
});

export default store;