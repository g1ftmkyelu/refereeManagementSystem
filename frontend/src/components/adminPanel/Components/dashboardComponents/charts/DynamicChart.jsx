import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DynamicChart = ({ chartType, labels, datasets }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) {
      // Destroy the existing chart before creating a new one
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: datasets,
      },
    });

    // Return a cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartType, labels, datasets]);

  return <canvas ref={chartRef} />;
};

export default DynamicChart;
