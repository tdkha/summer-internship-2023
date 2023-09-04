import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const colors =[
  '#13F287' , '#13F287','#99F3BD','#D2F6C5'
]
     

export default function DoughNut({props}) {
  const { labels, label, data } = props;
  const length = labels.length;

  const newColor = [];
  for (let i=0; i < (length-1); i++){
    newColor.push(colors[i])
  }
  const newdata = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: ['#13F287','#F6F7D4'],
        borderColor: [...newColor,'#F6F7D4'],
        hoverBackgroundColor:['#206A5D'],
        hoverBorderColor:['#206A5D'],
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    cutout: '70%', // Set the cutout as a percentage
    radius: ['90%'],
  };
  return <Doughnut data={newdata} options={chartOptions}/>;
}
