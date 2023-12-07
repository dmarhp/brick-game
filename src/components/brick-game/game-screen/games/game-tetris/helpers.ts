import {Direction, Figure, ICell} from "@global/types";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {objectHelpers} from "@global/helpers/objects";
import {gameHelpers} from "@global/helpers/game";
import {figureHelpers} from "@global/helpers/figures";

const getBlockCells = (block: Figure, direction = Direction.Up, offset = getInitialOffset()) => {
  return figureHelpers.get(block, offset, direction);
}

const getInitialOffset = (): ICell => {
  return {
    x: SCREEN_WIDTH / 2 - 2,
    y: SCREEN_HEIGHT - 1,
  }
}

const getOffset = (cells: ICell[]): ICell => {
  const {x} = cells.reduce((min, cell) => (cell.x < min.x ? cell : min), cells[0]);
  const {y} = cells.reduce((min, cell) => (cell.y < min.y ? cell : min), cells[0]);
  return {x, y}
}

const getRandomBlock = () => {
  const index = Math.floor(Math.random() * 7);
  return [
    Figure.BlockI,
    Figure.BlockJ,
    Figure.BlockL,
    Figure.BlockO,
    Figure.BlockS,
    Figure.BlockT,
    Figure.BlockZ
  ][index];
}

const updateNextBlockInStats = (block: Figure) => {
  const cells = getBlockCells(block, Direction.Up, {x: 0, y: 0});
  gameHelpers.renderNextObject(cells);
}


//todo: refactor this:
const dropBlock = (activeCells: ICell[], block: ICell[]) => {
  let minDistance = SCREEN_HEIGHT;
  block.forEach(bc => {
      if (bc.y < minDistance) {
        minDistance = bc.y;
      }
      activeCells
        .filter(ac => ac.x === bc.x)
        .forEach(ac => {
          if (bc.y - ac.y - 1 < minDistance) {
            minDistance = bc.y - ac.y - 1;
          }
        });
    }
  )

  return objectHelpers.move(block, Direction.Down, minDistance);
}

export default {
  dropBlock,
  getBlockCells,
  getOffset,
  getRandomBlock,
  updateNextBlockInStats
}