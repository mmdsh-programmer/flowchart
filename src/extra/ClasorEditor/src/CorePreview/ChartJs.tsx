import React from 'react';
import { EChart } from '../Enum';
import { Bar, Doughnut, Line, Pie, PolarArea } from 'react-chartjs-2';

declare interface IProps {
  type: EChart;
  height: number;
  data: { value: number; label: string }[];
}

const ChartJs = (props: IProps) => {
  const { type, height, data } = props;
  const width = window.innerWidth < 600 ? window.innerWidth - 125 : 300;
  let labels: string[] = [];
  let datasets: { data: number[]; backgroundColor: string }[] = [];
  let innerData: number[] = [];
  data.forEach((d) => {
    labels = [...labels, d.label];
    innerData = [...innerData, d.value];
  });
  datasets = [{ data: innerData, backgroundColor: '#cbdde6' }];
  const chartdata = {
    labels,
    datasets,
  };

  if (type === EChart.bar) {
    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
    return (
      <div
        style={{
          display: 'inline-block',
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Bar data={chartdata} options={options} />
      </div>
    );
  }
  if (type === EChart.doughnut) {
    const options = {
      maintainAspectRatio: false,
    };
    const sampledata = {
      labels: labels || [],
      datasets: [
        {
          data: (datasets[0] && datasets[0].data) || [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgb(255 43 115)',
            'rgba(255, 152  , 0, 1)',
            'rgba(96, 125, 139, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgb(200 34 90)',
            'rgb(194 115 0)',
            'rgb(78 102 114)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div
        style={{
          display: 'inline-block',
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Doughnut data={sampledata} options={options} />
      </div>
    );
  }
  if (type === EChart.line) {
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
    const sampleData = {
      labels: labels || [],
      datasets: [
        {
          data: (datasets[0] && datasets[0].data) || [],
          fill: true,
          backgroundColor: 'rgb(192 208 216 / 55%)',
          pointBackgroundColor: 'rgb(192 208 216)',
          borderColor: 'rgb(192 208 216)',
          tension: 0.3,
        },
      ],
    };
    return (
      <div
        style={{
          display: 'inline-block',
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Line data={sampleData} options={options} height={height} />
      </div>
    );
  }
  if (type === EChart.pie) {
    const options = {
      maintainAspectRatio: false,
    };
    const sampledata = {
      labels: labels || [],
      datasets: [
        {
          data: (datasets[0] && datasets[0].data) || [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgb(255 43 115)',
            'rgba(255, 152  , 0, 1)',
            'rgba(96, 125, 139, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgb(200 34 90)',
            'rgb(194 115 0)',
            'rgb(78 102 114)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div
        style={{
          display: 'inline-block',
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Pie data={sampledata} options={options} />
      </div>
    );
  }
  if (type === EChart.polar) {
    const options = {
      maintainAspectRatio: false,
    };
    const sampledata = {
      labels: labels || [],
      datasets: [
        {
          data: (datasets[0] && datasets[0].data) || [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgb(255 43 115)',
            'rgba(255, 152  , 0, 1)',
            'rgba(96, 125, 139, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgb(200 34 90)',
            'rgb(194 115 0)',
            'rgb(78 102 114)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div
        style={{
          display: 'inline-block',
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <PolarArea data={sampledata} options={options} />
      </div>
    );
  }
  return <div>CHART TYPE NOT FOUND</div>;
};

export default ChartJs;
