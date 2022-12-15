<template>
  <v-app>
    <v-row align="center" class="ma-8 pa-6" fluid>
      <!-- Container Start Point For buttons-->
      <div class="mb-6 d-flex justify-start hidden">
        <v-btn @click="toggleButton" depressed color="primary" class="mr-6 btn">
          {{ (btnText = dialog ? 'Add/Update' : 'Add Stock') }}
        </v-btn>

        <v-btn depressed color="primary" class="btn"> Refresh </v-btn>
      </div>
      <!-- Container End Point For buttons-->

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
                v-for="pair in filterBy(pairs, search)"
                :key="pair.symbol"
              >
                <v-list-item-content>
                  <v-list-item-title
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
                <v-btn class="btn" dark md color="success"> Add </v-btn>
              </v-list-item>
            </v-row>

            <!-- </div> -->
          </v-form>
        </v-card>
      </v-dialog>

      <hr class="line" />

      <!-- Form Part -->
      <v-col cols="12" sm="5" height="1000px">
        <v-container height="1000px">
          eligendi cumque fuga nostrum hic tenetur pariatur enim quaerat saepe,
          quam odio iste doloribus sapiente modi facilis ea. Eveniet libero
          totam deserunt nostrum hic, perferendis ea magni, molestias adipisci
          nemo quis et aliquid maiores nesciunt dicta earum quod rerum ut. Saepe
          quisquam ipsa omnis aspernatur quia facilis laborum eos pariatur unde,
          itaque doloribus, dolor expedita corporis ducimus magnam ratione optio
          suscipit tenetur non neque dolorem? Ullam porro et id asperiores fuga
          perspiciatis aut numquam, voluptates eos labore vitae earum corrupti.
        </v-container>
      </v-col>
      <!-- Form Part end-->
      <hr class="vertical" />

      <!-- Chart part -->
      <v-col cols="12" sm="5">
        <PieChart />
      </v-col>
      <!-- Chart part end-->
    </v-row>
  </v-app>
</template>

<script>
import PieChart from './components/PieChart';
import Vue2Filters from 'vue2-filters';

export default {
  name: 'App',
  mixins: [Vue2Filters.mixin],

  components: {PieChart},
  methods: {
    toggleButton() {
      this.dialog = !this.dialog;
      this.btnText = this.dialog ? 'Add / Update' : 'Add Stock';
    },
  },

  data: () => ({
    dialog: false,
    search: '',
    btnText: 'Add Stock',
    numberValue: 1,
    chartData: {
      symbols: [],
      price: [],
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
  async mounted() {
    this.loaded = false;

    try {
      const response = await fetch(
        'https://api2.binance.com/api/v3/ticker/24hr'
      );
      const data = await response.json();
      data.forEach(element => {
        // console.log(element.symbol, element.lastPrice);
        this.chartData.symbols = [...this.chartData.symbols, element.symbol];
        // We take the volume
        this.chartData.price = [...this.chartData.price, +element.lastPrice];
      });

      // console.log(this.chartData.symbols);
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
</style>
