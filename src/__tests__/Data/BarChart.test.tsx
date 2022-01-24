// Deps
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

// Project
import BarChart from 'components/BarChart/BarChart';
import { barChartMockData } from '__mocks__/dataMock.json';

describe('loading state', () => {
  it('renders skeleton alone', () => {
    render(<BarChart />);
    expect(screen.getByTestId('barChartSkeleton')).toBeInTheDocument();
  });

  it('renders skeleton and text', () => {
    render(<BarChart name="test-chart-a" />);
    expect(screen.getByTestId('barChartSkeleton')).toBeInTheDocument();
    expect(screen.getByText('test-chart-a')).toBeInTheDocument();
  });
});

describe('loaded state', () => {
  barChartMockData.map((barChartValues, index) => {
    if (barChartValues.name) {
      it(`renders barchart ${index} with name`, () => {
        render(
          <BarChart
            colors={barChartValues.colors}
            data={barChartValues.data}
            name={barChartValues.name}
          />
        );

        expect(screen.getByText(barChartValues.name)).toBeInTheDocument();
      });
    }

    it(`renders barchart ${index} w/ correct amount of items`, () => {
      render(<BarChart colors={barChartValues.colors} data={barChartValues.data} />);

      expect(screen.getAllByTestId(/barChartItem-/)).toHaveLength(barChartValues.data.length);
    });

    it(`renders barchart ${index} w/ correct colors`, () => {
      render(<BarChart colors={barChartValues.colors} data={barChartValues.data} />);

      expect(screen.getByTestId('barChartItem-0')).toHaveStyle(
        `background-color: ${barChartValues.colors[0]}`
      );
    });
  });

  it('renders barchart 0 with correct values', () => {
    render(<BarChart colors={barChartMockData[0].colors} data={barChartMockData[0].data} />);

    expect(screen.getByTestId('barChartItem-0')).toHaveStyle('width: 100%');
  });

  it('renders barchart 2 with correct values', () => {
    render(<BarChart colors={barChartMockData[2].colors} data={barChartMockData[2].data} />);

    expect(screen.getByTestId('barChartItem-0')).toHaveStyle('width: 3.7037037037037033%');
    expect(screen.getByTestId('barChartItem-1')).toHaveStyle('width: 29.629629629629626%');
    expect(screen.getByTestId('barChartItem-2')).toHaveStyle('width: 7.4074074074074066%');
    expect(screen.getByTestId('barChartItem-3')).toHaveStyle('width: 11.11111111111111%');
    expect(screen.getByTestId('barChartItem-4')).toHaveStyle('width: 48.148148148148145%');
  });

  it('shows tooltip on hover in barchart 0', async () => {
    render(<BarChart colors={barChartMockData[0].colors} data={barChartMockData[0].data} />);

    userEvent.hover(screen.getByTestId('barChartItem-0'));
    await waitFor(() => screen.getByRole('tooltip', { name: /test-chart-b-1/i }));
  });

  it('shows tooltips on hover in barchart 2', async () => {
    render(<BarChart colors={barChartMockData[2].colors} data={barChartMockData[2].data} />);

    userEvent.hover(screen.getByTestId('barChartItem-0'));
    await waitFor(() => screen.getByRole('tooltip', { name: /test-chart-d-1/i }));
    userEvent.hover(screen.getByTestId('barChartItem-1'));
    await waitFor(() => screen.getByRole('tooltip', { name: /test-chart-d-2/i }));
    userEvent.hover(screen.getByTestId('barChartItem-2'));
    await waitFor(() => screen.getByRole('tooltip', { name: /test-chart-d-3/i }));
    userEvent.hover(screen.getByTestId('barChartItem-3'));
    await waitFor(() => screen.getByRole('tooltip', { name: /test-chart-d-4/i }));
    userEvent.hover(screen.getByTestId('barChartItem-4'));
    await waitFor(() => screen.getByRole('tooltip', { name: /test-chart-d-5/i }));
  });
});
