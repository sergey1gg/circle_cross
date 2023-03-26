import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkForWinner, setBoard, setCell, setUpdateUser } from '../reducers/gameReducer';
import RenderBoard from './board';
import { getMove } from './cell';
import s from './game.module.css'
import WinCheck from './winCheck/winCheck';
function TicTacToe() {
  const dispatch=useDispatch()
  const currentUser= useSelector(state=>state.game.currentUser)
  const symbol=useSelector(state=>state.game.symbol)
  const board=useSelector(state=>state.game.board)
  const boardSize=useSelector(state=>state.game.boardSize)
  const [gameMode, setGameMode] = useState('computer');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(()=>{
    const setUser = (Math.floor(Math.random() * 2) + 1).toString();
    console.log(setUser)
    if (setUser==='1'){
      dispatch(setUpdateUser(setUser, "X"))
      const aiRes=getMove(board, "X")
      dispatch(setUpdateUser('2',"O")) 
      dispatch(setCell({ rowIndex: aiRes.row, colIndex: aiRes.col, value: "X" }));
    }
    else{
      dispatch(setUpdateUser(setUser, "O"))
    }
  },[])
  useEffect(() => {
      const winner = checkForWinner(board);
      if (winner) {
          setWinner(winner);  
      }
      if(currentUser==='1' && gameMode==='computer' && !winner){
        const aiRes=getMove(board, symbol)
        //setCellState("cross")
        dispatch(setUpdateUser('2',"O")) 
        dispatch(setCell({ rowIndex: aiRes.row, colIndex: aiRes.col, value: "X" }));
    }
    }, [board]);
  const startGame = () => {
    setIsGameStarted(true);
  }

  const handleCellClick = (index) => {
    const width=boardSize
    const row = Math.floor(index / width);
    const col = index % width;
    return{row,col}
    
};

  return (
    <div className={s.container}>
      {!isGameStarted ? (
        
      <div className={s.rightMenu}>
      <h2  className={s.mainHeader}>Крестики нолики</h2>
        <svg  className={s.mainHeader} id="Capa_1" height="150px" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m497 339h-128v-166h128c8.284 0 15-6.716 15-15s-6.716-15-15-15h-128v-128c0-8.284-6.716-15-15-15s-15 6.716-15 15v128h-166v-128c0-8.284-6.716-15-15-15s-15 6.716-15 15v128h-128c-8.284 0-15 6.716-15 15s6.716 15 15 15h128v166h-128c-8.284 0-15 6.716-15 15s6.716 15 15 15h128v128c0 8.284 6.716 15 15 15s15-6.716 15-15v-128h166v128c0 8.284 6.716 15 15 15s15-6.716 15-15v-128h128c8.284 0 15-6.716 15-15s-6.716-15-15-15zm-324 0v-166h166v166z" fill="#617882"></path><path d="m60 0c-33.084 0-60 26.916-60 60s26.916 60 60 60 60-26.916 60-60-26.916-60-60-60zm0 90c-16.542 0-30-13.458-30-30s13.458-30 30-30 30 13.458 30 30-13.458 30-30 30z" fill="#72b8f2"></path><path d="m452 392c-33.084 0-60 26.916-60 60s26.916 60 60 60 60-26.916 60-60-26.916-60-60-60zm0 90c-16.542 0-30-13.458-30-30s13.458-30 30-30 30 13.458 30 30-13.458 30-30 30z" fill="#63a1e9"></path><path d="m110.606 401.394c-5.857-5.857-15.355-5.857-21.213 0l-29.393 29.393-29.394-29.394c-5.857-5.857-15.355-5.857-21.213 0s-5.858 15.355 0 21.213l29.394 29.394-29.393 29.394c-5.858 5.857-5.858 15.355 0 21.213 2.928 2.928 6.767 4.393 10.606 4.393s7.678-1.465 10.606-4.394l29.394-29.393 29.394 29.394c2.928 2.928 6.767 4.393 10.606 4.393s7.678-1.465 10.606-4.394c5.858-5.857 5.858-15.355 0-21.213l-29.393-29.393 29.394-29.394c5.857-5.857 5.857-15.355-.001-21.212z" fill="#ed6d7d"></path><path d="m256 196c-33.084 0-60 26.916-60 60s26.916 60 60 60 60-26.916 60-60-26.916-60-60-60zm0 90c-16.542 0-30-13.458-30-30s13.458-30 30-30 30 13.458 30 30-13.458 30-30 30z" fill="#72b8f2"></path><path d="m256 196v30c16.542 0 30 13.458 30 30s-13.458 30-30 30v30c33.084 0 60-26.916 60-60s-26.916-60-60-60z" fill="#63a1e9"></path><path d="m205.394 110.606c2.928 2.93 6.767 4.394 10.606 4.394s7.678-1.464 10.606-4.394l29.394-29.393 29.394 29.394c2.928 2.929 6.767 4.393 10.606 4.393s7.678-1.464 10.606-4.394c5.858-5.858 5.858-15.355 0-21.213l-29.393-29.393 29.394-29.394c5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0l-29.394 29.394-29.394-29.393c-5.857-5.858-15.355-5.858-21.213 0s-5.858 15.355 0 21.213l29.394 29.393-29.394 29.394c-5.857 5.857-5.857 15.355.001 21.212z" fill="#ed6d7d"></path><path d="m296 115c3.839 0 7.678-1.464 10.606-4.394 5.858-5.858 5.858-15.355 0-21.213l-29.393-29.393 29.394-29.394c5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0l-29.394 29.394v42.426l29.394 29.394c2.928 2.929 6.767 4.393 10.606 4.393z" fill="#d44854"></path><path d="m173 339v-166h83v-30h-83v-128c0-8.284-6.716-15-15-15s-15 6.716-15 15v128h-128c-8.284 0-15 6.716-15 15s6.716 15 15 15h128v166h-128c-8.284 0-15 6.716-15 15s6.716 15 15 15h128v128c0 8.284 6.716 15 15 15s15-6.716 15-15v-128h83v-30z" fill="#5a5555"></path><path d="m497 339h-128v-166h128c8.284 0 15-6.716 15-15s-6.716-15-15-15h-128v-128c0-8.284-6.716-15-15-15s-15 6.716-15 15v128h-83v30h83v166h-83v30h83v128c0 8.284 6.716 15 15 15s15-6.716 15-15v-128h128c8.284 0 15-6.716 15-15s-6.716-15-15-15z" fill="#453f3f"></path></svg>
        <div>
          <label htmlFor="board-size">Размер поля:</label>
          <select
            id="board-size"
            value={boardSize}
            onChange={(e) => dispatch(setBoard(parseInt(e.target.value)))}//setBoardSize(parseInt(e.target.value))}
          >
            <option value="3">3x3</option>
            <option value="4">4x4</option>
            <option value="5">5x5</option>
          </select>
        </div>
        <div>
          <label htmlFor="game-mode">Режим игры:</label>
          <select id="game-mode" value={gameMode} onChange={(e)=>setGameMode(e.target.value)}>
            <option value="computer">Игра с компьютером</option>
            <option value="player">Игра с другим игроком</option>
          </select>
        </div>
        <button className={s.button} onClick={startGame}>
          Начать игру
        </button>
      </div>
              ) : (
        <RenderBoard board={board} boardSize={boardSize} gameMode={gameMode} currentUser={currentUser}onClickCell={handleCellClick}/>
      //{isGameStarted && renderBoard({ boardSize, gameMode })}
      )}
       {winner ?<WinCheck winner={winner} />: null}
    </div>
  );
}
export default TicTacToe;
