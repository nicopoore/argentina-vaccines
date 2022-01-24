// Deps
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

// Project
import TierraDelFuegoModal from 'components/Data/NumbersSection/MoreInfoButton/TierraDelFuegoModal';

const mockHandleClose = jest.fn();

beforeEach(() => {
  render(<TierraDelFuegoModal handleClose={mockHandleClose} isOpen={true} />);
});

afterEach(() => {
  jest.clearAllMocks();
});

it('renders modal', () => {
  expect(screen.getByRole('dialog', { name: /podés sacar turno/i })).toBeInTheDocument();
});

it('renders modal header', () => {
  expect(screen.getByRole('banner')).toHaveTextContent(/podés sacar turno/i);
});

it('has full information', () => {
  expect(screen.getAllByRole('link')).toHaveLength(3);
  expect(screen.getByText(/whatsapp/i)).toBeInTheDocument();
  expect(screen.getAllByText(/llamá/i)).toHaveLength(2);
});

it('renders close button', () => {
  expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
});

it('calls handleClose on close button click', async () => {
  userEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(mockHandleClose).toHaveBeenCalledTimes(1);
});

it('does not call handleClose on modal click', () => {
  userEvent.click(screen.getByRole('dialog', { name: /podés sacar turno/i }));
  expect(mockHandleClose).not.toHaveBeenCalled();
});
