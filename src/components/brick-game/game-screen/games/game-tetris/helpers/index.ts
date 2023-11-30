import {Block} from "../types";
import tetrisCellHelpers from "./cells";
import statsStore from "../../../../../../stores/stats-store";
import {Direction, ICell} from "@global/types";
import {SCREEN_HEIGHT} from "@global/constants";
import {objectHelpers} from "@global/helpers/objects";


const getBlockCells = (block: Block, direction = Direction.Up, offset = tetrisCellHelpers.getInitialOffset()) => {
  return tetrisCellHelpers.getBlock(block, direction, offset);
}

const getRandomBlock = () => {
  return Math.floor(Math.random() * 7)
}

const updateNextBlockInStats = (block: Block) => {
  statsStore.state.bricks = tetrisCellHelpers.getBlock(block, Direction.Up, {x: 0, y: 0});
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
          if (bc.y - ac.y  - 1< minDistance) {
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
  getRandomBlock,
  updateNextBlockInStats
}