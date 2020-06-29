<template>
	<div class="home">
		<div>
			<div v-if="ifAuth">
				<img :src="photoURL" width="32px" height="32px" style="border-radius: 50%" />
				<h1>{{ displayName }}</h1>
				<h3>
					{{ email }} <span>{{ emailVerified ? "인증됨" : "미인증" }}</span>
				</h3>
				<button @click="signOut">Sign out</button>
			</div>
			<div v-else>
				<Auth></Auth>
				<button @click="callUI">로그인</button>
				<!-- <button @click="$router.push({ name: 'auth' })">로그인</button> -->
			</div>

			<br />
			<br />
			<h2>Routers</h2>
			<router-link :to="{ name: 'pos' }">pos</router-link>
			<br />
			<router-link :to="{ name: 'console' }">console</router-link>
			<br />
			<br />
			<router-link :to="{ name: 'simplemode' }">simplemode</router-link>
			<br />
			<router-link :to="{ name: 'detailsmode' }">detailsmode</router-link>
			<br />
			<router-link :to="{ name: 'payment' }">payment</router-link>
			<br />
			<router-link :to="{ name: 'payment-clear' }">payment-clear</router-link>
			<br />
			<router-link :to="{ name: 'payment-error' }">payment-error</router-link>
			<br />
			<br />
			<router-link :to="{ name: 'simple-payment' }">simple-payment</router-link>
			<br />
			<router-link :to="{ name: 'details-payment' }">details-payment</router-link>
			<br />
			<router-link :to="{ name: 'main' }">main</router-link>
		</div>
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
	</div>
</template>

<script lang="ts">
import AuthVue from "../components/Auth.vue";
import NumberCounterVue from "vue-roller";
import BarcodeScannerVue from "../components/BarcodeScanner.vue";
import ViewPagerVue from "../components/ViewPager.vue";

import { Vue, Component } from "vue-property-decorator";
import SalesChartVue from "../components/SalesChart.vue";

import firebase from "firebase/app";
import "firebase/auth";

import { db, log } from "@/DB";
import { signOut } from "@/Auth";

@Component({
	components: {
		Auth: AuthVue,
		NumberCounter: NumberCounterVue,
		BarcodeScanner: BarcodeScannerVue,
		ViewPager: ViewPagerVue,
		SalesChart: SalesChartVue,
	},
})
export default class Home extends Vue {
	ifAuth: boolean = firebase.auth().currentUser! ? true : false;

	n: string = "25565";
	mounted() {
		setInterval(() => {
			this.n = Math.floor(Math.random() * 65535).toString();
		}, 1000);
	}
}
</script>

<style lang="scss" scoped>
.home {
	padding: 40px;
	overflow: scroll;
}
</style>
