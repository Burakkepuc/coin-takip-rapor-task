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
        labels: [],
        datasets: [
          {
            data: [],
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
  methods: {
    greet() {},
  },
  async mounted() {
    this.loaded = false;

    try {
      const response = await fetch(
        'https://api2.binance.com/api/v3/ticker/24hr'
      );
      const data = await response.json();
      console.log(data[0]);
      data.forEach(element => {
        // this.chartData.labels = [...this.chartData.labels, element.symbol];
        // We take the volume
        this.chartData.datasets[0].data = [
          ...this.chartData.datasets[0].data,
          +element.quoteVolume,
        ];
      });

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
