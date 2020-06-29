import firebase from "firebase/app";
import "firebase/auth";

import { db, log } from "@/DB";

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
