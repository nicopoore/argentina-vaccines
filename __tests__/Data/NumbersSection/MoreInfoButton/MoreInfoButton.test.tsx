import '@testing-library/jest-dom/extend-expect';
import { RenderResult, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MoreInfoButton from '../../../../components/Data/NumbersSection/MoreInfoButton';
import { SelectionContextProvider } from '../../../../utils/Context';
import provinceNames from '../../../../__mocks__/provinceNames';

describe('unit', () => {
  const renderWithContexts = (ui: JSX.Element, selectedProvince: string): RenderResult => {
    return render(
      <SelectionContextProvider selectedProvince={selectedProvince}>{ui}</SelectionContextProvider>
    );
  };

  provinceNames.map(provinceName => {
    describe('renders text', () => {
      it(`renders text with ${provinceName}`, () => {
        renderWithContexts(<MoreInfoButton />, provinceName);

        expect(screen.getByText(/consultá la información/i)).toHaveTextContent(
          RegExp(provinceName, 'i')
        );
      });
    });

    describe('renders link or button', () => {
      if (provinceName !== 'Tierra del Fuego') {
        it(`renders link in ${provinceName}`, () => {
          renderWithContexts(<MoreInfoButton />, provinceName);

          expect(screen.getByRole('link', { name: /conocé más/i })).toHaveAttribute('href');
          expect(screen.getByRole('link', { name: /conocé más/i })).not.toHaveAttribute('href', '');
        });
      } else {
        it('renders button in Tierra del Fuego', () => {
          renderWithContexts(<MoreInfoButton />, provinceName);

          expect(screen.getByRole('button', { name: /conocé más/i })).toBeInTheDocument();
        });
      }
    });
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
