import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart1 = ({ array = [], currency, days }) => {
  const prices = [];
  const date = [];


for(let i=0;i<array.length;i++){
  if(days==="24h"){
  date.push(new Date(array[i][0]).toLocaleTimeString());
  }else{
    date.push(new Date(array[i][0]).toLocaleDateString());
  }
  prices.push(array[i][1]);

}
const data={
  labels:date,
  datasets:[{
    label:`price in inr`,
    data:prices,borderColor:"rgb(139,230,217)",
    backgroundColor:"rgba(139,230,217,0.1)",
  }]
}

  return (
    <Line
     
      options={{
        responsive: true,
        maintainAspectRatio: false
      }}
      data={data}
    />
  );
};

export default Chart1;