import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * Props:
 * - isLit: boolean, true if this cell is lit
 * - flipCellsAroundMe: a function passed to toggle this cell & neighbors
 *
 * This component renders a <td> element.
 * It will receive `isLit` to know if it should be rendered as lit or unlit.
 **/

function Cell({ isLit, flipCellsAroundMe }) {
  const classes = `Cell ${isLit ? "Cell-lit" : "Cell-unlit"}`;

  return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
