import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

interface PieChartProps {
  userId: string;
}

// Mock implementation of getUserScreenTime
const getUserScreenTime = async (userId: string): Promise<number> => {
  // Mock data: Assume the user wasted 300 minutes
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(300);
    }, 1000);
  });
};

const PieChart: React.FC<PieChartProps> = ({ userId }) => {
  const [pieData, setPieData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const totalTimeWasted = await getUserScreenTime(userId);

        // Assume total available time is 24 hours (1440 minutes) for simplicity
        const totalAvailableTime = 1440;
        const goodUseTime = totalAvailableTime - totalTimeWasted;

        // Data for the pie chart
        const data = {
          labels: ['Wasted Time', 'Good Use Time'],
          datasets: [{
            data: [totalTimeWasted, goodUseTime],
            backgroundColor: ['#FF6384', '#36A2EB'],
          }],
        };

        setPieData(data);
      } catch (error) {
        console.error('Error creating pie chart:', error);
        // Set default data in case of error
        setPieData({
          labels: ['Wasted Time', 'Good Use Time'],
          datasets: [{
            data: [300, 1140], // Default data
            backgroundColor: ['#FF6384', '#36A2EB'],
          }],
        });
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div className="pie-chart">
      {pieData ? <Pie data={pieData} /> : <p>Loading...</p>}
    </div>
  );
};

export default PieChart;