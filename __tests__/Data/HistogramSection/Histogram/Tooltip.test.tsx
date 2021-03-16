import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tooltip from '../../../../components/Data/HistogramSection/Histogram/Tooltip';
import { tooltipMock } from '../../../../__mocks__/data/dataMock.json';

beforeEach(() => {
  render(
    <Tooltip
      active={tooltipMock.active}
      label={Date.parse(tooltipMock.label) + 10800000}
      payload={tooltipMock.payload}
    />
  );
});

it('renders tooltip label', () => {
  expect(screen.getByText(/10 de marzo/i)).toBeInTheDocument();
});

it('renders first number', () => {
  expect(screen.getByText(/0.60 %/)).toBeInTheDocument();
});

it('renders second number', () => {
  expect(screen.getByText(/1.32 %/)).toBeInTheDocument();
});

it('renders numbers labels', () => {
  expect(screen.getByText(/1ra dosis/i)).toBeInTheDocument();
  expect(screen.getByText(/ambas dosis/i)).toBeInTheDocument();
});
