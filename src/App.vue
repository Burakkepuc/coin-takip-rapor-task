<template>
  <v-app>
    <v-row align="center" class="ma-8 pa-6" fluid>
      <!-- Container Start Point For buttons-->
      <v-container>
        <v-btn
          @click="increment"
          depressed
          color="primary"
          class="mr-6 ml-5 btn"
        >
          Add Stock
        </v-btn>
        <v-btn depressed color="primary" class="btn"> Refresh </v-btn>
      </v-container>
      <!-- Container End Point For buttons-->

      <hr class="line" />
      <v-col cols="12" sm="5">Hello</v-col>
      <hr class="vertical" />
      <v-col cols="12" sm="5">
        <PieChart />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import PieChart from './components/PieChart';

export default {
  name: 'App',

  components: {PieChart},
  methods: {
    increment() {
      this.count++;
    },
  },

  data: () => ({
    count: 0,
  }),
};
</script>

<style scoped>
.btn {
  text-transform: none !important;
}
.line {
  width: 100%;
  margin: 0 auto;
}
hr.vertical {
  height: 80%;
  margin: 3% auto;
}
</style>
