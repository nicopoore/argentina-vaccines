import '@testing-library/jest-dom/extend-expect';
import { RenderResult, render, screen } from '@testing-library/react';
import React from 'react';
import NumbersSection from '../../../components/Data/NumbersSection';
import { DataContextProvider, SelectionContextProvider } from '../../../utils/Context';
import {
  rawData,
  firstDoseNumbers,
  firstDosePercentages,
  secondDoseNumbers,
  secondDosePercentages,
} from '../../../__mocks__/dataMock.json';
import provinceNames from '../../../__mocks__/provinceNames';

const renderWithContexts = (ui: JSX.Element, selectedProvince: string): RenderResult => {
  return render(
    <SelectionContextProvider selectedProvince={selectedProvince}>
      <DataContextProvider data={rawData}>{ui}</DataContextProvider>
    </SelectionContextProvider>
  );
};

describe('unit', () => {
  provinceNames.map(provinceName => {
    it(`renders province title (${provinceName})`, () => {
      renderWithContexts(<NumbersSection />, provinceName);

      expect(screen.getByRole('heading', { name: provinceName })).toBeInTheDocument();
    });
  });
});

describe('integration with inner components', () => {
  provinceNames.map(provinceName => {
    it(`renders ${provinceName} both doses' info`, () => {
      renderWithContexts(<NumbersSection />, provinceName);

      expect(screen.getByRole('heading', { name: /primera dosis/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /ambas dosis/i })).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: firstDoseNumbers[provinceName] })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: RegExp(firstDosePercentages[provinceName]) })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: secondDoseNumbers[provinceName] })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: RegExp(secondDosePercentages[provinceName]) })
      ).toBeInTheDocument();
    });

    it(`renders ${provinceName} button`, () => {
      renderWithContexts(<NumbersSection />, provinceName);

      expect(screen.getByText(/consultá la información/i)).toHaveTextContent(
        RegExp(provinceName, 'i')
      );

      if (provinceName !== 'Tierra del Fuego') {
        expect(screen.getByRole('link', { name: /conocé más/i })).toHaveAttribute('href');
        expect(screen.getByRole('link', { name: /conocé más/i })).not.toHaveAttribute('href', '');
      } else {
        expect(screen.getByRole('button', { name: /conocé más/i })).toBeInTheDocument();
      }
    });
  });
});
