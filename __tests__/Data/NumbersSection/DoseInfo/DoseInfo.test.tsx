import React from 'react';
import '../../../../__mocks__/matchMedia.mock';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DoseInfo from '../../../../components/Data/NumbersSection/DoseInfo';

it('renders without crashing', () => {
  render(<DoseInfo dose={1} />);
});

it('renders first dose', () => {
  render(<DoseInfo dose={1} />);
  expect(screen.getByRole('heading', { name: /primera dosis/i })).toBeInTheDocument();
});

it('renders second dose', () => {
  render(<DoseInfo dose={2} />);
  expect(screen.getByRole('heading', { name: /ambas dosis/i })).toBeInTheDocument();
});
