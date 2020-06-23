<template>
	<div>
		<div id="firebaseui-auth-container"></div>
		<button @click="test">test</button>
		<button @click="signOut">Sign out</button>
	</div>
</template>

<script lang="ts">
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

import { Vue, Component } from "vue-property-decorator";

import { db } from "@/DB";

@Component({
	firestore: {
		documents: db.collection("accounts"),
	},
})
export default class Auth extends Vue {
	documents: any[] = [];
	uid: string = "";
	idToken: string = "";

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
			privacyPolicyUrl: "https://sunrinpay.web.app/privacy",
		};

		ui.start("#firebaseui-auth-container", uiConfig);

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log("LOGIN : %O", user);
				// name = user.displayName;
				// email = user.email;
				// photoUrl = user.photoURL;
				// emailVerified = user.emailVerified;
				this.uid = user.uid;
				user.getIdToken().then(idToken => console.log("TOKEN : " + idToken));

				console.log("uid : " + this.uid);
				let userData = {
					displayName: user.displayName,
					email: user.email,
					emailVerified: user.emailVerified,
					photoURL: user.photoURL,
					isAnonymous: user.isAnonymous,
					uid: user.uid,
					providerData: user.providerData,
				};
				db.collection("accounts")
					.doc(user.uid)
					.set(userData)
					.then(() => console.log("User updated!"))
					.catch(err => console.log("Error : " + err));
			} else {
				console.log("Not Signed in");
			}
		});
	}
	signOut() {
		firebase
			.auth()
			.signOut()
			.then(() => console.log("Sign out successful."))
			.catch(err => console.log("Error : " + err));
	}
	test() {
		console.log("docs : " + JSON.stringify(this.documents));
	}
}
</script>

<style>
@import url("https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css");
</style>
