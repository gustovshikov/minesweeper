import React, { useEffect, useMemo, useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Board } from './Board.js';

export const AppContext = createContext();

const App = () => {
  const navigate = useNavigate();
  const serverLocation = 'http://localhost:3001';
  const [boardSize, setBoardSize] = useState(10);
  const [board, setBoard] = useState([]);
  const [mineNumber, setMineNumber] = useState(20);
  const [currentClick, setCurrentClick] = useState(null);
  // const generateMines = useMemo(() => {
  //   let minesCords = [];
  //   for (let i = 0; i < mineNumber; i++) {
  //     let cord1 = Math.floor(Math.random() * boardSize);
  //     let cord2 = Math.floor(Math.random() * boardSize);
  //     minesCords.push([cord1, cord2]);
  //   }
  //   console.log('created mines cords');
  //   return minesCords;
  // }, [boardSize, mineNumber]);

  const generateBoard = useMemo(() => {
    let minesCords = [];
    for (let i = 0; i < mineNumber; i++) {
      let cord1 = Math.floor(Math.random() * boardSize);
      let cord2 = Math.floor(Math.random() * boardSize);
      minesCords.push([cord1, cord2]);
    }
    console.log('created mines cords');
    let board = [];
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push({ bomb: false, row: i, col: j, show: false });
      }
      board[i] = row;
    }
    minesCords.forEach(mine => {
      board[mine[1]][mine[0]].bomb = true;
    });

    console.log('created board layout');
    setBoard(board);
  }, [boardSize, mineNumber]);

  // useEffect(() => {
  //   console.log('fetching scores');
  //   fetch(`${serverLocation}/scores`)
  //     .then(res => res.json())
  //     .then(data => setMovies(data));
  // }, [triggerFetch]);
  console.log('board', board);
  // console.log('mine cords',);

  const setContext = {
    serverLocation,
    boardSize,
    board,
    setCurrentClick,
    setBoard,
  };

  return (
    <AppContext.Provider value={setContext}>
      <div className='flex flex-col justify-center items-center gap-3'>
        <h1 className='text-4xl font-extrabold'>Minesweeper</h1>

        <div className='flex my-10 justify-center text-lg'>
          <label>
            Board Size
            <input
              type='text'
              className='mx-3'
              defaultValue={boardSize}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  console.log(e.target.value);
                  setBoardSize(e.target.value);
                }
              }}
            ></input>
          </label>
          <label>
            Maximum Mines
            <input
              type='text'
              className='mx-3'
              defaultValue={mineNumber}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  console.log(e.target.value);
                  setMineNumber(e.target.value);
                }
              }}
            ></input>
          </label>
        </div>
        <Routes>
          <Route path='/' element={<Board />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
