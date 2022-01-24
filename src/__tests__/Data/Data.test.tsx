// Deps
import '@testing-library/jest-dom/extend-expect';
import { RenderResult, render, screen } from '@testing-library/react';
import React from 'react';
import { cache, SWRConfig } from 'swr';

// Project
import { Data } from 'components';
import { SelectionContextProvider } from 'utils/Context';
import provinceNames from '__mocks__/provinceNames';
import '__mocks__/matchMedia.mock';

const renderWithContexts = (ui: JSX.Element, selectedProvince: string): RenderResult => {
  return render(
    <SelectionContextProvider selectedProvince={selectedProvince}>
      <SWRConfig value={{ dedupingInterval: 0 }}>{ui}</SWRConfig>
    </SelectionContextProvider>
  );
};

afterEach(async () => {
  cache.clear();
});

provinceNames.map(provinceName => {
  it(`renders ${provinceName} simplified without crashing`, () => {
    renderWithContexts(<Data isSimplified testing />, provinceName);
  });

  it(`renders ${provinceName} simplified loading state correctly`, () => {
    renderWithContexts(<Data isSimplified testing />, provinceName);

    expect(screen.getByRole('heading', { name: provinceName })).toBeInTheDocument();
    expect(screen.getAllByTestId('vaccineNumbersSkeleton')).toHaveLength(4);
    const buttonTag = new RegExp(`vacunación en ${provinceName}`);
    expect(screen.getByText(buttonTag)).toBeInTheDocument();
    if (provinceName === 'Tierra del Fuego') {
      expect(screen.getByRole('button', { name: /conocé más/i })).toBeInTheDocument();
    } else {
      expect(screen.getByRole('link', { name: /conocé más/i })).toBeInTheDocument();
    }
  });

  // FIXME - Error with await and SWR, haven't found solution yet.
  //         Also prevents any other Data test with loaded state.
  //         Triggers act(...) console.error since changes are being made and not tested.

  // it(`renders ${provinceName} simplified loaded state correctly`, async () => {
  // renderWithContexts(<Data isSimplified testing />, provinceName);
  //
  //   const personNumbers = await screen.findAllByRole('heading', { name: /^\d+(\.\d+)*$/ });
  // expect(personNumbers).toHaveLength(2);
  //     expect(personNumbers[0].nextSibling).toHaveTextContent(/personas/i);
  //     expect(personNumbers[1].nextSibling).toHaveTextContent(/personas/i);
  //     const percentageNumbers = await screen.findAllByRole('heading', { name: /\\d+(?:\\,\\d+)? %/ });
  //     expect(percentageNumbers).toHaveLength(2);
  //   });
});
