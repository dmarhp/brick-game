import {Game, GameStatus, ICell, View} from "@global/types";
import globalStore from "../../stores/global-store";
import gameStore from "@stores/game-store";
import {GAME_CATALOG} from "@global/constants";

const canStart = () => {
  return gameStore.state.gameStatus === GameStatus.NewGame;
}

const canContinueGame = () => {
  const {pause, gameStatus} = gameStore.state;
  return !pause && gameStatus === GameStatus.Play;
}

const exit = () => {
  // todo: update hi-score
  gameStore.state.game = Game.None;
  gameStore.state.score = 0;
  gameStore.state.smallBrickScreen = [];
  gameStore.state.pause = false;
  globalStore.state.view = View.SelectGame;
}

const getLives = () => {
  const lives: ICell[] = []
  for (let i = 0; i < gameStore.state.lives; i++) {
    lives.push({x: 0, y: i});
  }
  return lives;
}


const handleLose = () => {
  gameStore.state.lives--;
  if (!hasLives()) {
    exit();
  }
  gameStore.state.gameStatus = GameStatus.NewGame;
}

const hasLives = () => {
  return gameStore.state.lives > 0;
}

const isFinished = () => {
  return [GameStatus.Win, GameStatus.Lose].includes(gameStore.state.gameStatus);
}

const isLastLive = () => {
  return gameStore.state.lives === 1;
}

const isLoser = () => {
  return gameStore.state.gameStatus === GameStatus.Lose;
}

const isPause = () => {
  return gameStore.state.pause;
}

const renderLives = () => {
  const game = GAME_CATALOG[gameStore.state.game];
  if (!game || game.lives === 1) {
    gameStore.state.smallBrickScreen = [];
  }
  gameStore.state.smallBrickScreen = getLives();
}

const renderNextObject = (obj: ICell[]) => {
  gameStore.state.smallBrickScreen = obj;
}

const setStatus = (gameStatus: GameStatus) => {
  gameStore.state.gameStatus = gameStatus;
}

const start = () => {
  gameStore.state.gameStatus = GameStatus.Play;
}

const startNewGame = (selectedGame: Game, speed: number) => {
  const game = GAME_CATALOG[selectedGame];
  if (game && !game.locked) {
    gameStore.state.game = game.game;
    gameStore.state.lives = game.lives;
    gameStore.state.speed = speed;
  }
}

const togglePause = () => {
  if (gameStore.state.game !== Game.None) {
    gameStore.state.pause = !gameStore.state.pause;
  }
}

const toggleSounds = () => {
  globalStore.state.sounds = !globalStore.state.sounds;
}

export const gameHelpers = {
  canStart,
  canContinueGame,
  exit,
  handleLose,
  hasLives,
  isFinished,
  isLastLive,
  isLoser,
  isPause,
  renderLives,
  renderNextObject,
  setStatus,
  start,
  startNewGame,
  togglePause,
  toggleSounds,
}