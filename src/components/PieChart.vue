<template>
  <Pie
    v-if="loaded"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
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
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.bgColor,
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
  methods: {},
};
</script>
