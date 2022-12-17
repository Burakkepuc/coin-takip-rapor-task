<template>
  <Pie
    v-if="loaded && this.chartData.labels.length !== 0"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
  <Pie v-else :options="chartOptions" :data="emptyChartData"></Pie>
</template>

<script>
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'PieChart',
  components: {Pie},
  props: ['data', 'bgColor', 'labels'],
  data() {
    return {
      chartData: {
        labels: [...this.labels],
        datasets: [
          {
            data: [...this.data],
            backgroundColor: [...this.bgColor],
          },
        ],
      },
      emptyChartData: {
        labels: [],
        datasets: [
          {
            data: [0.01],
            backgroundColor: ['#999797'],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      },
      loaded: true,
    };
  },
};
</script>
