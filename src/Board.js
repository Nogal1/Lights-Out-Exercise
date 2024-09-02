import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    // Initialize all cells to false (unlit)
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(false);
      }
      initialBoard.push(row);
    }

    // Apply a series of random flips to create a winnable board
    for (let i = 0; i < nrows * ncols; i++) {
      const randY = Math.floor(Math.random() * nrows);
      const randX = Math.floor(Math.random() * ncols);
      flipCellsAround(`${randY}-${randX}`, initialBoard);
    }

    console.log("Winnable Initial Board:", initialBoard); // Debug: Log the board
    return initialBoard;
  }

  function flipCellsAround(coord, boardCopy = null) {
    const [y, x] = coord.split("-").map(Number);
    
    // If boardCopy is not provided, use the current board state
    if (!boardCopy) {
      boardCopy = board.map(row => [...row]);
    }
  
    const nrows = boardCopy.length;
    const ncols = boardCopy[0].length;

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

    return boardCopy; // Ensure the updated board is returned
  }

  if (hasWon()) {
    return <div className="Board-won">You Won!</div>;
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
          flipCellsAroundMe={() => setBoard(flipCellsAround(coord))}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  console.log("Rendering Board..."); // Debug: Log when rendering happens
  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}



export default Board;
