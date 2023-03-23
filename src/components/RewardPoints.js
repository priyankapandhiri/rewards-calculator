import React, { useEffect, useState } from 'react';
import '../styles/RewardPoints.css';

function RewardPoints() {
  const [transactions, setTransactions] = useState([]);
  const [rewardsByCustomer, setRewardsByCustomer] = useState({});
  const [totalRewardsByCustomer, setTotalRewardsByCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('transactions.json');
        const data = await response.json();
        setTransactions(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchTransactions();
  }, []);

  useEffect(() => {
    const calculateRewards = () => {
      const newRewardsByCustomer = {};
      const newTotalRewardsByCustomer = {};

      transactions.forEach((transaction) => {
        const { customer, amount } = transaction;

        let rewards = 0;
        let totalAmount = 0;

        if (amount > 100) {
          rewards += (amount - 100) * 2;
          rewards += 50; // additional 50 points for the first $50 spent
        }

        if (amount >= 50 && amount <= 100) {
          rewards += (amount - 50) * 1;
        }

        if (amount > 0) {
            totalAmount += amount;
          }
          

        newRewardsByCustomer[customer] = [
          ...(newRewardsByCustomer[customer] || []),
          { month: transaction.date.slice(0, 7), rewardPoints: rewards, totalAmount: totalAmount },
        ];

        newTotalRewardsByCustomer[customer] =
          (newTotalRewardsByCustomer[customer] || 0) + rewards;
      });

      setRewardsByCustomer(newRewardsByCustomer);
      setTotalRewardsByCustomer(newTotalRewardsByCustomer);
    };

    calculateRewards();
  }, [transactions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="reward-points">
      <h1>Reward Points by Customer and Month</h1>

      <table id="rewards-per-month">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Month</th>
            <th>Purchase Amount</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rewardsByCustomer).map(([customer, rewards]) =>
            rewards.map((reward, index) => (
              <tr key={`${customer}-${reward.month}-${index}`}>
                {index === 0 && <td rowSpan={rewards.length}>{customer}</td>}
                <td>{reward.month}</td>
                <td>{reward.totalAmount}</td>
                <td>{reward.rewardPoints}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

<div id="totalRewards">
      <h2>Total Rewards by Customer</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(totalRewardsByCustomer).map(([customer, totalRewardPoints]) => (
            <tr key={customer}>
              <td>{customer}</td>
              <td>{totalRewardPoints}</td>
              </tr>
          ))}
              </tbody>
              </table>
              </div>
    </div>
  );
}
export default RewardPoints;