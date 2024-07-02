/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import {
  BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
  Bar as RechartsBar,
} from 'recharts';
import { format, parseISO } from 'date-fns';

const colors = [
  '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57',
  '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57'
];

const Reports = ({ token, userId }) => {
  const [consultations, setConsultations] = useState([]);
  const [cropDistribution, setCropDistribution] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [userVisits, setUserVisits] = useState([]);
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    const fetchCropDistribution = async () => {
      try {
        const response = await axios.get('https://tyktyk.pythonanywhere.com/cropinfo/crop-distribution/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setCropDistribution(response.data);
      } catch (error) {
        console.error("Error fetching crop distribution data", error);
      }
    };

    const fetchOrdersData = async () => {
      try {
        const response = await axios.get('https://tyktyk.pythonanywhere.com/orders/stats/monthly/');
        const products = getUniqueProducts(response.data);
        const formattedData = formatMonthlyData(response.data, products);
        setOrdersData(formattedData);
        generateColorMap(products);
      } catch (error) {
        console.error("Error fetching orders data", error);
      }
    };

    const fetchUserVisits = async () => {
      try {
        const response = await axios.get('https://tyktyk.pythonanywhere.com/api/uservisits/statistics/');
        const aggregatedData = aggregateMonthlyData(response.data);
        setUserVisits(aggregatedData);
      } catch (error) {
        console.error("Error fetching user visits data", error);
      }
    };

    fetchCropDistribution();
    fetchOrdersData();
    fetchUserVisits();
  }, [token, userId]);

  const getUniqueProducts = (monthlyData) => {
    const products = new Set();
    monthlyData.forEach(item => {
      products.add(item.product);
    });
    return Array.from(products);
  };

  const generateColorMap = (products) => {
    const colorMap = {};
    products.forEach((product, index) => {
      colorMap[product] = colors[index % colors.length];
    });
    setColorMap(colorMap);
  };

  const formatMonthlyData = (monthlyData, products) => {
    const dataMap = {};

    monthlyData.forEach(item => {
      const month = item.month;
      const product = item.product;
      const quantity = item.total_quantity;

      if (!dataMap[month]) {
        dataMap[month] = {};
        products.forEach(product => {
          dataMap[month][product] = 0;
        });
      }

      dataMap[month][product] += quantity;
    });

    const formattedData = Object.keys(dataMap).map(month => {
      const monthData = { month };
      Object.keys(dataMap[month]).forEach(product => {
        monthData[product] = dataMap[month][product];
      });
      return monthData;
    });

    return formattedData;
  };

  const aggregateMonthlyData = (dailyData) => {
    const monthlyData = {};

    Object.keys(dailyData).forEach(dateString => {
      const date = parseISO(dateString);
      const month = format(date, 'yyyy-MM');

      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month] += dailyData[dateString];
    });

    return Object.keys(monthlyData).map(month => ({
      name: month,
      visits: monthlyData[month],
    }));
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MMM');
  };

  const formatMonth = (monthString) => {
    const date = parseISO(`${monthString}-01`);
    return format(date, 'MMM');
  };

  const findJanuaryIndex = (data) => {
    return data.findIndex(item => item.name.endsWith('-01'));
  };

  const januaryIndex = findJanuaryIndex(userVisits);

  const pieData = {
    labels: cropDistribution.map(cd => cd.crops_grown__name),
    datasets: [
      {
        label: 'Farmers',
        data: cropDistribution.map(cd => cd.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          }
        }
      }
    }
  };

  const barData = {
    labels: cropDistribution.map(cd => cd.crops_grown__name),
    datasets: [
      {
        label: 'Farmers',
        data: cropDistribution.map(cd => cd.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const chartContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  };

  const chartStyle = {
    flex: 1,
    minWidth: '300px',
    maxWidth: '500px',
    height: '400px',
    margin: '20px',
  };

  const pieChartStyle = {
    flex: 1,
    minWidth: '300px',
    maxWidth: '300px',
    height: '300px',
    margin: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
  };

  const trStyle = {
    '&:nth-child(even)': { backgroundColor: '#f2f2f2' },
    '&:hover': { backgroundColor: '#ddd' },
  };

  return (
    <div>
      <h1>Farmers per each crop</h1>
      <div style={chartContainerStyle}>
        <div style={chartStyle}>
          <Bar data={barData} options={barOptions} />
        </div>
        <div style={pieChartStyle}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      <h2>Crop monthly orders</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={ordersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(colorMap).map(product => (
            <RechartsBar key={product} dataKey={product} fill={colorMap[product]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <h2>User visits per month</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={userVisits} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {januaryIndex !== -1 && (
            <ReferenceLine
              x={userVisits[januaryIndex].name}
              label={{
                position: 'insideTopRight',
                value: 'Year Start',
                fontWeight: 'bold',
                fill: 'green'
              }}
              stroke="green"
              strokeWidth={2}
            />
          )}
          <RechartsBar dataKey="visits" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Reports;