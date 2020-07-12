<template>
	<div class="sitemap">
		<div>
			<h2>Customer</h2>
			<ul>
				<li>
					<router-link :to="{ name: 'payment' }">payment</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'payment-clear' }">payment-clear</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'payment-error' }">payment-error</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'simple-payment' }">simple-payment</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'details-payment' }">details-payment</router-link>
				</li>
			</ul>
			<br />
			<h2>PoS</h2>
			<ul>
				<li>
					<router-link :to="{ name: 'pos' }">pos</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'order' }">order</router-link>
				</li>
			</ul>
			<div style="margin-top:50px;">
				<h2>Number Counter</h2>
				<NumberCounter :text="n" :isNumberFormat="true" defaultChar="0" style="width:100%; font-size:2em;" direction="bottom"></NumberCounter>
			</div>
			<div style="margin-top:50px; width:400px;height:400px;">
				<h2>View Pager</h2>
				<ViewPager :tab="['0', '1', '2']">
					<template v-slot:tab0>tab0</template>
					<template v-slot:tab1>tab1</template>
					<template v-slot:tab2>tab2</template>
				</ViewPager>
			</div>
			<div style="margin-top:50px;">
				<h2>Sales Chart</h2>
				<SalesChart style="height:500px;"></SalesChart>
			</div>
			<div style="margin-top:50px;">
				<h2>Barcode Scanner</h2>
				<BarcodeScanner></BarcodeScanner>
			</div>
			<div style="margin-top:50px;">
				<h2>QR Scanner</h2>
				<!-- <QRScannerIntent @decode="onDecode"></QRScannerIntent> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import NumberCounterVue from "vue-roller";
import BarcodeScannerVue from "../components/BarcodeScanner.vue";
import ViewPagerVue from "../components/ViewPager.vue";

import { Vue, Component, Watch } from "vue-property-decorator";
import SalesChartVue from "../components/SalesChart.vue";
import QRcode from "../components/QRcode.vue";
import QRScannerIntent from "../components/intent/QRScannerIntent.vue";

@Component({
	components: {
		QRScannerIntent,
		QRcode,
		NumberCounter: NumberCounterVue,
		BarcodeScanner: BarcodeScannerVue,
		ViewPager: ViewPagerVue,
		SalesChart: SalesChartVue,
	},
})
export default class Home extends Vue {
	n: string = "25565";

	mounted() {
		setInterval(() => {
			this.n = Math.floor(Math.random() * 65535).toString();
		}, 1000);
	}

	onDecode(decodedString) {
		console.log(decodedString);
	}
}
</script>

<style lang="scss" scoped>
.sitemap {
	max-width: 720px;

	padding: 40px;
	overflow-y: scroll;
}
</style>
