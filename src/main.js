import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import Vue2Filters from 'vue2-filters';
import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

Vue.use(Vue2Filters);
Vue.use(VueVirtualScroller);

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
