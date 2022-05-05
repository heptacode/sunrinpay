import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';

import { firestorePlugin } from 'vuefire';
import VueAnalytics from 'vue-analytics';

import '@iconify/iconify';
Vue.config.productionTip = false;

Vue.use(firestorePlugin, { maxRefDepth: 20, wait: true });

Vue.use(VueAnalytics, {
  id: 'G-1ZF3X6NF8V',
});
firebase.analytics();

declare global {
  interface Number {
    numberFormat: (this: number) => string;
  }
}
Number.prototype.numberFormat = function (this: number): string {
  return new Intl.NumberFormat().format(this);
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
