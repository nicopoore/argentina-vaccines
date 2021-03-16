import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ScaleButton from '../../../components/Data/HistogramSection/ScaleButton';
import userEvent from '@testing-library/user-event';

const handleClick = jest.fn();

describe('YAxisIsScaled is true', () => {
  beforeEach(() => {
    render(<ScaleButton YAxisIsScaled={true} handleClick={handleClick} />);
  });

  it('renders button', () => {
    expect(screen.getByRole('button', { name: /normalizar eje y/i })).toBeInTheDocument();
  });

  it('renders tooltip on hover', async () => {
    userEvent.hover(screen.getByRole('button', { name: /normalizar eje y/i }));
    await waitFor(() => screen.getByRole('tooltip', { name: /normalizar eje y/i }));

    expect(screen.getByRole('tooltip', { name: /normalizar eje y/i })).toBeInTheDocument();
  });

  it('calls handleClick on click', async () => {
    userEvent.click(screen.getByRole('button', { name: /normalizar eje y/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip', { name: /normalizar eje y/i })).not.toBeInTheDocument();
    });
  });
});

describe('YAxisIsScaled is false', () => {
  beforeEach(() => {
    render(<ScaleButton YAxisIsScaled={false} handleClick={handleClick} />);
  });

  it('renders button', () => {
    expect(screen.getByRole('button', { name: /ajustar eje y/i })).toBeInTheDocument();
  });

  it('renders tooltip on hover', async () => {
    userEvent.hover(screen.getByRole('button', { name: /ajustar eje y/i }));
    await waitFor(() => screen.getByRole('tooltip', { name: /ajustar eje y/i }));

    expect(screen.getByRole('tooltip', { name: /ajustar eje y/i })).toBeInTheDocument();
  });

  it('calls handleClick on click', async () => {
    userEvent.click(screen.getByRole('button', { name: /ajustar eje y/i }));

    expect(handleClick).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip', { name: /ajustar eje y/i })).not.toBeInTheDocument();
    });
  });
});
