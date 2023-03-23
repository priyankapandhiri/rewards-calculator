import { render, screen } from '@testing-library/react';
import RewardPoints from '../components/RewardPoints';
import { act } from "react-dom/test-utils";


describe('Loading..', () => {
it('should render loading message before transactions are fetched', async () => {
    render(<RewardPoints/>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('RewardPoints', () => {
  const mockTransactions = [
    { customer: 'A', date: '2022-01-01', amount: 51 },
    { customer: 'A', date: '2022-02-02', amount: 103 },
    { customer: 'B', date: '2022-03-01', amount: 20 },
    { customer: 'B', date: '2022-04-02', amount: 250 },
    { customer: 'B', date: '2022-05-03', amount: 51 }
  ];

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
      });
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('should render reward points by customer and month', async () => {
    render(<RewardPoints />);
    await screen.findByText('Reward Points by Customer and Month');
    const customerACell = await screen.findAllByText('A');
    expect(customerACell).toBeDefined();
    const customerBCell = await screen.findAllByText('B');
    expect(customerBCell).toBeDefined();

    const monthJanCell = screen.getByText('2022-01');
    expect(monthJanCell).toBeInTheDocument();
    const monthFebCell = screen.getByText('2022-02');
    expect(monthFebCell).toBeInTheDocument();

    const rewardPoints150Cell = screen.getByText('103');
    expect(rewardPoints150Cell).toBeInTheDocument();
    const rewardPoints550Cell = screen.getByText('250');
    expect(rewardPoints550Cell).toBeInTheDocument();
  });

  it('should render total rewards by customer', async () => {
    render(<RewardPoints />);
    await screen.findByText('Reward Points by Customer and Month');

    const customerACell = await screen.findAllByText('A');
    expect(customerACell).toBeDefined();
    const customerBCell = await screen.findAllByText('B');
    expect(customerBCell).toBeDefined();

    const totalRewards57Cell = await screen.findByText('57');
    expect(totalRewards57Cell).toBeInTheDocument();
    const totalRewards550Cell = screen.getByText('350');
    expect(totalRewards550Cell).toBeInTheDocument();
  });

  it('renders the reward points table', async () => {
    render(<RewardPoints />);

    // Wait for the table to render
    const table = await screen.findAllByRole('table');

    // Check the table headers
    const headers = table[0].querySelectorAll('thead th');
    expect(headers[0]).toHaveTextContent('Customer');
    expect(headers[1]).toHaveTextContent('Month');
    expect(headers[2]).toHaveTextContent('Purchase Amount');
    expect(headers[3]).toHaveTextContent('Reward Points');


    // Check the table rows
    const rows = table[0].querySelectorAll('tbody tr');
    expect(rows).toHaveLength(5);

    expect(rows[0].querySelector('td:nth-child(1)')).toHaveTextContent('A');
    expect(rows[0].querySelector('td:nth-child(2)')).toHaveTextContent('2022-01');
    expect(rows[0].querySelector('td:nth-child(4)')).toHaveTextContent('1');

    expect(rows[1].querySelector('td:nth-child(1)')).toHaveTextContent('2022-02');
    expect(rows[1].querySelector('td:nth-child(2)')).toHaveTextContent('103');

    expect(rows[2].querySelector('td:nth-child(1)')).toHaveTextContent('B');
    expect(rows[2].querySelector('td:nth-child(2)')).toHaveTextContent('2022-03');
    expect(rows[2].querySelector('td:nth-child(4)')).toHaveTextContent('0');

    expect(rows[3].querySelector('td:nth-child(1)')).toHaveTextContent('2022-04');
    expect(rows[3].querySelector('td:nth-child(2)')).toHaveTextContent('250');
  });

  it('renders the total rewards table', async () => {
    render(<RewardPoints />);

    // Wait for the tables to render
    const table = await screen.findAllByRole('table');

        // Check the table rows
    const rows = table[1].querySelectorAll('tbody tr');
    expect(rows).toHaveLength(2);

    expect(rows[0].querySelector('td:nth-child(1)')).toHaveTextContent('A');
    expect(rows[0].querySelector('td:nth-child(2)')).toHaveTextContent('57');

    expect(rows[1].querySelector('td:nth-child(1)')).toHaveTextContent('B');
    expect(rows[1].querySelector('td:nth-child(2)')).toHaveTextContent('351');
  });

});