import {Game, View} from "@global/types";
import {createStore} from "@stencil/store";

interface IGlobalStore {
  selectedMenuItem: Game;
  sounds: boolean;
  view: View;
}

const store = createStore<IGlobalStore>({
  selectedMenuItem: Game.None,
  sounds: false,
  view: View.SelectGame
});

export default store;