import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cell from '../Cell';

describe('Cell Component', () => {
  it('renders a lit Cell correctly', () => {
    const { container } = render(<Cell isLit={true} />);
    expect(container.firstChild).toHaveClass('Cell-lit');
  });

  it('renders an unlit Cell correctly', () => {
    const { container } = render(<Cell isLit={false} />);
    expect(container.firstChild).toHaveClass('Cell-unlit');
  });

  it('triggers flip callback on click', () => {
    const mockFlip = jest.fn();
    const { getByRole } = render(<Cell isLit={true} flipCellsAroundMe={mockFlip} />);
    fireEvent.click(getByRole('cell'));
    expect(mockFlip).toHaveBeenCalled();
  });
});
