import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights Out.
 *
 * Props:
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float between 0 and 1, chance any cell is lit at start of game
 *
 * State:
 * - board: 2D array of true/false values representing the grid
 * - hasWon: boolean indicating whether the player has won
 *
 * This component renders the game board and handles all interactions.
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(generateInitialBoard());
  const [hasWon, setHasWon] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function generateInitialBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  /** Handles flipping a cell and the cells around it */
  function flipCellsAround(coord) {
    if (hasWon) return; // Prevent any changes after the game is won

    const [y, x] = coord.split("-").map(Number);
    const newBoard = board.map(row => [...row]);

    function flipCell(y, x) {
      if (y >= 0 && y < nrows && x >= 0 && x < ncols) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);

    const newHasWon = newBoard.every(row => row.every(cell => !cell));
    setBoard(newBoard);
    setHasWon(newHasWon);
  }

  /** Function to simulate winning the game immediately */
  function winGame() {
    const newBoard = board.map(row => row.map(() => false));
    setBoard(newBoard);
    setHasWon(true);
  }

  /** Render the game board */
  function renderBoard() {
    let tableBoard = [];

    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        const coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={board[y][x]}
            flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        );
      }
      tableBoard.push(
        <tr key={y}>
          {row}
        </tr>
      );
    }

    return (
      <table className="Board">
        <tbody>{tableBoard}</tbody>
      </table>
    );
  }

  return (
    <div>
      {hasWon && (
        <div className="Board-won">
          <h1>Congratulations!</h1>
          <p>You have won the game!</p>
        </div>
      )}
      {renderBoard()}
      {!hasWon && (
        <button onClick={winGame} style={{ marginTop: "20px" }}>
          Win Game
        </button>
      )}
    </div>
  );
}

export default Board;
