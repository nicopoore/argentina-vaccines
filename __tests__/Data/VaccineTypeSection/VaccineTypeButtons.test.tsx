import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '../../../__mocks__/matchMedia.mock';
import '@testing-library/jest-dom/extend-expect';
import VaccineTypeButtons from '../../../components/Data/VaccineTypeSection/VaccineTypeButtons';
import { vaccineTypes } from '../../../__mocks__/dataMock.json';
import userEvent from '@testing-library/user-event';

const handleChange = jest.fn();

beforeEach(() => {
  render(
    <VaccineTypeButtons
      activeType="Sputnik V COVID19 Instituto Gamaleya"
      handleChange={handleChange}
      vaccines={[...vaccineTypes, { name: 'Total', shortName: 'Total' }]}
    />
  );
});

it('renders button group', () => {
  const buttonGroup = screen.getByRole('group');
  expect(buttonGroup).toBeInTheDocument();
});

it(`renders Sputnik V button`, () => {
  const buttonGroup = screen.getByRole('group');
  expect(within(buttonGroup).getByRole('button', { name: /sputnik v/i })).toBeInTheDocument();
});

it(`renders Covishield button`, () => {
  const buttonGroup = screen.getByRole('group');
  expect(within(buttonGroup).getByRole('button', { name: /covishield/i })).toBeInTheDocument();
});

it(`renders Sinopharm button`, () => {
  const buttonGroup = screen.getByRole('group');
  expect(within(buttonGroup).getByRole('button', { name: /bbibp-corv/i })).toBeInTheDocument();
});

it(`renders AZD1222 button`, () => {
  const buttonGroup = screen.getByRole('group');
  expect(within(buttonGroup).getByRole('button', { name: /azd1222/i })).toBeInTheDocument();
});

it(`renders Total button`, () => {
  const buttonGroup = screen.getByRole('group');
  expect(within(buttonGroup).getByRole('button', { name: /total/i })).toBeInTheDocument();
});

it('calls handleChange when clicked', () => {
  const buttonGroup = screen.getByRole('group');
  userEvent.click(within(buttonGroup).getByRole('button', { name: /covishield/i }));
  expect(handleChange).toHaveBeenCalledTimes(1);
  userEvent.click(within(buttonGroup).getByRole('button', { name: /bbibp-corv/i }));
  expect(handleChange).toHaveBeenCalledTimes(2);
  userEvent.click(within(buttonGroup).getByRole('button', { name: /azd1222/i }));
  expect(handleChange).toHaveBeenCalledTimes(3);
  userEvent.click(within(buttonGroup).getByRole('button', { name: /total/i }));
  expect(handleChange).toHaveBeenCalledTimes(4);
  userEvent.click(within(buttonGroup).getByRole('button', { name: /sputnik v/i }));
  expect(handleChange).toHaveBeenCalledTimes(5);
});
