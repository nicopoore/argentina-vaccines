// Deps
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Project
import HistogramSection from 'components/sections/HistogramSection';

it('renders circular progress', () => {
  render(<HistogramSection data={undefined} error={false} />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(screen.getByText(/buscando datos/i)).toBeInTheDocument();
});

it('shows error when data fetching fails', () => {
  render(<HistogramSection data={undefined} error={true} />);
  expect(screen.getByText(/error buscando datos/i)).toBeInTheDocument();
});
