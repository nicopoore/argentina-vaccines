import React from 'react';
import '../../../../utils/matchMedia.mock';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VaccineNumbers from '../../../../components/Data/NumbersSection/DoseInfo/VaccineNumbers';
import { DataContextProvider, SelectionContextProvider } from '../../../../utils/Context';
import dataMock from '../../../../__mocks__/dataMock';

describe('loading state', () => {
  it('renders raw component without crashing', () => {
    render(<VaccineNumbers numberType="raw" />);
  });

  it('renders percentage component without crashing', () => {
    render(<VaccineNumbers numberType="percentage" />);
  });

  it('shows text on raw render', () => {
    render(<VaccineNumbers numberType="raw" />);
    expect(screen.getByText(/personas/i)).toBeInTheDocument();
  });

  it('shows text on percentage render', () => {
    render(<VaccineNumbers numberType="percentage" />);
    expect(screen.getByText(/de la población/i)).toBeInTheDocument();
  });

  it('shows skeleton before data load', () => {
    render(<VaccineNumbers numberType="percentage" />);
    expect(screen.getByTestId('vaccineNumbersSkeleton')).toBeInTheDocument();
  });
});

describe('loaded state', () => {
  const renderWithContexts = (ui: JSX.Element): RenderResult => {
    return render(
      <SelectionContextProvider selectedProvince="Argentina">
        <DataContextProvider data={dataMock}>{ui}</DataContextProvider>
      </SelectionContextProvider>
    );
  };

  it('renders first dose raw numbers correctly', () => {
    renderWithContexts(<VaccineNumbers dose={1} numberType="raw" />);

    const numbers = screen.getByRole('heading', { name: /1\.932\.696/ });
    expect(numbers).toBeInTheDocument();
    expect(numbers.nextSibling).toHaveTextContent(/personas/i);
  });

  it('renders second dose raw numbers correctly', () => {
    renderWithContexts(<VaccineNumbers dose={2} numberType="raw" />);

    const numbers = screen.getByRole('heading', { name: /448\.733/ });
    expect(numbers).toBeInTheDocument();
    expect(numbers.nextSibling).toHaveTextContent(/personas/i);
  });

  it('renders first dose percentages correctly', () => {
    renderWithContexts(<VaccineNumbers dose={1} numberType="percentage" />);

    const numbers = screen.getByRole('heading', { name: /4,22/ });
    expect(numbers).toBeInTheDocument();
    expect(numbers.nextSibling).toHaveTextContent(/de la población/i);
  });

  it('renders second dose percentages correctly', () => {
    renderWithContexts(<VaccineNumbers dose={2} numberType="percentage" />);

    const numbers = screen.getByRole('heading', { name: /0,98/ });
    expect(numbers).toBeInTheDocument();
    expect(numbers.nextSibling).toHaveTextContent(/de la población/i);
  });
});
