<template>
	<div class="home">
		<div>
			<h2>Routers</h2>
			<router-link to="simplemode">simplemode</router-link>
			<br />
			<router-link to="detailsmode">detailsmode</router-link>
			<br />
			<router-link to="payment">payment</router-link>
			<br />
			<router-link to="payment-clear">payment-clear</router-link>
			<br />
			<router-link to="payment-error">payment-error</router-link>
			<br />
		</div>
		<div style="margin-top:50px;">
			<h2>Number Counter</h2>
			<NumberCounter
				:number="Number(n)"
				style="width:100%; font-size:2em;"
				direction="bottom"
			></NumberCounter>
		</div>
		<div style="margin-top:50px;">
			<h2>Barcode Scanner</h2>
			<BarcodeScanner></BarcodeScanner>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberCounterVue from "../components/NumberCounter.vue";
import BarcodeScannerVue from "../components/BarcodeScanner.vue";
export default Vue.extend({
	data() {
		return {
			n: 25565,
		};
	},
	components: {
		NumberCounter: NumberCounterVue,
		BarcodeScanner: BarcodeScannerVue,
	},
	mounted() {
		setInterval(() => {
			this.n = Math.floor(Math.random() * 65535);
		}, 1000);
	},
});
</script>

<style lang="scss" scoped>
.home {
}
</style>
