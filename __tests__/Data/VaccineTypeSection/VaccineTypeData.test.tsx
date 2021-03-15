import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
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

    describe('vaccine selected', () => {
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

        it(`renders image with flag code on ${vaccineType.shortName}`, async () => {
          renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

          expect(
            screen.getByRole('img', { name: vaccineType.countryProduced })
          ).toBeInTheDocument();
        });
      });
    });

    describe('total selected', () => {
      it('renders title', () => {
        renderWithContexts(<VaccineTypeData activeType="Total" />);

        expect(screen.getByText('Total')).toBeInTheDocument();
      });

      it(`renders number tag`, () => {
        renderWithContexts(<VaccineTypeData activeType="Total" />);

        expect(screen.getByText(/vacunas comprometidas/i)).toBeInTheDocument();
      });

      it(`renders correct number`, () => {
        renderWithContexts(<VaccineTypeData activeType="Total" />);

        expect(screen.getByText(/47\.591\.000/)).toBeInTheDocument();
      });
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
    it(`renders BarChart skeleton on Total`, () => {
      render(<VaccineTypeData activeType="Total" />);

      expect(screen.getByTestId('barChartSkeleton')).toBeInTheDocument();
    });
  });

  describe('loaded state', () => {
    vaccineTypes.map(vaccineType => {
      it(`renders BarChart on ${vaccineType.shortName}`, () => {
        renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

        expect(screen.getAllByTestId(/barChartItem-/)).toHaveLength(3);
      });
    });
    it(`renders BarChart on Total`, () => {
      renderWithContexts(<VaccineTypeData activeType="Total" />);

      expect(screen.getAllByTestId(/barChartItem-/)).toHaveLength(3);
    });
  });
});
