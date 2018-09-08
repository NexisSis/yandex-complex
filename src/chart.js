import { Chart } from 'chart.js';

function getColor(isActive, alpha = 1) {
  return isActive
    ? `rgba(54, 162, 235, ${alpha})`
    : `rgba(255, 99, 132, ${alpha})`;
}

function getLabel(el, i, data) {
  const x = new Date();
  x.setHours(x.getHours() - data.length + i);
  x.setMinutes(0);
  x.setSeconds(0);
  x.setMilliseconds(0);
  return x.toString();
}

export function createChart(container, data, isActive) {
      console.log('create chart');
      const ctx = container.getContext('2d');
      const borderColor = getColor(isActive);
      const backgroundColor = getColor(isActive, 0.5);
      var label = data.map(getLabel).map((tmpLabel)=> {
          return tmpLabel.split("(")[0];
      });

  var chart = new Chart(ctx, {
    type: 'line',
    responsive:true,
    data: {
      labels: label,
      datasets: [
        {
          data: data,
          borderWidth: 1,
            borderColor: borderColor,
              backgroundColor: backgroundColor
        }
      ]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{ ticks: { display: false } }],
            yAxes: [{ ticks: { beginAtZero: true } }]
        }
    }
  });

  return chart;
}
