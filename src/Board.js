import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createWinnableBoard());
  const [hasWon, setHasWon] = useState(false);

  function createBoard(allOff = true) {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(allOff ? false : Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function createWinnableBoard() {
    let board = createBoard(true); // Start with all cells turned off (winning state)

    for (let i = 0; i < nrows * ncols; i++) {
      const randY = Math.floor(Math.random() * nrows);
      const randX = Math.floor(Math.random() * ncols);
      flipCellsAround(`${randY}-${randX}`, board); // Randomly flip cells to create the board
    }

    return board;
  }

  function flipCellsAround(coord, boardCopy = null) {
    if (!boardCopy) {
      boardCopy = board.map(row => [...row]);
    }
    
    const [y, x] = coord.split('-').map(Number);

    const flipCell = (y, x, boardCopy) => {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    };

    flipCell(y, x, boardCopy);
    flipCell(y, x - 1, boardCopy);
    flipCell(y, x + 1, boardCopy);
    flipCell(y - 1, x, boardCopy);
    flipCell(y + 1, x, boardCopy);

    return boardCopy;
  }

  function handleCellClick(coord) {
    const newBoard = flipCellsAround(coord);
    setBoard(newBoard);

    const hasWon = newBoard.every(row => row.every(cell => !cell));
    setHasWon(hasWon);
  }

  if (hasWon) {
    return (
      <div className="Board-container">
        <div className="Board-won">
          <h1>Congratulations!</h1>
          <p>You have won the game!</p>
        </div>
      </div>
    );
  }

  let tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => handleCellClick(coord)}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <div className="Board-container">
      <table className="Board">
        <tbody>{tableBoard}</tbody>
      </table>
    </div>
  );
}

export default Board;
