import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import '../../../__mocks__/matchMedia.mock';
import '@testing-library/jest-dom/extend-expect';
import VaccineTypeData from '../../../components/Data/VaccineTypeSection/VaccineTypeData';
import { vaccineTypes, rawData } from '../../../__mocks__/dataMock.json';
import { DataContextProvider } from '../../../utils/Context';
import { formatNumbers } from '../../../utils/functions';
import userEvent from '@testing-library/user-event';

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

          expect(screen.getByRole('heading', { name: vaccineType.shortName })).toBeInTheDocument();
          expect(screen.getByText(vaccineType.provider)).toBeInTheDocument();
        });

        it(`renders number tag on ${vaccineType.shortName}`, () => {
          renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

          expect(screen.getByText(/vacunas comprometidas/i)).toBeInTheDocument();
        });

        it(`renders correct number on ${vaccineType.shortName}`, () => {
          renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

          const formattedNumber = formatNumbers(vaccineType.purchased, 'number');

          expect(screen.getByRole('heading', { name: formattedNumber })).toBeInTheDocument();
        });

        it(`renders image with flag code on ${vaccineType.shortName}`, async () => {
          renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

          expect(
            screen.getByRole('img', { name: vaccineType.countryProduced })
          ).toBeInTheDocument();
        });

        it(`renders tooltip on BarChart item hover on ${vaccineType.shortName}`, async () => {
          renderWithContexts(<VaccineTypeData activeType={vaccineType.name} />);

          userEvent.hover(screen.getByTestId(/barChartItem-0/));
          await waitFor(() => expect(screen.getByRole('tooltip', { name: /aplicadas/i })));
          userEvent.hover(screen.getByTestId(/barChartItem-1/));
          await waitFor(() => expect(screen.getByRole('tooltip', { name: /entregadas/i })));
          userEvent.hover(screen.getByTestId(/barChartItem-2/));
          await waitFor(() => expect(screen.getByRole('tooltip', { name: /comprometidas/i })));
        });
      });
    });

    describe('total selected', () => {
      beforeEach(() => {
        renderWithContexts(<VaccineTypeData activeType="Total" />);
      });
      it('renders title', () => {
        expect(screen.getByText('Total')).toBeInTheDocument();
      });

      it(`renders number tag`, () => {
        expect(screen.getByText(/vacunas comprometidas/i)).toBeInTheDocument();
      });

      it(`renders correct number`, () => {
        expect(screen.getByRole('heading', { name: /57\.591\.000/ })).toBeInTheDocument();
      });

      it('does not render manufacturer', () => {
        expect(screen.queryByText(/(instituto|oxford|sinopharm)/i)).not.toBeInTheDocument();
      });

      it('does not render flag', () => {
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
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
