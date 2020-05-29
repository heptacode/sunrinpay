import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

declare global {
	interface Number {
		numberFormat: (this: number) => string;
	}
}
Number.prototype.numberFormat = function(this: number): string {
	return new Intl.NumberFormat().format(this);
};
Number(19).numberFormat();
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
