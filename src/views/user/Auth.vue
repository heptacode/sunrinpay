<template>
	<div>
		<div id="firebaseui-auth-container"></div>
		<button @click="test"></button>
		<input type="text" v-model="t_input" />
	</div>
</template>

<script lang="ts">
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

import { Vue, Component } from "vue-property-decorator";

import { db } from "@/DB";

@Component({
	firestore: {
		documents: db.collection("all"),
	},
})
export default class Auth extends Vue {
	documents: any[] = [];
	uid: string = "";

	mounted() {
		const ui = new firebaseui.auth.AuthUI(firebase.auth());
		const uiConfig = {
			callbacks: {
				signInSuccessWithAuthResult: (authResult, redirectUrl) => {
					// User successfully signed in.
					// Return type determines whether we continue the redirect automatically
					// or whether we leave that to developer to handle.
					return true;
				},
			},
			// signInFlow: "popup",
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
			// Terms of service url.
			// tosUrl: "<your-tos-url>",
			// Privacy policy url.
			// privacyPolicyUrl: "<your-privacy-policy-url>",
		};

		ui.start("#firebaseui-auth-container", uiConfig);

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log("LOGIN : " + user);
				// name = user.displayName;
				// email = user.email;
				// photoUrl = user.photoURL;
				// emailVerified = user.emailVerified;
				this.uid = user.uid;
				db.collection("accounts")
					.doc(this.uid)
					.set(user)
					.then(() => {
						console.log("user updated!");
					});
				console.log("TOKEN : " + user.getIdToken());
			} else {
				console.log("LOGOUT : " + user);
			}
		});
		console.log("docs : " + this.documents);
	}
	test() {
		console.log("docs : " + JSON.stringify(this.documents));
	}
}
</script>

<style>
@import url("https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css");
</style>
