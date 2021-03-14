import React from 'react';
import '../utils/matchMedia.mock';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import InfoModal from '../components/Title/InfoModal';

const mockHandleClose = jest.fn();

beforeEach(() => {
  render(<InfoModal handleClose={mockHandleClose} isOpen={true} />);
});

afterEach(() => {
  jest.clearAllMocks();
});

it('renders modal', () => {
  expect(screen.getByRole('dialog', { name: /argentina vacunada/i })).toBeInTheDocument();
});

it('renders modal header', () => {
  expect(screen.getByRole('banner')).toHaveTextContent(/argentina vacunada/i);
});

it('renders instructions', () => {
  expect(screen.getByText(/instrucciones/i)).toBeInTheDocument();
  expect(screen.getByText(/^seleccionar una provincia/i)).toBeInTheDocument();
  expect(screen.getByText(/deseleccionar una provincia/i)).toBeInTheDocument();
  expect(screen.getByText(/vista simplificada/i)).toBeInTheDocument();
  expect(screen.getByText(/vista completa/i)).toBeInTheDocument();
  expect(screen.getByText(/histograma/i)).toBeInTheDocument();
  expect(screen.getByText(/'conocé más'/i)).toBeInTheDocument();
});

it('renders links with correct hrefs', () => {
  expect(screen.getByRole('link', { name: /datos actuales de vacunación/i })).toHaveAttribute(
    'href',
    'http://datos.salud.gob.ar/dataset/vacunas-contra-covid-19-dosis-aplicadas-en-la-republica-argentina'
  );
  expect(screen.getByRole('link', { name: /datos históricos de vacunación/i })).toHaveAttribute(
    'href',
    'https://covidstats.com.ar/vacunados'
  );
  expect(screen.getByRole('link', { name: /poblaciones estimadas 2021/i })).toHaveAttribute(
    'href',
    'https://sitioanterior.indec.gob.ar/nivel4_default.asp?id_tema_1=2&id_tema_2=24&id_tema_3=85'
  );
  expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
    'href',
    'mailto:nicolaspoore@gmail.com'
  );
  expect(screen.getByRole('link', { name: /^github$/i })).toHaveAttribute(
    'href',
    'https://github.com/nicopoore'
  );
  expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/nicolas-poore/'
  );
  expect(screen.getByRole('link', { name: /twitter/i })).toHaveAttribute(
    'href',
    'https://twitter.com/nicopoore'
  );
  expect(screen.getByRole('link', { name: /github repo/i })).toHaveAttribute(
    'href',
    'https://github.com/nicopoore/argentina-vaccines'
  );
  expect(screen.getByRole('link', { name: /gnu affero gpl 3.0/i })).toHaveAttribute(
    'href',
    'https://github.com/nicopoore/argentina-vaccines/blob/main/LICENSE'
  );
});

it('renders close button', () => {
  expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
});

it('calls handleClose on close button click', async () => {
  userEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(mockHandleClose).toHaveBeenCalledTimes(1);
});

it('does not call handleClose on modal click', () => {
  userEvent.click(screen.getByRole('dialog', { name: /argentina vacunada/i }));
  expect(mockHandleClose).not.toHaveBeenCalled();
});
