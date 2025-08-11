import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Transactions.css';

const Transactions = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [dealersData, setDealersData] = useState([]);
  const [upcomingAssetsData, setUpcomingAssetsData] = useState([]);
  const [chartDataReady, setChartDataReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {https://asset-management-1-0mj8.onrender.com/
      try {
        const [assetsRes, dealersRes, upcomingRes] = await Promise.all([
          fetch('https://asset-management-1-0mj8.onrender.com/api/assets'),
          fetch('https://asset-management-1-0mj8.onrender.com/api/dealers'),
          fetch('https://asset-management-1-0mj8.onrender.com/upcomingassets'),
        ]);

        // Check if all responses are OK
        if (!assetsRes.ok || !dealersRes.ok || !upcomingRes.ok) {
          throw new Error('One or more API requests failed');
        }

        const [assets, dealers, upcomingAssets] = await Promise.all([
          assetsRes.json(),
          dealersRes.json(),
          upcomingRes.json(),
        ]);

        setAssetsData(assets);
        setDealersData(dealers);
        setUpcomingAssetsData(upcomingAssets);
        setChartDataReady(true);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setChartDataReady(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Assets', 'Dealers', 'Upcoming Assets'],
    datasets: [
      {
        data: [assetsData.length, dealersData.length, upcomingAssetsData.length],
        backgroundColor: ['#36a2eb', '#4caf50', '#ff6384'],
        hoverBackgroundColor: ['#2196f3', '#388e3c', '#e91e63'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="transactions-container">
      <h2>Asset Overview</h2>

      <div className="pie-chart-container">
        {chartDataReady ? (
          <Pie data={data} options={options} />
        ) : (
          <p>Loading chart or data failed...</p>
        )}
      </div>

      <div className="counts-container">
        <p>Total Assets: {assetsData.length}</p>
        <p>Total Dealers: {dealersData.length}</p>
        <p>Total Upcoming Assets: {upcomingAssetsData.length}</p>
      </div>
    </div>
  );
};

export default Transactions;
