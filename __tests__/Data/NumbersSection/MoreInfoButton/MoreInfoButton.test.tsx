import '@testing-library/jest-dom/extend-expect';
import { RenderResult, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MoreInfoButton from '../../../../components/Data/NumbersSection/MoreInfoButton';
import { SelectionContextProvider } from '../../../../utils/Context';

describe('unit', () => {
  const renderWithContexts = (ui: JSX.Element): RenderResult => {
    return render(
      <SelectionContextProvider selectedProvince="Argentina">{ui}</SelectionContextProvider>
    );
  };

  it('renders text with correct province name', () => {
    renderWithContexts(<MoreInfoButton />);

    expect(screen.getByText(/consultá la información/i)).toHaveTextContent(/argentina/i);
  });

  it('renders link', () => {
    renderWithContexts(<MoreInfoButton />);

    expect(screen.getByRole('link', { name: /conocé más/i })).toBeInTheDocument();
  });

  it('renders link with non-empty href', () => {
    renderWithContexts(<MoreInfoButton />);

    expect(screen.getByRole('link', { name: /conocé más/i })).toHaveAttribute('href');
    expect(screen.getByRole('link', { name: /conocé más/i })).not.toHaveAttribute('href', '');
  });
});

describe('integration with TierraDelFuegoModal', () => {
  const renderWithContexts = (ui: JSX.Element): RenderResult => {
    return render(
      <SelectionContextProvider selectedProvince="Tierra del Fuego">{ui}</SelectionContextProvider>
    );
  };

  it('opens modal on tierra del fuego button click', async () => {
    renderWithContexts(<MoreInfoButton />);

    userEvent.click(screen.getByRole('button', { name: /conocé más/i }));

    await waitFor(() => screen.getByRole('dialog', { name: /podés sacar turno/i }));
    expect(screen.getByRole('dialog', { name: /podés sacar turno/i })).toBeInTheDocument();
  });

  it('closes modal on close button click', async () => {
    renderWithContexts(<MoreInfoButton />);

    userEvent.click(screen.getByRole('button', { name: /conocé más/i }));

    await waitFor(() => screen.getByRole('dialog', { name: /podés sacar turno/i }));

    userEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog', { name: /podés sacar turno/i })).not.toBeInTheDocument()
    );
  });
});
