<template>
	<div>
		<div id="firebaseui-auth-container"></div>
	</div>
</template>

<script lang="ts">
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

import { Vue, Component } from "vue-property-decorator";

import { db } from "@/DB";

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true;
		},
	},
	// signInFlow: "popup",
	signInSuccessUrl: "/",
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
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

@Component
export default class Auth extends Vue {
	mounted() {
		ui.start("#firebaseui-auth-container", uiConfig);
		firebase.auth().onAuthStateChanged(user => {
			console.log(user);
		});
		this.$store.dispatch("bindTodos", db.collection("all"));
	}
}
</script>

<style>
@import url("https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css");
</style>
