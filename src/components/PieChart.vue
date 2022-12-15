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
  data() {
    return {
      chartData: {
        labels: ['Vue', 'React'],
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#20AB2E',
              '#DD1B16',
              '#DD26FF',
              '#9ab973',
              '#ff4c4c',
            ],
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
      loaded: false,
    };
  },
  methods: {},
};
</script>
