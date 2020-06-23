<template>
	<div>
		<div :class="{ inactive: ifAuth }" id="firebaseui-auth-container"></div>
		<div v-if="ifAuth">
			<img :src="photoURL" width="32px" height="32px" style="border-radius: 50%" />
			<h1>{{ displayName }}</h1>
			<h3>
				{{ email }} <span>{{ emailVerified ? "인증됨" : "미인증" }}</span>
			</h3>
			{{ isAnonymous }}
			<button @click="signOut">Sign out</button>
		</div>
	</div>
</template>

<script lang="ts">
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

import { Vue, Component } from "vue-property-decorator";

import { db } from "@/DB";

@Component({})
export default class Auth extends Vue {
	ifAuth: boolean = false;
	uid: string = "";

	displayName: string = "";
	email: string = "";
	emailVerified: boolean = false;
	photoURL: string = "";
	isAnonymous: boolean = false;

	idToken: string = "";

	mounted() {
		const ui = new firebaseui.auth.AuthUI(firebase.auth());
		const uiConfig = {
			callbacks: {
				signInSuccessWithAuthResult: (authResult, redirectUrl) => {
					//
					return true;
				},
			},
			signInSuccessUrl: "/auth",
			signInOptions: [
				{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					requireDisplayName: false,
				},
				{
					provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
					defaultCountry: "KR",
				},
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebase.auth.FacebookAuthProvider.PROVIDER_ID,
				firebase.auth.TwitterAuthProvider.PROVIDER_ID,
				firebase.auth.GithubAuthProvider.PROVIDER_ID,
				"apple.com",
				"microsoft.com",
			],
			tosUrl: "https://sunrinpay.web.app/privacy",
			privacyPolicyUrl: "https://sunrinpay.web.app/privacy",
		};

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.ifAuth = true;
				this.uid = user.uid;

				this.displayName = user.displayName!;
				this.email = user.email!;
				this.emailVerified = user.emailVerified;
				this.photoURL = user.photoURL!;
				this.isAnonymous = user.isAnonymous;

				console.log("LOGIN");

				(async () => {
					await user.getIdToken().then(idToken => (this.idToken = idToken));
					let userData = {
						displayName: user.displayName,
						email: user.email,
						emailVerified: user.emailVerified,
						photoURL: user.photoURL,
						isAnonymous: user.isAnonymous,
						uid: user.uid,
						providerData: user.providerData,
						idToken: this.idToken,
					};
					await db
						.collection("accounts")
						.doc(user.uid)
						.set(userData)
						.then(() => console.log("User updated!"))
						.catch(err => console.log("Error : " + err));
				})();
			} else {
				ui.start("#firebaseui-auth-container", uiConfig);
				console.log("Not Signed in");
			}
		});
	}
	signOut() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.ifAuth = false;
				this.emailVerified = this.isAnonymous = false;
				this.uid = this.displayName = this.email = this.photoURL = this.idToken = "";
				console.log("Sign out successful.");
			})
			.catch(err => console.log("Error : " + err));
	}
}
</script>

<style>
@import url("https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css");
.inactive {
	display: none;
}
</style>
