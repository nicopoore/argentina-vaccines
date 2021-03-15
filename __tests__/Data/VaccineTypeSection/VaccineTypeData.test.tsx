import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import '../../../utils/matchMedia.mock';
import '@testing-library/jest-dom/extend-expect';
import VaccineTypeData from '../../../components/Data/VaccineTypeSection/VaccineTypeData';
import { vaccineTypes, rawData } from '../../../__mocks__/data/dataMock.json';
import { DataContextProvider } from '../../../utils/Context';
import { formatNumbers } from '../../../utils/functions';

const renderWithContexts = (ui: JSX.Element): RenderResult => {
  return render(<DataContextProvider data={rawData}>{ui}</DataContextProvider>);
};

describe('unit', () => {
  describe('loading state', () => {
    vaccineTypes.map(vaccineType => {
      it(`renders all skeletons on ${vaccineType.name}`, () => {
        render(<VaccineTypeData activeType={vaccineType.name} />);

        expect(screen.getAllByTestId(/VaccineTypeDataSkeleton-/)).toHaveLength(3);
      });
    });
  });

  describe('loaded state', () => {
    it('renders number correctly', () => {
      // doesn't rely on formatNumbers function
      renderWithContexts(<VaccineTypeData activeType="COVISHIELD ChAdOx1nCoV COVID 19" />);

      expect(screen.getByText(/1\.160\.000/)).toBeInTheDocument();
    });

    vaccineTypes.map(vaccineType => {
      it(`renders name and manufacturer on ${vaccineType.shortName}`, () => {
        renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

        expect(screen.getByText(vaccineType.shortName)).toBeInTheDocument();
      });

      it(`renders number tag on ${vaccineType.shortName}`, () => {
        renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

        expect(screen.getByText(/vacunas comprometidas/i)).toBeInTheDocument();
      });

      it(`renders correct number on ${vaccineType.shortName}`, () => {
        renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

        const formattedNumber = formatNumbers(vaccineType.purchased, 'number');

        expect(screen.getByText(formattedNumber)).toBeInTheDocument();
      });

      // TODO: Test country flag

      // it(`renders country flag correctly on ${vaccineType.shortName}`, async () => {
      //   renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

      //   const img = screen.getByRole('img', { name: vaccineType.countryProduced });
      //   console.log(img);
      // });
    });
  });
});

describe('integration with BarChart', () => {
  describe('loading state', () => {
    vaccineTypes.map(vaccineType => {
      it(`renders BarChart skeleton on ${vaccineType.name}`, () => {
        render(<VaccineTypeData activeType={vaccineType.name} />);

        expect(screen.getByTestId('barChartSkeleton')).toBeInTheDocument();
      });
    });
  });

  describe('loaded state', () => {
    vaccineTypes.map(vaccineType => {
      it(`renders barchart on ${vaccineType.shortName}`, () => {
        renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

        expect(screen.getAllByTestId(/barChartItem-/)).toHaveLength(3);
      });
    });
  });
});
