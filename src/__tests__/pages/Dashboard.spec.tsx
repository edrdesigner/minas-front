/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/first */
import React from 'react';
import { render, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';
import Dashboard from '../../pages/Dashboard';

const wait = (amount = 0): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, amount));
};

const actWait = async (amount = 0): Promise<void> => {
  await act(async () => {
    await wait(amount);
  });
};

const apiMock = new MockAdapter(api);

jest.mock('../../utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((value: number) => {
    switch (value) {
      case 540:
        return 'R$ 540,00';
      case 270:
        return 'R$ 270,00';
      default:
        return '';
    }
  }),
}));

const mockData = {
  meta: {
    total: 1,
    per_page: 10,
    current_page: null,
    last_page: 1,
    first_page: 1,
    next_page_url: null,
    previous_page_url: null,
  },
  data: [
    {
      id: 1,
      title: 'Kit Colcha Matelado Tomie',
      description: 'Tons sóbrios, padrão geométrico e muita elegância',
      price: 540,
      discount: 50,
      images: [
        {
          id: 1,
          url: 'image1.jpg',
        },
        {
          id: 2,
          url: 'image2.jpg',
        },
        {
          id: 3,
          url: 'image3.jpg',
        },
        {
          id: 4,
          url: 'image4.jpg',
        },
      ],
    },
  ],
};

describe('Dashboard Page', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should be able to list the products', async () => {
    const { getByText } = render(<Dashboard />);
    apiMock.onGet('products').reply(200, mockData);
    await actWait();

    expect(getByText('Produtos')).toBeTruthy();
    expect(getByText('R$ 540,00')).toBeTruthy();
    expect(getByText('R$ 270,00')).toBeTruthy();
  });
});
