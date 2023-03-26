import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkForWinner, setCell, setUpdateUser } from "../reducers/gameReducer";
//import s from "./Cell.module.css";
import s from "./game.module.css"
export const getMove = (board, player) => {
    const boardSize = board.length;
    
    // Check if there's a winning move available
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] === null) {
          board[i][j] = player;
          if (checkWinner(board, player)) {
            return { row: i, col: j };
          }
          board[i][j] = null;
        }
      }
    }
    
    // Check if there's a blocking move available
    const opponent = player === "X" ? "O" : "X";
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] === null) {
          board[i][j] = opponent;
          if (checkWinner(board, opponent)) {
            board[i][j] = player;
            return { row: i, col: j };
          }
          board[i][j] = null;
        }
      }
    }
    
    // Otherwise, make a random move
    let rowIndex = Math.floor(Math.random() * boardSize);
    let colIndex = Math.floor(Math.random() * boardSize);
    while (board[rowIndex][colIndex] !== null) {
      rowIndex = Math.floor(Math.random() * boardSize);
      colIndex = Math.floor(Math.random() * boardSize);
    }
    return { row: rowIndex, col: colIndex };
  };
  
  function checkWinner(board, player) {
    const boardSize = board.length;
    const winRow = new Array(boardSize).fill(player).join("");
    for (let i = 0; i < boardSize; i++) {
      if (board[i].join("") === winRow) {
        return true;
      }
      let col = "";
      for (let j = 0; j < boardSize; j++) {
        col += board[j][i];
      }
      if (col === winRow) {
        return true;
      }
    }
    let diag1 = "";
    let diag2 = "";
    for (let i = 0; i < boardSize; i++) {
      diag1 += board[i][i];
      diag2 += board[i][boardSize - 1 - i];
    }
    if (diag1 === winRow || diag2 === winRow) {
      return true;
    }
    return false;
  }
const Cell = (props) => {
    const board = useSelector(state => state.game.board)
    const dispatch = useDispatch()
    const [cellState, setCellState] = useState(null);
    const [disableClick, setDisableClick] = useState(false);
    const handleClick = () => {
        const res = props.onClick()
        if (props.gameMode === 'player') {
            if (props.currentUser === '1') {
                setCellState("cross");// установить крестик в текущую ячейку
                dispatch(setUpdateUser('2',"O")) 
                dispatch(setCell({ rowIndex: res.row, colIndex: res.col, value: "X" }));
            }
            else {
                setCellState("circle");
                dispatch(setUpdateUser('1',"X"))
                dispatch(setCell({ rowIndex: res.row, colIndex: res.col, value: "O" }));
                //console.log(checkForWinner(board));
            }
            if (props.onClick) {
                props.onClick();
            }
            setDisableClick(true);
        }
        
        else {
           if(props.currentUser==='2'){
            setCellState("circle");
            dispatch(setUpdateUser('1',"X"))
            dispatch(setCell({ rowIndex: res.row, colIndex: res.col, value: "O" }));
                
            }
            setDisableClick(true);
        }
        
    };

    return (
        <div className={`${s.cell} ${disableClick ? s.disabled : ''}`} onClick={handleClick} style={props.style}>
            {cellState === "circle" || props.pcState==='O' ? (
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="35" height="35" strokeWidth='1' stroke="#ee6677" fill="#ee6677"><path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22Z" /></svg>

            ): null}
            {cellState === "cross"|| props.pcState==='X' ? (
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="35" height="35" strokeWidth='1' stroke="#18bc9c" fill="#18bc9c"><path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z" /></svg>

            ): null}

        </div>
    );
};

export default Cell;