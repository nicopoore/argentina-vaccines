// Deps
import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Project
import '__mocks__/matchMedia.mock';
import VaccineNumbers from 'components/Data/NumbersSection/DoseInfo/VaccineNumbers';
import { DataContextProvider, SelectionContextProvider } from 'utils/Context';
import {
  rawData,
  firstDoseNumbers,
  firstDosePercentages,
  secondDoseNumbers,
  secondDosePercentages,
} from '__mocks__/dataMock.json';
import provinceNames from '__mocks__/provinceNames';

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
  const renderWithContexts = (ui: JSX.Element, selectedProvince: string): RenderResult => {
    return render(
      <SelectionContextProvider selectedProvince={selectedProvince}>
        <DataContextProvider data={rawData}>{ui}</DataContextProvider>
      </SelectionContextProvider>
    );
  };

  describe('first dose', () => {
    provinceNames.map(provinceName => {
      it(`renders ${provinceName} first dose raw numbers`, () => {
        renderWithContexts(<VaccineNumbers dose={1} numberType="raw" />, provinceName);

        const numbers = screen.getByRole('heading', { name: firstDoseNumbers[provinceName] });
        expect(numbers).toBeInTheDocument();
        expect(numbers.nextSibling).toHaveTextContent(/personas/i);
      });
      it(`renders ${provinceName} first dose percentage`, () => {
        renderWithContexts(<VaccineNumbers dose={1} numberType="percentage" />, provinceName);

        const numbers = screen.getByRole('heading', {
          name: RegExp(firstDosePercentages[provinceName]),
        });
        expect(numbers).toBeInTheDocument();
        expect(numbers.nextSibling).toHaveTextContent(/de la población/i);
      });
    });
  });

  describe('second dose', () => {
    provinceNames.map(provinceName => {
      it(`renders ${provinceName} second dose raw numbers`, () => {
        renderWithContexts(<VaccineNumbers dose={2} numberType="raw" />, provinceName);

        const numbers = screen.getByRole('heading', { name: secondDoseNumbers[provinceName] });
        expect(numbers).toBeInTheDocument();
        expect(numbers.nextSibling).toHaveTextContent(/personas/i);
      });
      it(`renders ${provinceName} second dose percentage`, () => {
        renderWithContexts(<VaccineNumbers dose={2} numberType="percentage" />, provinceName);

        const numbers = screen.getByRole('heading', {
          name: RegExp(secondDosePercentages[provinceName]),
        });
        expect(numbers).toBeInTheDocument();
        expect(numbers.nextSibling).toHaveTextContent(/de la población/i);
      });
    });
  });
});
