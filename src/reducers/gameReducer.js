const initialState = {
  currentUser: '2',
  symbol: "O",
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  boardSize: 3,
  winner: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_UPDATE':
      return {
        ...state,
        currentUser: action.user,
        symbol: action.symbol
      };
    case 'CELL_UPDATE':
      const { rowIndex, colIndex, value } = action.cell;
      const board = state.board.map((row, i) => {
        if (i === rowIndex) {
          return row.map((cell, j) => (j === colIndex ? value : cell));
        }
        return row;
      });

      const winner = checkForWinner(board);

      return {
        ...state,
        board,
        winner,
      };
    case 'SET_BOARD':
      return {
        ...state,
        board: Array(action.count).fill().map(() => Array(action.count).fill(null)),
        boardSize: action.count,
        winner: null,
      };
    default:
      return state;
  }
};

export const checkForWinner = (board) => {
  const boardSize = board.length;
  const targetCount = boardSize > 3 ? 4 : 3; // задаем количество фишек для победы в зависимости от размера доски
  // Check rows
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j <= boardSize - targetCount; j++) {
      if (
        board[i][j] !== null &&
        board[i][j] === board[i][j + 1] &&
        board[i][j] === board[i][j + 2] &&
        (targetCount === 4 ? board[i][j] === board[i][j + 3] : true) // проверяем четвертую фишку, если необходимо
      ) {
        return board[i][j];
      }
    }
  }

  // Check columns
  for (let i = 0; i <= boardSize - targetCount; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (
        board[i][j] !== null &&
        board[i][j] === board[i + 1][j] &&
        board[i][j] === board[i + 2][j] &&
        (targetCount === 4 ? board[i][j] === board[i + 3][j] : true) // проверяем четвертую фишку, если необходимо
      ) {
        return board[i][j];
      }
    }
  }

  // Check diagonals
  for (let i = 0; i <= boardSize - targetCount; i++) {
    for (let j = 0; j <= boardSize - targetCount; j++) {
      if (
        board[i][j] !== null &&
        board[i][j] === board[i + 1][j + 1] &&
        board[i][j] === board[i + 2][j + 2] &&
        (targetCount === 4 ? board[i][j] === board[i + 3][j + 3] : true) // проверяем четвертую фишку, если необходимо
      ) {
        return board[i][j];
      }
      if (
        board[i][j + targetCount - 1] !== null &&
        board[i][j + targetCount - 1] === board[i + 1][j + targetCount - 2] &&
        board[i][j + targetCount - 1] === board[i + 2][j + targetCount - 3] &&
        (targetCount === 4 ? board[i][j + targetCount - 1] === board[i + 3][j + targetCount - 4] : true) // проверяем четвертую фишку, если необходимо
      ) {
        return board[i][j + targetCount - 1];
      }
    }
  }

  // Check for tie
  if (board.every((row) => row.every((cell) => cell !== null))) return 'tie';

  // No winner yet
  return null
}


export const setUpdateUser = (user,symbol) => ({ type: 'USER_UPDATE', user,symbol });
export const setCell = (cell) => ({ type: 'CELL_UPDATE', cell });
export const setBoard = (count) => ({ type: 'SET_BOARD', count });

export default gameReducer;
