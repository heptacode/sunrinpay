<template>
	<div class="home">
		<div>
			<img
				class="main-logo"
				src="https://firebasestorage.googleapis.com/v0/b/sunrinpay.appspot.com/o/Logo%20Dark.svg?alt=media&token=efbdb91a-392e-40ce-85a9-479614eb2fb8"
				alt="SunrinPay Logo"
				width="200px"
				draggable="false"
			/>
			<!-- 로그인 UI -->
			<div id="loader" :class="{ inactive: ifAuth }">
				<i class="iconify mdi-loading" data-icon="mdi-loading"></i>
			</div>
			<div id="firebaseui-auth-container" :class="{ inactive: ifAuth }"></div>

			<div v-if="ifAuth">
				<img :src="userInformation.photoURL" width="32px" height="32px" style="border-radius: 50%" />
				<h1>{{ userInformation.displayName }}</h1>
				<h6>
					{{ userInformation.email }} <span>{{ userInformation.emailVerified ? "인증됨" : "미인증" }}</span>
				</h6>
				<button @click="signOut">Sign out</button>
			</div>

			<br />
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
				<li>
					<router-link :to="{ name: 'simpleorder' }">simpleorder</router-link>
				</li>
			</ul>
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
import NumberCounterVue from "vue-roller";
import BarcodeScannerVue from "../components/BarcodeScanner.vue";
import ViewPagerVue from "../components/ViewPager.vue";

import { Vue, Component } from "vue-property-decorator";
import SalesChartVue from "../components/SalesChart.vue";

import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
firebase.auth().languageCode = "ko";

import { db, log } from "@/DB";
import { signIn, signOut } from "@/Auth";

@Component({
	components: {
		NumberCounter: NumberCounterVue,
		BarcodeScanner: BarcodeScannerVue,
		ViewPager: ViewPagerVue,
		SalesChart: SalesChartVue,
	},
})
export default class Home extends Vue {
	ifAuth: boolean = false;
	userInformation: Object = {};

	n: string = "25565";
	mounted() {
		// const ui = new firebaseui.auth.AuthUI(firebase.auth());
		const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
		const uiConfig = {
			callbacks: {
				signInSuccessWithAuthResult: (authResult, redirectUrl) => {
					//
					return true;
				},
				uiShown: () => {
					// The widget is rendered.
					// Hide the loader.
					document.getElementById("loader")!.style.display = "none";
				},
			},
			signInSuccessUrl: "/",
			signInOptions: [
				{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					requireDisplayName: false,
				},
				{
					provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
					recaptchaParameters: {
						size: "invisible",
						badge: "bottomright",
					},
					defaultCountry: "KR",
				},
				{
					provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					clientId: "604565159530-tf5rvkljdec8n0o83lj2hjba53831q6i.apps.googleusercontent.com",
				},
				firebase.auth.FacebookAuthProvider.PROVIDER_ID,
				firebase.auth.TwitterAuthProvider.PROVIDER_ID,
				firebase.auth.GithubAuthProvider.PROVIDER_ID,
				"apple.com",
				"microsoft.com",
			],
			credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
			tosUrl: "https://sunrinpay.web.app/privacy",
			privacyPolicyUrl: "https://sunrinpay.web.app/privacy",
		};
		ui.disableAutoSignIn();

		firebase.auth().onAuthStateChanged(async user => {
			if (user) {
				await signIn(user);
				this.userInformation = user;
				this.ifAuth = true;
			} else {
				await ui.start("#firebaseui-auth-container", uiConfig);
				console.log("Not Signed in");
				this.ifAuth = false;
			}
		});

		setInterval(() => {
			this.n = Math.floor(Math.random() * 65535).toString();
		}, 1000);
	}
	async signOut() {
		await signOut();
	}
}
</script>

<style lang="scss" scoped>
@import url("https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css");
.home {
	padding: 40px;
	overflow: scroll;
}

.main-logo {
	display: block;
	margin: auto;
}

.inactive {
	display: none;
}

#loader {
	text-align: center;
}
.mdi-loading {
	font-size: 40px;
	animation: rotate 0.6s linear infinite;
}
@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
