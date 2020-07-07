import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
firebase.auth().languageCode = "ko";

import { db, log } from "@/DB";

export const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
export const uiConfig = {
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

export async function signIn(user: any): Promise<void> {
	console.log("LOGIN");

	let idToken = await user.getIdToken();
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
				idToken: idToken,
				lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then(() => console.log("User updated!"))
			.catch(err => log("error", `기존 사용자 문서 업데이트 실패 : ${err}`));
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
				idToken: idToken,
				joinedOn: firebase.firestore.FieldValue.serverTimestamp(),
				lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
				balance: 0,
			})
			.then(() => console.log("User added!"))
			.catch(err => log("error", `신규 사용자 문서 추가 실패 : ${err}`));
	}
}

export async function signOut(): Promise<void> {
	firebase
		.auth()
		.signOut()
		.then(() => console.log("Sign out successful."))
		.catch(err => log("error", `로그아웃 실패 : ${err}`));
}
