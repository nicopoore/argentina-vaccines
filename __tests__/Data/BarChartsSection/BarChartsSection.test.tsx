import '@testing-library/jest-dom/extend-expect';
import { RenderResult, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import BarChartsSection from '../../../components/Data/BarChartsSection';
import { DataContextProvider, SelectionContextProvider } from '../../../utils/Context';
import { rawData } from '../../../__mocks__/dataMock.json';

describe('loading state', () => {
  const renderWithSelectionContext = (ui: JSX.Element, selectedProvince: string): RenderResult => {
    return render(
      <SelectionContextProvider selectedProvince={selectedProvince}>{ui}</SelectionContextProvider>
    );
  };

  beforeEach(() => {
    renderWithSelectionContext(<BarChartsSection />, 'Argentina');
  });

  it('renders titles', () => {
    expect(screen.getByText(/% de la población vacunada/i)).toBeInTheDocument();
    expect(screen.getByText(/parcial vs. totalmente/i)).toBeInTheDocument();
    expect(screen.getByText(/% de vacunades por tipo/i)).toBeInTheDocument();
  });

  it('renders correct amount of skeletons', () => {
    expect(screen.getAllByTestId('barChartSkeleton')).toHaveLength(3);
  });
});

describe('loaded state', () => {
  const renderWithContexts = (ui: JSX.Element, selectedProvince: string): RenderResult => {
    return render(
      <SelectionContextProvider selectedProvince={selectedProvince}>
        <DataContextProvider data={rawData}>{ui}</DataContextProvider>
      </SelectionContextProvider>
    );
  };

  beforeEach(() => {
    renderWithContexts(<BarChartsSection />, 'Argentina');
  });

  it('renders titles', () => {
    expect(screen.getByText(/% de la población vacunada/i)).toBeInTheDocument();
    expect(screen.getByText(/parcial vs. totalmente/i)).toBeInTheDocument();
    expect(screen.getByText(/% de vacunades por tipo/i)).toBeInTheDocument();
  });

  it('renders correct amount of BarCharts', () => {
    expect(screen.getAllByTestId(/barChartItem-/)).toHaveLength(7);
  });

  it('renders tooltip on first barchart items hover', async () => {
    userEvent.hover(screen.getAllByTestId(/barChartItem-0/)[0]);
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /^vacunades/i })));
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
    userEvent.unhover(screen.getAllByTestId(/barChartItem-0/)[0]);
    userEvent.hover(screen.getAllByTestId(/barChartItem-1/)[0]);
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /no vacunades/i })));
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
    userEvent.unhover(screen.getAllByTestId(/barChartItem-1/)[0]);
    await waitFor(() =>
      expect(screen.queryByRole('tooltip', { name: /no vacunades/i })).not.toBeInTheDocument()
    );
  });

  it('renders tooltip on second barchart items hover', async () => {
    userEvent.hover(screen.getAllByTestId(/barChartItem-0/)[1]);
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /ambas dosis/i })));
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
    userEvent.unhover(screen.getAllByTestId(/barChartItem-0/)[1]);
    userEvent.hover(screen.getAllByTestId(/barChartItem-1/)[1]);
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /sólo/i })));
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
    userEvent.unhover(screen.getAllByTestId(/barChartItem-1/)[1]);
    await waitFor(() =>
      expect(screen.queryByRole('tooltip', { name: /sólo/i })).not.toBeInTheDocument()
    );
  });

  it('renders tooltip on third barchart items hover', async () => {
    userEvent.hover(screen.getAllByTestId(/barChartItem-0/)[2]);
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /sputnik v/i })));
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
    userEvent.unhover(screen.getAllByTestId(/barChartItem-0/)[2]);
    userEvent.hover(screen.getAllByTestId(/barChartItem-1/)[2]);
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /covishield/i })));
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
    userEvent.unhover(screen.getAllByTestId(/barChartItem-1/)[2]);
    userEvent.hover(screen.getByTestId(/barChartItem-2/));
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /sinopharm/i })));
    await waitFor(() => expect(screen.getByRole('tooltip', { name: /\d%/i })));
    userEvent.unhover(screen.getByTestId(/barChartItem-2/));
    await waitFor(() =>
      expect(screen.queryByRole('tooltip', { name: /sinopharm/i })).not.toBeInTheDocument()
    );
  });
});
