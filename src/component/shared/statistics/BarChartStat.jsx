import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChartStat = ({ seriesColor, legendTitle, seriesData, xAxisData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    const myChart = echarts.init(chartRef.current);

    // Chart options
    const option = {
      legend: {
        icon: "circle",
        selectedMode: false,
        data: legendTitle,
        left: 0,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: xAxisData, // Use processed xAxis data
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        // {
        //   type: "value",
        // },
        {
          type: "log", // Use a logarithmic scale
          min: 1, // Optional: Set a minimum value to avoid log(0) issues
          axisLabel: {
            formatter: "{value}", // Keep labels readable
          },
        },
      ],
      series: [
        {
          name: legendTitle?.[0],
          type: "bar",
          barWidth: "30%",
          data: seriesData?.map((item) => ({
            value: item?.value,
            // itemStyle: {
            //   color: item?.value < 1000 ? "#FF5733" : seriesColor ?? "#5A6ACF", // Highlight small values in red
            // },
            // label:
            //   item.value < 1000 // Only add a label to the lowest value
            //     ? {
            //         show: true,
            //         position: "top", // Position the label above the bar
            //         formatter: "{c}", // Show the value as the label
            //       }
            //     : null,
          })),
          itemStyle: {
            color: seriesColor ?? "#5A6ACF", // Default color
          },
        },
      ],
    };

    // Set chart options
    myChart.setOption(option);

    // Cleanup function to dispose of the chart on unmount
    return () => {
      myChart.dispose();
    };
  }, [legendTitle, seriesColor, seriesData, xAxisData]);

  return <div ref={chartRef} className="w-full h-[21.5rem]" />;
};

export default BarChartStat;
