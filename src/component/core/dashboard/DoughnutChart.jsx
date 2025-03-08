import { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Dataset
  const chartData = useMemo(()=>(
    [
        { day: 'Monday', last6Days: 30, lastWeek: 40 },
        { day: 'Tuesday', last6Days: 50, lastWeek: 60 },
        { day: 'Wednesday', last6Days: 20, lastWeek: 35 },
      ]
  ), []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext('2d');

    // Extract data for Doughnut chart
    const labels = chartData.map((data) => data.day);
    const data = chartData.map((data) => data.last6Days);

    chartInstance.current = new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        // labels: labels, // Days of the week
        datasets: [
          {
            label: 'Last 6 Days',
            data: data, // Data values for the doughnut chart
            backgroundColor: [
              '#5A6ACF',
              '#D8D9DB',
              '#8593ED',
            ],
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 1.7,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            // display: true,
            text: 'Last 6 Days Doughnut Chart',
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="px-2 py-4 bg-white rounded-lg shadow-md flex items-center justify-center">
      <canvas ref={chartRef} />
    </div>
  );
};

export default DoughnutChart;