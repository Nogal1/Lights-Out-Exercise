import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Board from '../Board';
import { act } from 'react';

describe('Board Component', () => {

  it('renders a 3x3 Board with cells', () => {
    const { getAllByRole } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0.5} />);
    
    // Ensure the board contains the correct number of cells
    const cells = getAllByRole('cell');
    expect(cells.length).toBe(9); // 3x3 grid
  });

  it('flips cells correctly on click', () => {
    const { getAllByRole } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);
    
    const cells = getAllByRole('cell');

    // Click the first cell and check if it flips correctly
    fireEvent.click(cells[0]);

    // Check the flipped state of the cells
    expect(cells[0]).not.toHaveClass('Cell-lit'); // The clicked cell should now be unlit
    expect(cells[1]).not.toHaveClass('Cell-lit'); // Adjacent cell should also be unlit
  });
});
