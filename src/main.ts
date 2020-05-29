import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

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
	render: (h) => h(App),
}).$mount("#app");
