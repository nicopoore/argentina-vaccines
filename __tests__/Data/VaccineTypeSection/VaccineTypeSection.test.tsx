import React from 'react';
import { render, RenderResult, screen, waitFor, within } from '@testing-library/react';
import '../../../__mocks__/matchMedia.mock';
import '@testing-library/jest-dom/extend-expect';
import VaccineTypeSection from '../../../components/Data/VaccineTypeSection';
import { vaccineTypes, rawData } from '../../../__mocks__/dataMock.json';
import userEvent from '@testing-library/user-event';
import { DataContextProvider } from '../../../utils/Context';
import { formatNumbers } from '../../../utils/functions';

const renderWithContexts = (ui: JSX.Element): RenderResult => {
  return render(<DataContextProvider data={rawData}>{ui}</DataContextProvider>);
};

describe('unit tests', () => {
  it('renders section title', () => {
    renderWithContexts(<VaccineTypeSection />);

    expect(screen.getByRole('heading', { name: /vacunas en la argentina/i })).toBeInTheDocument();
  });
});

describe('integration with inner components', () => {
  describe('default state', () => {
    it('renders buttons', () => {
      renderWithContexts(<VaccineTypeSection />);
      const buttonGroup = screen.getByRole('group');

      expect(buttonGroup).toBeInTheDocument();
      expect(within(buttonGroup).getAllByRole('button')).toHaveLength(5);
    });

    it('renders sputnik data on load', () => {
      renderWithContexts(<VaccineTypeSection />);

      expect(screen.getByRole('heading', { name: /sputnik v/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /30\.000\.000/ })).toBeInTheDocument();
    });

    it('renders barchart', () => {
      renderWithContexts(<VaccineTypeSection />);

      expect(screen.getAllByTestId(/barChartItem-/)).toHaveLength(3);
    });

    it('renders barchart with correct values', () => {
      renderWithContexts(<VaccineTypeSection />);

      expect(screen.getByTestId(/barChartItem-2/)).toHaveStyle('width: 90.9%');
    });
  });

  describe('user events', () => {
    it('renders tooltip on barchart items hover', async () => {
      renderWithContexts(<VaccineTypeSection />);
      userEvent.hover(screen.getByTestId(/barChartItem-0/));
      await waitFor(() => expect(screen.getByRole('tooltip', { name: /aplicadas/i })));
      userEvent.unhover(screen.getByTestId(/barChartItem-0/));
      userEvent.hover(screen.getByTestId(/barChartItem-1/));
      await waitFor(() => expect(screen.getByRole('tooltip', { name: /entregadas/i })));
      userEvent.unhover(screen.getByTestId(/barChartItem-1/));
      userEvent.hover(screen.getByTestId(/barChartItem-2/));
      await waitFor(() => expect(screen.getByRole('tooltip', { name: /comprometidas/i })));
      userEvent.unhover(screen.getByTestId(/barChartItem-2/));
      await waitFor(() =>
        expect(screen.queryByRole('tooltip', { name: /comprometidas/i })).not.toBeInTheDocument()
      );
    });

    it('renders tooltip with percentages', async () => {
      renderWithContexts(<VaccineTypeSection />);
      userEvent.hover(screen.getByTestId(/barChartItem-0/));
      await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
      userEvent.unhover(screen.getByTestId(/barChartItem-0/));
      userEvent.hover(screen.getByTestId(/barChartItem-1/));
      await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
      userEvent.unhover(screen.getByTestId(/barChartItem-1/));
      userEvent.hover(screen.getByTestId(/barChartItem-2/));
      await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
      userEvent.unhover(screen.getByTestId(/barChartItem-2/));
      await waitFor(() =>
        expect(screen.queryByRole('tooltip', { name: /\d%/i })).not.toBeInTheDocument()
      );
    });

    vaccineTypes.map(vaccineType => {
      it(`changes data on ${vaccineType.shortName} click`, () => {
        renderWithContexts(<VaccineTypeSection />);
        const buttonGroup = screen.getByRole('group');
        const formattedNumbers = formatNumbers(vaccineType.purchased, 'numbers');

        userEvent.click(within(buttonGroup).getByRole('button', { name: vaccineType.shortName }));
        expect(screen.getByRole('heading', { name: vaccineType.shortName })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: formattedNumbers })).toBeInTheDocument();
        expect(screen.getAllByTestId(/barChartItem-/)).toHaveLength(3);
      });
    });
  });
});
