import React from 'react';
import '../../utils/matchMedia.mock';
import { render, waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Title } from '../../components';

const mockSetIsSimplified = jest.fn();

beforeEach(() => {
  render(<Title isSimplified={true} setIsSimplified={mockSetIsSimplified} />);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('unit', () => {
  it('renders site header', () => {
    expect(screen.getByRole('heading', { name: /argentina vacunada/i })).toBeInTheDocument();
  });

  it('renders view button group', () => {
    const buttonGroup = screen.getByRole('group');
    expect(buttonGroup).toBeInTheDocument();
    expect(
      within(buttonGroup).getByRole('button', { name: /vista simplificada/i })
    ).toBeInTheDocument();
    expect(
      within(buttonGroup).getByRole('button', { name: /vista completa/i })
    ).toBeInTheDocument();
  });

  it('renders author link', () => {
    expect(screen.getByRole('link', { name: /nicolás poore/i })).toBeInTheDocument();
  });

  it('renders help button', () => {
    expect(screen.getByRole('button', { name: /help/i })).toBeInTheDocument();
  });

  it('calls setIsSimplified when view buttons are clicked', () => {
    const buttonGroup = screen.getByRole('group');

    userEvent.click(within(buttonGroup).getByRole('button', { name: /vista completa/i }));
    expect(mockSetIsSimplified).toHaveBeenCalledTimes(1);
    userEvent.click(within(buttonGroup).getByRole('button', { name: /vista simplificada/i }));
    expect(mockSetIsSimplified).toHaveBeenCalledTimes(2);
  });

  it('directs to repo on author link click', () => {
    expect(screen.getByRole('link', { name: /nicolás poore/i })).toHaveAttribute(
      'href',
      'https://github.com/nicopoore/argentina-vaccines'
    );
  });

  it('shows tooltip on help button hover', async () => {
    userEvent.hover(screen.getByRole('button', { name: /help/i }));
    await waitFor(() => screen.getByRole('tooltip', { name: /ayuda \/ más información/i }));

    expect(screen.getByRole('tooltip', { name: /ayuda \/ más información/i })).toBeInTheDocument();
  });
});

describe('integration with InfoModal', () => {
  it('opens info modal on help button click', async () => {
    userEvent.click(screen.getByRole('button', { name: /help/i }));
    await waitFor(() => screen.getByRole('dialog', { name: /argentina vacunada/i }));

    expect(screen.getByRole('dialog', { name: /argentina vacunada/i })).toBeInTheDocument();
  });

  it('closes modal on close button click', async () => {
    userEvent.click(screen.getByRole('button', { name: /help/i }));
    await waitFor(() => screen.getByRole('dialog', { name: /argentina vacunada/i }));

    userEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog', { name: /argentina vacunada/i })).not.toBeInTheDocument()
    );
  });
});
