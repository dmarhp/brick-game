import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";
import {ICell, Letter, LetterPosition} from "@global/types";

const screenCenter = Math.floor(SCREEN_WIDTH / 2);

const getLetterOffset = (position: LetterPosition) => {
  switch (position) {
    case LetterPosition.Top:
      return SCREEN_HEIGHT;
    case LetterPosition.Bottom:
      return 5;
  }
}

const getLetterA = (offsetY: number): ICell[] => ([
  {x: screenCenter - 1, y: offsetY - 1},
  {x: screenCenter + 0, y: offsetY - 1},

  {x: screenCenter - 2, y: offsetY - 2},
  {x: screenCenter + 1, y: offsetY - 2},

  {x: screenCenter - 3, y: offsetY - 3},
  {x: screenCenter + 2, y: offsetY - 3},

  {x: screenCenter - 3, y: offsetY - 4},
  {x: screenCenter - 2, y: offsetY - 4},
  {x: screenCenter - 1, y: offsetY - 4},
  {x: screenCenter + 0, y: offsetY - 4},
  {x: screenCenter + 1, y: offsetY - 4},
  {x: screenCenter + 2, y: offsetY - 4},

  {x: screenCenter - 3, y: offsetY - 5},
  {x: screenCenter + 2, y: offsetY - 5}
]);


const getLetterB = (offsetY: number): ICell[] => ([
  {x: screenCenter - 3, y: offsetY - 1},
  {x: screenCenter - 2, y: offsetY - 1},
  {x: screenCenter - 1, y: offsetY - 1},
  {x: screenCenter + 0, y: offsetY - 1},
  {x: screenCenter + 1, y: offsetY - 1},

  {x: screenCenter - 2, y: offsetY - 2},
  {x: screenCenter + 2, y: offsetY - 2},

  {x: screenCenter - 2, y: offsetY - 3},
  {x: screenCenter - 1, y: offsetY - 3},
  {x: screenCenter + 0, y: offsetY - 3},
  {x: screenCenter + 1, y: offsetY - 3},

  {x: screenCenter - 2, y: offsetY - 4},
  {x: screenCenter + 2, y: offsetY - 4},

  {x: screenCenter - 3, y: offsetY - 5},
  {x: screenCenter - 2, y: offsetY - 5},
  {x: screenCenter - 1, y: offsetY - 5},
  {x: screenCenter + 0, y: offsetY - 5},
  {x: screenCenter + 1, y: offsetY - 5}
]);

const getLetterC = (offsetY: number): ICell[] => ([
  {x: screenCenter - 2, y: offsetY - 1},
  {x: screenCenter - 1, y: offsetY - 1},
  {x: screenCenter + 0, y: offsetY - 1},
  {x: screenCenter + 1, y: offsetY - 1},

  {x: screenCenter - 3, y: offsetY - 2},
  {x: screenCenter + 2, y: offsetY - 2},

  {x: screenCenter - 3, y: offsetY - 3},

  {x: screenCenter - 3, y: offsetY - 4},
  {x: screenCenter + 2, y: offsetY - 4},

  {x: screenCenter - 2, y: offsetY - 5},
  {x: screenCenter - 1, y: offsetY - 5},
  {x: screenCenter + 0, y: offsetY - 5},
  {x: screenCenter + 1, y: offsetY - 5}
]);

const getLetterD = (offsetY: number): ICell[] => ([
  {x: screenCenter - 3, y: offsetY - 1},
  {x: screenCenter - 2, y: offsetY - 1},
  {x: screenCenter - 1, y: offsetY - 1},
  {x: screenCenter + 0, y: offsetY - 1},
  {x: screenCenter + 1, y: offsetY - 1},

  {x: screenCenter - 2, y: offsetY - 2},
  {x: screenCenter + 2, y: offsetY - 2},

  {x: screenCenter - 2, y: offsetY - 3},
  {x: screenCenter + 2, y: offsetY - 3},

  {x: screenCenter - 2, y: offsetY - 4},
  {x: screenCenter + 2, y: offsetY - 4},

  {x: screenCenter - 3, y: offsetY - 5},
  {x: screenCenter - 2, y: offsetY - 5},
  {x: screenCenter - 1, y: offsetY - 5},
  {x: screenCenter + 0, y: offsetY - 5},
  {x: screenCenter + 1, y: offsetY - 5}
]);

const getLetterE = (offsetY: number): ICell[] => ([
  {x: screenCenter - 3, y: offsetY - 1},
  {x: screenCenter - 2, y: offsetY - 1},
  {x: screenCenter - 1, y: offsetY - 1},
  {x: screenCenter + 0, y: offsetY - 1},
  {x: screenCenter + 1, y: offsetY - 1},
  {x: screenCenter + 2, y: offsetY - 1},


  {x: screenCenter - 2, y: offsetY - 2},

  {x: screenCenter - 2, y: offsetY - 3},
  {x: screenCenter - 1, y: offsetY - 3},
  {x: screenCenter + 0, y: offsetY - 3},
  {x: screenCenter + 1, y: offsetY - 3},

  {x: screenCenter - 2, y: offsetY - 4},

  {x: screenCenter - 3, y: offsetY - 5},
  {x: screenCenter - 2, y: offsetY - 5},
  {x: screenCenter - 1, y: offsetY - 5},
  {x: screenCenter + 0, y: offsetY - 5},
  {x: screenCenter + 1, y: offsetY - 5},
  {x: screenCenter + 2, y: offsetY - 5}
]);

const getLetterF = (offsetY: number): ICell[] => ([
  {x: screenCenter - 3, y: offsetY - 1},
  {x: screenCenter - 2, y: offsetY - 1},
  {x: screenCenter - 1, y: offsetY - 1},
  {x: screenCenter + 0, y: offsetY - 1},
  {x: screenCenter + 1, y: offsetY - 1},
  {x: screenCenter + 2, y: offsetY - 1},


  {x: screenCenter - 2, y: offsetY - 2},

  {x: screenCenter - 2, y: offsetY - 3},
  {x: screenCenter - 1, y: offsetY - 3},
  {x: screenCenter + 0, y: offsetY - 3},
  {x: screenCenter + 1, y: offsetY - 3},

  {x: screenCenter - 2, y: offsetY - 4},

  {x: screenCenter - 3, y: offsetY - 5},
  {x: screenCenter - 2, y: offsetY - 5},
  {x: screenCenter - 1, y: offsetY - 5}
]);

const getLetterG = (offsetY: number): ICell[] => ([
  {x: screenCenter - 2, y: offsetY - 1},
  {x: screenCenter - 1, y: offsetY - 1},
  {x: screenCenter + 0, y: offsetY - 1},
  {x: screenCenter + 1, y: offsetY - 1},

  {x: screenCenter - 3, y: offsetY - 2},

  {x: screenCenter - 3, y: offsetY - 3},
  {x: screenCenter + 1, y: offsetY - 3},
  {x: screenCenter + 2, y: offsetY - 3},


  {x: screenCenter - 3, y: offsetY - 4},
  {x: screenCenter + 2, y: offsetY - 4},

  {x: screenCenter - 2, y: offsetY - 5},
  {x: screenCenter - 1, y: offsetY - 5},
  {x: screenCenter + 0, y: offsetY - 5},
  {x: screenCenter + 1, y: offsetY - 5}
]);

export const getBrickLetter = (letter: Letter, position = LetterPosition.Top) => {
  const offsetY = getLetterOffset(position);
  switch (letter) {
    case 'A':
      return getLetterA(offsetY);
    case 'B':
      return getLetterB(offsetY);
    case 'C':
      return getLetterC(offsetY);
    case 'D':
      return getLetterD(offsetY);
    case 'E':
      return getLetterE(offsetY);
    case 'F':
      return getLetterF(offsetY);
    case 'G':
      return getLetterG(offsetY);
  }
}
