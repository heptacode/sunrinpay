<template>
	<div>
		<div id="firebaseui-auth-container" :class="{ inactive: ifAuth }"></div>
		<div id="loader" :class="{ inactive: ifAuth }">
			<i class="iconify mdi-loading" data-icon="mdi-loading"></i>
		</div>
		<div v-if="ifAuth">
			<img :src="photoURL" width="32px" height="32px" style="border-radius: 50%" />
			<h1>{{ displayName }}</h1>
			<h3>
				{{ email }} <span>{{ emailVerified ? "인증됨" : "미인증" }}</span>
			</h3>
			<button @click="signOut">Sign out</button>
		</div>
	</div>
</template>

<script lang="ts">
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

import { Vue, Component } from "vue-property-decorator";

import { db, log } from "@/DB";

firebase.auth().languageCode = "ko";

@Component({})
export default class Auth extends Vue {
	ifAuth: boolean = false;
	uid: string = "";

	displayName: string = "";
	email: string = "";
	emailVerified: boolean = false;
	photoURL: string = "";

	idToken: string = "";

	mounted() {
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
			signInSuccessUrl: "/auth",
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
				this.ifAuth = true;
				this.uid = user.uid;

				this.displayName = user.displayName!;
				this.email = user.email!;
				this.emailVerified = user.emailVerified;
				this.photoURL = user.photoURL!;

				console.log("LOGIN");

				await user.getIdToken().then(idToken => (this.idToken = idToken));
				// 사용자 문서 존재 여부 확인
				let docExists = await db
					.collection("accounts")
					.doc(user.uid)
					.get()
					.then(doc => {
						return doc.exists;
					});
				if (docExists) {
					// 기존 사용자
					await db
						.collection("accounts")
						.doc(user.uid)
						.update({
							displayName: user.displayName,
							email: user.email,
							emailVerified: user.emailVerified,
							photoURL: user.photoURL,
							providerData: user.providerData,
							idToken: this.idToken,
							lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
						})
						.then(() => console.log("User updated!"))
						.catch(err => {
							log("error", "기존 사용자 문서 업데이트 실패");
							console.log("Error : " + err);
						});
				} else {
					// 신규 사용자
					await db
						.collection("accounts")
						.doc(user.uid)
						.set({
							displayName: user.displayName,
							email: user.email,
							emailVerified: user.emailVerified,
							photoURL: user.photoURL,
							uid: user.uid,
							providerData: user.providerData,
							idToken: this.idToken,
							joinedOn: firebase.firestore.FieldValue.serverTimestamp(),
							lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
							balance: 0,
						})
						.then(() => console.log("User added!"))
						.catch(err => {
							log("error", "신규 사용자 문서 추가 실패");
							console.log("Error : " + err);
						});
				}
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
				this.emailVerified = false;
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
