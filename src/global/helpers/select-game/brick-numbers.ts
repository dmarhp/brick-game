import {ICell, LetterPosition} from "@global/types";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@global/constants";

const getDigit0 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 0, y: offsetY - 1},
  {x: offsetX + 1, y: offsetY - 1},
  {x: offsetX + 2, y: offsetY - 1},

  {x: offsetX + 0, y: offsetY - 2},
  {x: offsetX + 2, y: offsetY - 2},

  {x: offsetX + 0, y: offsetY - 3},
  {x: offsetX + 2, y: offsetY - 3},

  {x: offsetX + 0, y: offsetY - 4},
  {x: offsetX + 2, y: offsetY - 4},

  {x: offsetX + 0, y: offsetY - 5},
  {x: offsetX + 1, y: offsetY - 5},
  {x: offsetX + 2, y: offsetY - 5}
]);

const getDigit1 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 1, y: offsetY - 1},

  {x: offsetX + 0, y: offsetY - 2},
  {x: offsetX + 1, y: offsetY - 2},

  {x: offsetX + 1, y: offsetY - 3},

  {x: offsetX + 1, y: offsetY - 4},

  {x: offsetX + 0, y: offsetY - 5},
  {x: offsetX + 1, y: offsetY - 5},
  {x: offsetX + 2, y: offsetY - 5}
]);

const getDigit2 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 0, y: offsetY - 1},
  {x: offsetX + 1, y: offsetY - 1},
  {x: offsetX + 2, y: offsetY - 1},

  {x: offsetX + 2, y: offsetY - 2},

  {x: offsetX + 0, y: offsetY - 3},
  {x: offsetX + 1, y: offsetY - 3},
  {x: offsetX + 2, y: offsetY - 3},

  {x: offsetX + 0, y: offsetY - 4},

  {x: offsetX + 0, y: offsetY - 5},
  {x: offsetX + 1, y: offsetY - 5},
  {x: offsetX + 2, y: offsetY - 5}
]);

const getDigit3 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 0, y: offsetY - 1},
  {x: offsetX + 1, y: offsetY - 1},
  {x: offsetX + 2, y: offsetY - 1},

  {x: offsetX + 2, y: offsetY - 2},

  {x: offsetX + 0, y: offsetY - 3},
  {x: offsetX + 1, y: offsetY - 3},
  {x: offsetX + 2, y: offsetY - 3},

  {x: offsetX + 2, y: offsetY - 4},

  {x: offsetX + 0, y: offsetY - 5},
  {x: offsetX + 1, y: offsetY - 5},
  {x: offsetX + 2, y: offsetY - 5}
]);

const getDigit4 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 0, y: offsetY - 1},
  {x: offsetX + 2, y: offsetY - 1},

  {x: offsetX + 0, y: offsetY - 2},
  {x: offsetX + 2, y: offsetY - 2},

  {x: offsetX + 0, y: offsetY - 3},
  {x: offsetX + 1, y: offsetY - 3},
  {x: offsetX + 2, y: offsetY - 3},

  {x: offsetX + 2, y: offsetY - 4},

  {x: offsetX + 2, y: offsetY - 5}
]);

const getDigit5 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 0, y: offsetY - 1},
  {x: offsetX + 1, y: offsetY - 1},
  {x: offsetX + 2, y: offsetY - 1},

  {x: offsetX + 0, y: offsetY - 2},

  {x: offsetX + 0, y: offsetY - 3},
  {x: offsetX + 1, y: offsetY - 3},
  {x: offsetX + 2, y: offsetY - 3},

  {x: offsetX + 2, y: offsetY - 4},

  {x: offsetX + 0, y: offsetY - 5},
  {x: offsetX + 1, y: offsetY - 5},
  {x: offsetX + 2, y: offsetY - 5}
]);

const getDigit6 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 0, y: offsetY - 1},
  {x: offsetX + 1, y: offsetY - 1},
  {x: offsetX + 2, y: offsetY - 1},

  {x: offsetX + 0, y: offsetY - 2},

  {x: offsetX + 0, y: offsetY - 3},
  {x: offsetX + 1, y: offsetY - 3},
  {x: offsetX + 2, y: offsetY - 3},

  {x: offsetX + 0, y: offsetY - 4},
  {x: offsetX + 2, y: offsetY - 4},

  {x: offsetX + 0, y: offsetY - 5},
  {x: offsetX + 1, y: offsetY - 5},
  {x: offsetX + 2, y: offsetY - 5}
]);

const getDigit7 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 0, y: offsetY - 1},
  {x: offsetX + 1, y: offsetY - 1},
  {x: offsetX + 2, y: offsetY - 1},

  {x: offsetX + 2, y: offsetY - 2},

  {x: offsetX + 2, y: offsetY - 3},

  {x: offsetX + 2, y: offsetY - 4},

  {x: offsetX + 2, y: offsetY - 5}
]);

const getDigit8 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 0, y: offsetY - 1},
  {x: offsetX + 1, y: offsetY - 1},
  {x: offsetX + 2, y: offsetY - 1},

  {x: offsetX + 0, y: offsetY - 2},
  {x: offsetX + 2, y: offsetY - 2},

  {x: offsetX + 0, y: offsetY - 3},
  {x: offsetX + 1, y: offsetY - 3},
  {x: offsetX + 2, y: offsetY - 3},

  {x: offsetX + 0, y: offsetY - 4},
  {x: offsetX + 2, y: offsetY - 4},

  {x: offsetX + 0, y: offsetY - 5},
  {x: offsetX + 1, y: offsetY - 5},
  {x: offsetX + 2, y: offsetY - 5}
]);

const getDigit9 = (offsetX: number, offsetY: number): ICell[] => ([
  {x: offsetX + 0, y: offsetY - 1},
  {x: offsetX + 1, y: offsetY - 1},
  {x: offsetX + 2, y: offsetY - 1},

  {x: offsetX + 0, y: offsetY - 2},
  {x: offsetX + 2, y: offsetY - 2},

  {x: offsetX + 0, y: offsetY - 3},
  {x: offsetX + 1, y: offsetY - 3},
  {x: offsetX + 2, y: offsetY - 3},

  {x: offsetX + 2, y: offsetY - 4},

  {x: offsetX + 0, y: offsetY - 5},
  {x: offsetX + 1, y: offsetY - 5},
  {x: offsetX + 2, y: offsetY - 5}
]);

const getBrickDigit = (digit: number, offsetX: number, offsetY: number) => {
  switch (digit) {
    case 1:
      return getDigit1(offsetX, offsetY);
    case 2:
      return getDigit2(offsetX, offsetY);
    case 3:
      return getDigit3(offsetX, offsetY);
    case 4:
      return getDigit4(offsetX, offsetY);
    case 5:
      return getDigit5(offsetX, offsetY);
    case 6:
      return getDigit6(offsetX, offsetY);
    case 7:
      return getDigit7(offsetX, offsetY);
    case 8:
      return getDigit8(offsetX, offsetY);
    case 9:
      return getDigit9(offsetX, offsetY);
    case 0:
    default:
      return getDigit0(offsetX, offsetY);
  }
}

const getNumberOffset = (position: LetterPosition) => {
  switch (position) {
    case LetterPosition.Top:
      return SCREEN_HEIGHT;
    case LetterPosition.Bottom:
      return 5;
  }
}

const getArrayOfDigits = (num: number): number[] => {
  if (num >= 0 && num <= 99) {
    const string = String(num).padStart(2, '0');
    const first = Number(string[0]) || 0;
    const second = Number(string[1]) || 0;
    return [first, second];
  } else {
    return [0, 0];
  }
}

export const getBrickNumber = (num: number, position = LetterPosition.Bottom) => {
  const offsetY = getNumberOffset(position);
  const [first, second] = getArrayOfDigits(num);
  const firstOffsetX = Math.floor(SCREEN_WIDTH / 2 - 4);
  const secondOffsetX = Math.floor(SCREEN_WIDTH / 2 + 1);

  const firstDigitCells = getBrickDigit(first, firstOffsetX, offsetY);
  const secondDigitCells = getBrickDigit(second, secondOffsetX, offsetY);

  return [...firstDigitCells, ...secondDigitCells];
}
