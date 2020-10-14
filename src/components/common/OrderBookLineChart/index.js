import React, { useState, useEffect, useRef } from 'react';
import Chartjs from 'chart.js';
import styled from 'styled-components';

import { globalColors } from '../../../config/Themes';

const ChartWrapper = styled.div`
  min-height: 15rem;
  padding-left: 1rem;
`;

const chartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    legend: {
      display: false
    },
    elements: {
      point:{
        radius: 0,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        gridLines: {
          color: 'grey',
          drawBorder: false,
        },
        id: 'A',
        type: 'linear',
        position: 'right',
        ticks: {
          min: 0,
          max: 100,
          callback: function (value) {
            return (value / this.max * 100).toFixed(0) + '%';
          },
          maxTicksLimit: 6,
        },
      }],
      // xAxes: [{
      //   ticks: {
      //     callback: function (value) {
      //       return new Date(value);
      //     },
      //   },
      // }],
    },
  }
};

const OrderBookLineChart = props => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  // trigger effect everytime priceHistory value changes
  useEffect(() => {
    let outComes = {};
    chartConfig.data.datasets = [];
    console.log(props.priceHistory)
    // loop each history item and add to separate object prop

    let prevX = null;
    let currX = null; 
    props.priceHistory.forEach(dataItem => {
      if (!outComes[dataItem.outcome]) {
        outComes[dataItem.outcome] = {
          data: [],
        }
      };
      outComes[dataItem.outcome].data.push({y: Math.floor(dataItem.avg_price), x: Math.floor(dataItem.date_type_0)});
    });

    // loop outcome object prop and create dataset item for chart array
    let maxLen = 0;
    for (const property in outComes) {
      if (outComes[property].data.length > maxLen) maxLen = outComes[property].data.length;
      chartConfig.data.datasets.push({
        data: outComes[property].data,
        backgroundColor: 'transparent',
        borderColor: props.outcomeColorNameMap[0] ? globalColors[props.outcomeColorNameMap[property].color] : "transparent",
        borderWidth: 1,
        fill: false,
      })
      console.log(maxLen)
      console.log(chartConfig);

      var labels = [];
      for (var i = 0; i <= maxLen; i++) {
          labels.push("");
      }
      chartConfig.data.labels = labels;
    }

    updateDataset();
  }, [props.priceHistory, props.outcomeColorNameMap]);


  useEffect(() => {
    if (!chartInstance) return;
    updateDataset();
  }, [chartInstance]);

  const updateDataset = () => {
    if (!chartInstance) return;
    chartInstance.data = chartConfig.data;
    chartInstance.update();
  };  

  return (
    <ChartWrapper>
      <canvas ref={chartContainer} />
    </ChartWrapper>
  );
}

export default OrderBookLineChart;