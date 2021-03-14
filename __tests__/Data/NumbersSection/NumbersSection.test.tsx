import '@testing-library/jest-dom/extend-expect';
import { RenderResult, render, screen } from '@testing-library/react';
import React from 'react';
import NumbersSection from '../../../components/Data/NumbersSection';
import { DataContextProvider, SelectionContextProvider } from '../../../utils/Context';
import dataMock from '../../../__mocks__/dataMock';

const renderWithContexts = (ui: JSX.Element): RenderResult => {
  return render(
    <SelectionContextProvider selectedProvince="Argentina">
      <DataContextProvider data={dataMock}>{ui}</DataContextProvider>
    </SelectionContextProvider>
  );
};

describe('unit', () => {
  it('renders province title', () => {
    renderWithContexts(<NumbersSection />);

    expect(screen.getByRole('heading', { name: /argentina/i })).toBeInTheDocument();
  });
});

describe('integration with inner components', () => {
  it("renders both doses' info", () => {
    renderWithContexts(<NumbersSection />);

    expect(screen.getByRole('heading', { name: /primera dosis/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ambas dosis/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /1\.932\.696/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /4,22/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /448\.733/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /0,98/ })).toBeInTheDocument();
  });

  it('renders button', () => {
    renderWithContexts(<NumbersSection />);

    expect(screen.getByText(/consultá la información/i)).toHaveTextContent(/argentina/i);
    expect(screen.getByRole('link', { name: /conocé más/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /conocé más/i })).toHaveAttribute('href');
    expect(screen.getByRole('link', { name: /conocé más/i })).not.toHaveAttribute('href', '');
  });
});
