<template>
	<div>
		<!-- <div id="firebaseui-auth-container" :class="{ inactive: ifAuth }"></div> -->
		<div id="firebaseui-auth-container"></div>
		<div id="loader">
			<i class="iconify mdi-loading" data-icon="mdi-loading"></i>
		</div>
	</div>
</template>

<script lang="ts">
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";

import { Vue, Component, Prop } from "vue-property-decorator";

import { db, log } from "@/DB";
import { signIn } from "@/Auth";

firebase.auth().languageCode = "ko";

@Component({})
export default class Auth extends Vue {
	// uid: string = "";

	// displayName: string = "";
	// email: string = "";
	// emailVerified: boolean = false;
	// photoURL: string = "";

	// idToken: string = "";

	@Prop()
	callUI() {
		const ui = new firebaseui.auth.AuthUI(firebase.auth());
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
			} else {
				await ui.start("#firebaseui-auth-container", uiConfig);
				console.log("Not Signed in");
			}
		});
	}
}
</script>

<style>
@import url("https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css");
.inactive {
	display: none;
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
