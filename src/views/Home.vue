<template>
	<div class="home">
		<div>
			<h2>Routers</h2>
			<router-link :to="{name:'pos'}">pos</router-link>
			<br />
			<br />
			<router-link :to="{name:'simplemode'}">simplemode</router-link>
			<br />
			<router-link :to="{name:'detailsmode'}">detailsmode</router-link>
			<br />
			<router-link :to="{name:'payment'}">payment</router-link>
			<br />
			<router-link :to="{name:'payment-clear'}">payment-clear</router-link>
			<br />
			<router-link :to="{name:'payment-error'}">payment-error</router-link>
			<br />
			<br />
			<router-link :to="{name:'simple-payment'}">simple-payment</router-link>
			<br />
			<router-link :to="{name:'details-payment'}">details-payment</router-link>
		</div>
		<div style="margin-top:50px;">
			<h2>Number Counter</h2>
			<NumberCounter :number="Number(n)" style="width:100%; font-size:2em;" direction="bottom"></NumberCounter>
		</div>
		<div style="margin-top:50px; width:400px;height:400px;">
			<h2>View Pager</h2>
			<ViewPager :tab="['0','1','2']">
				<template v-slot:tab0>tab0</template>
				<template v-slot:tab1>tab1</template>
				<template v-slot:tab2>tab2</template>
			</ViewPager>
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
import ViewPagerVue from "../components/ViewPager.vue";
export default Vue.extend({
	data() {
		return {
			n: 25565
		};
	},
	components: {
		NumberCounter: NumberCounterVue,
		BarcodeScanner: BarcodeScannerVue,
		ViewPager: ViewPagerVue
	},
	mounted() {
		setInterval(() => {
			this.n = Math.floor(Math.random() * 65535);
		}, 1000);
	}
});
</script>

<style lang="scss" scoped>
.home {
	padding: 40px;
	overflow: scroll;
}
</style>
