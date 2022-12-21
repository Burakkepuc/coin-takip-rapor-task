<template>
  <v-app>
    <v-row align="center" class="ma-8 pa-6" fluid>
      <!-- Container Start Point For buttons-->
      <div class="mb-6 d-flex justify-start hidden">
        <v-btn @click="toggleButton" depressed color="primary" class="mr-6 btn">
          {{ (btnText = dialog ? 'Add/Update' : 'Add Stock') }}
        </v-btn>

        <v-btn @click="refreshPage" depressed color="primary" class="btn">
          Refresh
        </v-btn>
      </div>
      <!-- Container End Point For Buttons-->

      <!-- Modal Code Starts-->
      <v-dialog
        v-model="dialog"
        width="80%"
        height="900px"
        overflow="hidden"
        pa-6
      >
        <v-card class="pa-12">
          <v-form>
            <v-text-field
              v-model="search"
              label="Search"
              outlined
            ></v-text-field>

            <v-row>
              <v-list-item
                v-for="(pair, index) in filterBy(pairs, search)"
                :key="pair.symbol"
              >
                <v-list-item-content>
                  <v-list-item-title ref="refWord"
                    >{{ pair.symbol }} - {{ pair.price }}</v-list-item-title
                  >
                </v-list-item-content>
                <v-text-field
                  outlined
                  v-model="numberValue"
                  hide-details
                  single-line
                  type="number"
                  class="shrink mr-2"
                  width="50px"
                  height="50px"
                />
                <AddBtn @click-event="searchHandle(index)" />
              </v-list-item>
            </v-row>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- Modal Code Ends-->

      <!-- Horizontal Line-->
      <hr class="line" />

      <!--Mainpage List Starts -->
      <v-col cols="12" sm="5" height="1000px">
        <v-container height="1000px">
          <v-list-item
            class="border"
            v-for="(label, index) in chartData.labels"
            :key="index++"
          >
            <v-row>
              <v-list-item-content d-flex>
                <v-list-item-title
                  >{{ label }}
                  <span>{{
                    chartData.datasets[0].data[index]
                  }}</span></v-list-item-title
                >
              </v-list-item-content>
              <v-btn class="btn" dark md color="error" @click="deleteHandle">
                Delete
              </v-btn>
            </v-row>
          </v-list-item>
        </v-container>
      </v-col>
      <!-- Mainpage List  End-->

      <!-- Vertical Line-->

      <hr class="vertical" />

      <!-- Chart part -->
      <v-col cols="12" sm="5">
        <PieChart
          :data="this.chartData.datasets[0].data"
          :bgColor="this.chartData.datasets[0].backgroundColor"
          :labels="this.chartData.labels"
          :key="this.chartData.labels.length"
        />
      </v-col>
      <!-- Chart part end-->
    </v-row>
  </v-app>
</template>

<script>
import PieChart from './components/PieChart';
import Vue2Filters from 'vue2-filters';
import AddBtn from './components/AddBtn.vue';

export default {
  name: 'App',
  mixins: [Vue2Filters.mixin],

  components: {PieChart, AddBtn},
  methods: {
    toggleButton() {
      this.dialog = !this.dialog;
      // this.btnText = this.dialog ? 'Add / Update' : 'Add Stock';
    },
    searchHandle(index) {
      const [sym, price] = this.$refs.refWord[index].innerText.split('-');
      this.symbol = sym;
      this.chartData.labels = [...this.chartData.labels, sym];
      this.chartData.datasets[0].data = [
        ...this.chartData.datasets[0].data,
        +price,
      ];
    },
    deleteHandle() {
      this.chartData.labels.pop();
      this.chartData.datasets[0].data.pop();
      this.chartData.datasets[0].backgroundColor.pop();
    },
    refreshPage() {
      setTimeout(function () {
        location.reload();
      }, 100);
    },
  },

  data: () => ({
    dialog: false,
    search: '',
    btnText: 'Add Stock',
    numberValue: 1,
    chartData: {
      labels: ['CHM', 'BBM', 'LLJTRY'],
      symbols: [],
      price: [],
      datasets: [
        {
          data: [0.035, 0.26, 0.022],
          backgroundColor: [
            '#41B883',
            '#E46651',
            '#20AB2E',
            '#DD1B16',
            '#DD26FF',
            '#9ab973',
            `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
          ],
        },
      ],
    },
  }),
  computed: {
    pairs() {
      return this.chartData.symbols.map((symbol, i) => {
        return {
          symbol: symbol,
          price: this.chartData.price[i],
        };
      });
    },
  },
  async created() {
    this.loaded = false;

    try {
      const response = await fetch(
        'https://api2.binance.com/api/v3/ticker/24hr'
      );
      const data = await response.json();
      // Get first 100 of data
      data.slice(0, 100).forEach(element => {
        this.chartData.symbols = [...this.chartData.symbols, element.symbol];
        this.chartData.price = [...this.chartData.price, +element.lastPrice];
      });

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
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
.scroller {
  height: 100%;
}
.border {
  border: 1px solid rgba(0, 0, 0, 0.123);
  padding: 5px 20px;
  margin: 10px 0;
  border-radius: 10px;
}
</style>
