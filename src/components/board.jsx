import Cell from "./cell";
import s from "./game.module.css"

const renderBoard = ({board, boardSize, gameMode,currentUser,onClickCell}) => {
    const cells = [];
    if(gameMode==='player'){
    for (let i = 0; i < boardSize * boardSize; i++) {
        const borderTop = i < boardSize ? "none" : "4px solid #6b7885";
        const borderBottom = i >= boardSize * (boardSize - 1) ? "none" : "4px solid #6b7885";
        cells.push(<Cell key={i} style={{
            borderTop,
            borderLeft: i % boardSize === 0 ? "none" : "4px solid #6b7885",
            borderRight: (i + 1) % boardSize === 0 ? "none" : "4px solid #6b7885",
            borderBottom,
        }} currentUser={currentUser}
        onClick={() => onClickCell(i)}
        gameMode={gameMode}
        />);
    }
    }
    else{
        for (let i = 0; i < boardSize * boardSize; i++) {
            const x = i % boardSize
            const y = Math.floor(i / boardSize)
            const currentValue=board[y][x];
            const borderTop = i < boardSize ? "none" : "4px solid #6b7885";
            const borderBottom = i >= boardSize * (boardSize - 1) ? "none" : "4px solid #6b7885";

            cells.push(<Cell key={i} style={{
                borderTop,
                borderLeft: i % boardSize === 0 ? "none" : "4px solid #6b7885",
                borderRight: (i + 1) % boardSize === 0 ? "none" : "4px solid #6b7885",
                borderBottom,
                pointerEvents: currentValue !==null? "none": ""
            }} currentUser={currentUser}
            onClick={() => onClickCell(i)}
            gameMode={gameMode}
            pcState={currentValue}/>);
        }
        }

    return (
       
        <div className={s.boardContainer}>
            <svg className={s.exitButton}onClick={() => { window.location.reload(); }} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="30" fill="#d1d4dc" ><path d="M16,8a1,1,0,0,0-1.414,0L12,10.586,9.414,8A1,1,0,0,0,8,9.414L10.586,12,8,14.586A1,1,0,0,0,9.414,16L12,13.414,14.586,16A1,1,0,0,0,16,14.586L13.414,12,16,9.414A1,1,0,0,0,16,8Z" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></svg>
            <div className={s.header}>
            {gameMode ==='computer' ? (
                <div className={s.users}>
                    Bot
                    <img src="https://e7.pngegg.com/pngimages/698/456/png-clipart-robotics-computer-icons-iconfinder-scalable-graphics-robot-electronics-android.png" alt="User 1" style={{ border: currentUser === '1' ? '5px solid lightgreen' : 'none' }}/>

                </div>
            ):(
                <div className={s.users}>
                    User 1
                    <img src="https://yt3.ggpht.com/ytc/AKedOLTg7l6zvE5msLDaRBly1oSZxqN54DfSEo6YtWLh=s900-c-k-c0x00ffffff-no-rj" alt="User 2" style={{ border: currentUser === '1' ? '5px solid lightgreen' : 'none' }}/>
                </div>
            )}
                <div className={s.users}>
                    <img src="https://humanrmsa.com/images/users/user-100.jpg" alt="User 2" style={{ border: currentUser === '2' ? '5px solid lightgreen' : 'none' }}/>
                    User 2
                </div>
            </div>
            <div className={s.board} style={{
                display: "grid",
                gridTemplateColumns: `repeat(${boardSize}, 0fr)`,
                gridTemplateRows: `repeat(${boardSize}, 0fr)`,
                borderCollapse: "collapse"
            }}
            >
                {cells}
            </div>
        </div>
    )
};

export default renderBoard;