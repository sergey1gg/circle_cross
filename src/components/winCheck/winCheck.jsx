import React from 'react';
import s from './winCheck.module.css'

const WinCheck = (props) => {
  const showWinCheck = props.winner !== null;
  return (
    <div className={`${s.winCheck} ${showWinCheck ? 'show' : ''}`}>
      <div className={s.winCheckContent}>
        <h2 className={s.winCheckTitle}>End</h2>
        <p className={s.winCheckWinner}>{props.winner === 'tie' ? "Draw!" : `Player ${props.winner} wins!`}</p>
        <button className={s.winCheckButton} onClick={() => { window.location.reload(); }}>Main Menu</button>
      </div>
    </div>
  );
};

export default WinCheck;