import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './App';

export const Board = () => {
  const { boardSize, board, setCurrentClick, setBoard } =
    useContext(AppContext);

  // helper reveal if bomb false
  const checkIfBombRevealB = cords => {
    if (board[cords.row] === undefined) return false;
    if (board[cords.row][cords.col] === undefined) return false;
    if (board[cords.row][cords.col].bomb === true) return false;
    if (board[cords.row][cords.col].show === true) return false;
    setBoard(prev => {
      prev[cords.row][cords.col].show = true;
      return prev;
    });
    if (numberAround({ row: cords.row, col: cords.col }) === 0) {
      revealAroundB({ row: cords.row, col: cords.col });
      revealAroundL({ row: cords.row, col: cords.col });
      revealAroundR({ row: cords.row, col: cords.col });
      return true;
    }
  };
  const checkIfBombRevealT = cords => {
    if (board[cords.row] === undefined) return false;
    if (board[cords.row][cords.col] === undefined) return false;
    if (board[cords.row][cords.col].bomb === true) return false;
    if (board[cords.row][cords.col].show === true) return false;
    setBoard(prev => {
      prev[cords.row][cords.col].show = true;
      return prev;
    });
    if (numberAround({ row: cords.row, col: cords.col }) === 0) {
      revealAroundT({ row: cords.row, col: cords.col });
      revealAroundL({ row: cords.row, col: cords.col });
      revealAroundR({ row: cords.row, col: cords.col });
      return true;
    }
  };

  const checkIfBombRevealR = cords => {
    if (board[cords.row] === undefined) return false;
    if (board[cords.row][cords.col] === undefined) return false;
    if (board[cords.row][cords.col].bomb === true) return false;
    if (board[cords.row][cords.col].show === true) return false;
    setBoard(prev => {
      prev[cords.row][cords.col].show = true;
      return prev;
    });
    if (numberAround({ row: cords.row, col: cords.col }) === 0) {
      revealAroundR({ row: cords.row, col: cords.col });
      revealAroundT({ row: cords.row, col: cords.col });
      revealAroundB({ row: cords.row, col: cords.col });
      return true;
    }
  };
  const checkIfBombRevealL = cords => {
    if (board[cords.row] === undefined) return false;
    if (board[cords.row][cords.col] === undefined) return false;
    if (board[cords.row][cords.col].bomb === true) return false;
    if (board[cords.row][cords.col].show === true) return false;
    setBoard(prev => {
      prev[cords.row][cords.col].show = true;
      return prev;
    });
    if (numberAround({ row: cords.row, col: cords.col }) === 0) {
      revealAroundL({ row: cords.row, col: cords.col });
      revealAroundT({ row: cords.row, col: cords.col });
      revealAroundB({ row: cords.row, col: cords.col });
      return true;
    }
  };

  // reveal adjacent cells if no bomb
  const revealAroundB = cords => {
    let adjB = { row: cords.row + 1, col: cords.col };
    checkIfBombRevealB(adjB);
  };
  const revealAroundT = cords => {
    let adjT = { row: cords.row - 1, col: cords.col };
    checkIfBombRevealT(adjT);
  };
  const revealAroundR = cords => {
    let adjR = { row: cords.row, col: cords.col + 1 };
    checkIfBombRevealR(adjR);
  };
  const revealAroundL = cords => {
    let adjL = { row: cords.row, col: cords.col - 1 };
    checkIfBombRevealL(adjL);
  };
  // helper check if bomb true
  const checkIfBomb = cords => {
    if (board[cords.row] === undefined) return false;
    if (board[cords.row][cords.col] === undefined) return false;
    if (board[cords.row][cords.col].bomb === true) return true;
    return false;
  };

  // create number of cells surounding the current that are bombs
  const numberAround = cords => {
    let number = 0;
    let adjB = { row: cords.row + 1, col: cords.col };
    let adjT = { row: cords.row - 1, col: cords.col };
    let adjR = { row: cords.row, col: cords.col + 1 };
    let adjL = { row: cords.row, col: cords.col - 1 };
    let adjTR = { row: cords.row - 1, col: cords.col + 1 };
    let adjTL = { row: cords.row - 1, col: cords.col - 1 };
    let adjBR = { row: cords.row + 1, col: cords.col + 1 };
    let adjBL = { row: cords.row + 1, col: cords.col - 1 };

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
                      className={` bg-slate-400 border-2 border-slate-200 w-24 h-20 hover:bg-slate-500`}
                      value={col.bomb}
                      onClick={e => {
                        let cords = {
                          row: col.row,
                          col: col.col,
                        };
                        console.log(cords, col.bomb);
                        if (col.bomb === true) {
                          alert('bomb');
                        }
                        setBoard(prev => {
                          prev[col.row][col.col].show = true;
                          return prev;
                        });
                        setCurrentClick({
                          row: col.row,
                          col: col.col,
                          bomb: col.bomb,
                        });
                        if (
                          numberAround({
                            row: col.row,
                            col: col.col,
                          }) === 0
                        ) {
                          revealAroundB({
                            row: col.row,
                            col: col.col,
                          });
                          revealAroundT({
                            row: col.row,
                            col: col.col,
                          });
                          revealAroundR({
                            row: col.row,
                            col: col.col,
                          });
                          revealAroundL({
                            row: col.row,
                            col: col.col,
                          });
                        }
                      }}
                    >
                      <span
                        className={`${showCheck(!col.show)}`}
                      >{`${numberAround({
                        row: col.row,
                        col: col.col,
                      })}`}</span>
                      <span
                        className={`${showCheck(col.show)}`}
                      >{`+${col.bomb}`}</span>
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
