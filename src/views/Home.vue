<template>
	<div class="home">
		<div>
			<img
				v-if="!isAuth"
				class="home__logo"
				src="https://firebasestorage.googleapis.com/v0/b/sunrinpay.appspot.com/o/Logo%20%23FFFFFF.svg?alt=media&token=e1058ee5-c956-4499-960c-fd848b551daa"
				alt="SunrinPay Logo"
				width="250px"
				draggable="false"
			/>
			<!-- 로그인 UI -->
			<div id="loader" :class="{ inactive: isAuth }">
				<i class="iconify loading" data-icon="mdi-loading"></i>
			</div>
			<div id="firebaseui-auth-container" :class="{ inactive: isAuth }"></div>

			<!-- isAuth == true -->
			<main v-if="isAuth">
				<div class="home__title">
					<h3>{{ userInformation.displayName }}</h3>
					<img :src="userInformation.photoURL" width="32px" height="32px" draggable="false" @click="isProfileOpen = !isProfileOpen" />
				</div>
				<div v-if="isProfileOpen" class="home__profile">
					<div>
						<img :src="userInformation.photoURL" width="40px" height="40px" draggable="false" />
						<p>
							<span class="email">{{ userInformation.email }}</span>
							<span v-if="1 /*userInformation.emailVerified*/" class="badge-unverified">미인증</span>
						</p>
					</div>
					<button @click="signOut">
						<i class="iconify" data-icon="mdi-close"></i>
						로그아웃
					</button>
				</div>
				<div class="home__account" :class="{ isFlip: isFlip, isFlipReverse: !isFlip }">
					<p class="home__account__info" v-if="!isDelayFlip">
						내 지갑
						<br />1-181-0240
					</p>
					<p class="home__account__qr" v-else>
						<QRcode :data="'https://sunrinpay.web.app/sendmoney#' + userInformation.email" class="qr"></QRcode>
						<!-- <span class="content">
                     <h3>선린인터넷고등학교매점</h3>
                     <p>+821072078667</p>
						</span>-->
					</p>
					<h3 class="home__account__money" v-if="!isDelayFlip">25,565원</h3>
					<p class="home__account__action">
						<router-link :to="{ name: 'sendmoney' }">송금하기</router-link>
						<span v-if="!isFlip" @click="toggleFlip">내 QR 보기</span>
						<span v-else @click="toggleFlip">닫기</span>
					</p>
				</div>
				<div class="home__log">
					<h2>송금 및 결제 내역</h2>
					<ul class="home__log__list">
						<li class="home__log__list__item" v-for="idx in 10" :key="idx">
							<div class="left">
								<h3>선린 인터넷 고등학교 매점</h3>
								<p>철근 530g 외 10개</p>
							</div>
							<div class="right">
								<p class="result">
									-1,800원
									<br />내 지갑(*0240)
								</p>
							</div>
						</li>
					</ul>
				</div>
			</main>
			<!-- /isAuth == true -->

			<section v-else>
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
					<!-- <QRScanner @decode="onDecode"></QRScanner> -->
				</div>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import NumberCounterVue from "vue-roller";
import BarcodeScannerVue from "../components/BarcodeScanner.vue";
import ViewPagerVue from "../components/ViewPager.vue";

import { Vue, Component } from "vue-property-decorator";
import SalesChartVue from "../components/SalesChart.vue";
import QRcode from "../components/QRcode.vue";
import QRScanner from "../components/intent/QRScanner.vue";

import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
firebase.auth().languageCode = "ko";

import { db, log } from "@/DB";
import { signIn, signOut } from "@/Auth";

@Component({
	components: {
		QRScanner,
		QRcode,
		NumberCounter: NumberCounterVue,
		BarcodeScanner: BarcodeScannerVue,
		ViewPager: ViewPagerVue,
		SalesChart: SalesChartVue,
	},
})
export default class Home extends Vue {
	userInformation: Object = {};
	isAuth: boolean = false;
	isProfileOpen: boolean = false;

	isFlip: boolean = false;
	isDelayFlip: boolean = false;
	toggleFlip() {
		this.isFlip = !this.isFlip;
		setTimeout(() => {
			this.isDelayFlip = this.isFlip;
		}, 250);
	}

	n: string = "25565";
	x;
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
				this.isAuth = true;
			} else {
				await ui.start("#firebaseui-auth-container", uiConfig);
				console.log("Not Signed in");
				this.isAuth = false;
			}
		});

		setInterval(() => {
			this.n = Math.floor(Math.random() * 65535).toString();
		}, 1000);
	}
	async signOut() {
		await signOut();
	}
	onDecode(decodedString) {
		console.log(decodedString);
	}
}
</script>

<style lang="scss" scoped>
@import url("https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css");
.home {
	padding: 40px;
	overflow-y: scroll;

	display: flex;
	justify-content: center;
	.inactive {
		display: none;
	}

	.home__logo {
		display: block;
		margin: auto;
	}

	#loader {
		text-align: center;
		.loading {
			font-size: 40px;
			animation: loading 0.5s linear infinite;
		}
		@keyframes loading {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
	}

	main {
		max-width: 500px;
		position: relative;

		.home__title {
			margin-top: 10px;
			margin-bottom: 30px;
			display: flex;
			// align-content: center;
			justify-content: space-between;

			span {
				font-size: $small-normal-size;
			}
			img {
				border-radius: 50%;
				box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);
				cursor: pointer;
				&:hover {
					box-shadow: 0 2px 5px rgba(232, 234, 237, 0.08);
				}
				position: relative;
			}
			.email {
				font-size: 0.7em;
				margin-right: 10px;
			}
			.badge-unverified {
				font-size: 0.6em;
				padding: 2px 5px;
				background-color: #777;
				border-radius: 20px;
			}
		}

		.home__profile {
			position: absolute;
			right: 0;
			margin-top: -20px;
			background: $content-color;
			border-radius: 20px;
			z-index: 10;
			div {
				padding: 20px;
				display: flex;
				align-items: center;
			}
			p {
				margin-left: 20px;
				display: flex;
				flex-direction: column;
				.email {
				}
				.badge-unverified {
				}
			}
			img {
				border-radius: 50%;
			}
			button {
				padding: 10px;
				width: 100%;

				background: none;

				margin-bottom: 20px;

				display: flex;
				align-items: center;
				justify-content: flex-start;

				&:hover {
					background-color: $background-color;

					border-radius: 0;
				}
			}
		}

		.home__account {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 30vh;

			background-color: $primary-color;
			border-radius: 8px;
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

			padding: 25px;

			overflow: hidden;
			color: white;

			.home__account__info {
				height: 1.5em;
				font-size: $small-size;
			}
			.home__account__qr {
				flex: 1;
				overflow: hidden;

				margin-bottom: 20px;

				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.qr {
					height: 100%;
				}
				.content {
					margin-left: 20px;
					h3 {
						font-size: $small-up-size;
					}
				}
			}
			.home__account__money {
				font-size: $normal-size;
				text-align: center;
			}
			.home__account__action {
				height: 1.5em;
				font-size: $small-size;
				text-align: center;

				display: flex;
				justify-content: space-around;
				span {
					cursor: pointer;
				}
			}

			&.isFlip {
				animation: flip 0.5s linear;
			}

			&.isFlipReverse {
				animation: flipReverse 0.5s linear;
			}

			@keyframes flip {
				0% {
					transform: rotateY(0);
					opacity: 1;
				}
				50% {
					transform: rotateY(90deg);
					opacity: 0;
				}
				100% {
					transform: rotateY(0);
					opacity: 1;
				}
			}
			@keyframes flipReverse {
				0% {
					background-color: red !important;
					transform: rotateY(0);
					opacity: 1;
				}
				50% {
					transform: rotateY(-90deg);
					opacity: 0;
				}
				100% {
					transform: rotateY(0);
					opacity: 1;
				}
			}
		}
		.home__log {
			h2 {
				font-size: $small-size;
				opacity: 0.6;
				margin-top: 20px;
				margin-bottom: 15px;
			}
			.home__log__list {
				.home__log__list__item {
					display: flex;
					justify-content: space-between;

					padding: 10px 0;

					border-bottom: 1px solid #fcfeff;
					.left {
						flex: 1;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						h3 {
							font-size: $small-size;
						}
					}
					.right {
						.result {
							display: flex;
							justify-content: flex-end;
							align-items: flex-end;
							text-align: right;
						}
					}
				}
			}
		}
	}
}
</style>
