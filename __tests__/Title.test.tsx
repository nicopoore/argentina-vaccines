import React from 'react';
import '../utils/matchMedia.mock';
import { render, waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Title } from '../components';

beforeEach(() => {
  render(<Title isSimplified={true} setIsSimplified={() => null} />);
});

it('renders site header', () => {
  expect(screen.getByRole('heading', { name: /argentina vacunada/i })).toBeInTheDocument();
});

it('renders view button group', () => {
  const buttonGroup = screen.getByRole('group');
  expect(buttonGroup).toBeInTheDocument();
  expect(within(buttonGroup).queryAllByRole('button')).toHaveLength(2);
});

it('renders author link', () => {
  expect(screen.getByRole('link', { name: /nicolás poore/i })).toBeInTheDocument();
});

it('directs to repo on author link click', () => {
  expect(screen.getByRole('link', { name: /nicolás poore/i })).toHaveAttribute(
    'href',
    'https://github.com/nicopoore/argentina-vaccines'
  );
});

it('renders help button', () => {
  expect(screen.getByRole('button', { name: /help/i })).toBeInTheDocument();
});

it('shows tooltip on help button hover', async () => {
  userEvent.hover(screen.getByRole('button', { name: /help/i }));
  await waitFor(() => screen.getByRole('tooltip', { name: /ayuda \/ más información/i }));

  expect(screen.getByRole('tooltip', { name: /ayuda \/ más información/i })).toBeInTheDocument();
});
