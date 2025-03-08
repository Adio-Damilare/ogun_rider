/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import PropTypes from 'prop-types';

const DailyMemoChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy the chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Chart data and options
    const data = {
      labels: chartData.map((data) => data.name),
      datasets: [
        {
          label: 'Last 6 Days',
          data: chartData.map((data) => data.last6Days),
          backgroundColor: 'rgba(90, 106, 207, 100)', // Blue bars
          borderColor: 'rgba(90, 106, 207, 100)',
          borderWidth: 1,
        },
        {
          label: 'Last Week',
          data: chartData.map((data) => data.lastWeek),
          backgroundColor: '#D8D9DB', // Orange bars
          borderColor: '#D8D9DB',
          borderWidth: 1,
          
        },
      ],
    };

    const options = {
      responsive: true,
      animation: true,
      aspectRatio: 1.5,
      plugins: {
        legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true, // Use dot labels in the legend
              pointStyle: 'circle', // You can change this to 'rect', 'triangle', etc., but 'circle' is the default for dots
              padding: 20,
              pointRadius: 3,
            },
          },
        title: {
          display: false,
          text: 'Performance Bar Chart',
        },
        label: {

        }
        
      },
      scales: {
        x: {
          barPercentage: 0.5, // Relative width of the bar
          categoryPercentage: 0.5, // Spacing between bars
          maxBarThickness: 5, // Maximum width in pixels
        },
        y: {
          barPercentage: 0.5, // Relative width of the bar
          categoryPercentage: 0.5, // Spacing between bars
          maxBarThickness: 10, 
        //   beginAtZero: true,
        },
      },
      indexAxis: 'x'
    };

    // Create the chart
    const myChartRef = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(myChartRef, {
      type: 'bar',
      data,
      options,
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]); // Re-run effect if `chartData` changes

  return (
    <div className="px-2 py-4 bg-white rounded-lg shadow-md flex items-center justify-center">
      <canvas ref={chartRef} />
    </div>
  );
};

export default DailyMemoChart;



DailyMemoChart.propTypes = {
    chartData: PropTypes.array
}