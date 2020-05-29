import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
	id: "232816031",
});

declare global {
	interface Number {
		numberFormat: () => string;
	}
}
Number.prototype.numberFormat = function(this: number): string {
	return new Intl.NumberFormat().format(this);
};
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
