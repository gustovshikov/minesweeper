import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './App';

export const Board = () => {
  const { boardSize, board, setCurrentClick, setBoard } =
    useContext(AppContext);

  const checkIfBomb = cords => {
    if (board[cords.row] === undefined) return false;
    if (board[cords.row][cords.col] === undefined) return false;
    if (board[cords.row][cords.col].bomb === true) return true;
    return false;
  };

  const numberAround = cords => {
    let number = 0;
    let adjB = { row: cords.row + 1, col: cords.col };
    let adjT = { row: cords.row - 1, col: cords.col };
    let adjR = { row: cords.row, col: cords.col + 1 };
    let adjL = { row: cords.row, col: cords.col - 1 };
    let adjTR = { row: cords.row - 1, col: cords.col + 1 };
    let adjTL = { row: cords.row - 1, col: cords.col - 1 };
    let adjBR = { row: cords.row + 1, col: cords.col + 1 };
    let adjBL = { row: cords.row - 1, col: cords.col - 1 };

    if (checkIfBomb(adjB)) number = number + 1;
    if (checkIfBomb(adjT)) number = number + 1;
    if (checkIfBomb(adjR)) number = number + 1;
    if (checkIfBomb(adjL)) number = number + 1;
    if (checkIfBomb(adjTR)) number = number + 1;
    if (checkIfBomb(adjTL)) number = number + 1;
    if (checkIfBomb(adjBR)) number = number + 1;
    if (checkIfBomb(adjBL)) number = number + 1;

    return number;
  };

  const showCheck = check => {
    if (!check) return 'visible';
    return 'hidden';
  };

  return (
    <div className='text-1xl'>
      <div className={`grid grid-rows-${boardSize} text-3xl`}>
        {board.length > 0 ? (
          <>
            {board.map((row, index) => (
              <div key={index} className='flex' id={index}>
                {row.map((col, index) => (
                  <span key={`span-${index}`}>
                    <button
                      id={index}
                      key={`col-hidden,${index}`}
                      className={` bg-slate-400 border-2 w-24 h-20 hover:bg-slate-500`}
                      value={col.bomb}
                      onClick={e => {
                        let cords = {
                          row: col.row,
                          col: col.col,
                        };
                        console.log(cords, e.target.value);
                        setBoard(prev => {
                          prev[col.row][col.col].show = true;
                          return prev;
                        });
                        setCurrentClick({
                          row: col.row,
                          col: col.col,
                          bomb: col.bomb,
                        });
                      }}
                    >
                      <span
                        className={`${showCheck(!col.show)}`}
                      >{`${numberAround({
                        row: col.row,
                        col: col.col,
                      })}`}</span>
                      <span className={`${showCheck(col.show)}`}>{`+`}</span>
                    </button>
                  </span>
                ))}
              </div>
            ))}
          </>
        ) : (
          <>Generating</>
        )}
      </div>
    </div>
  );
};
