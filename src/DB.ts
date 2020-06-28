import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase
	.initializeApp({
		apiKey: process.env.FIREBASE_API_KEY || "AIzaSyC4TcH94TCyNYppi8VadESHta-6u6VTPts",
		authDomain: "sunrinpay.firebaseapp.com",
		databaseURL: "https://sunrinpay.firebaseio.com",
		projectId: "sunrinpay",
		storageBucket: "sunrinpay.appspot.com",
		messagingSenderId: "604565159530",
		appId: "1:604565159530:web:f5a102d54869c502051413",
		measurementId: "G-1ZF3X6NF8V",
	})
	.firestore();
firebase.auth().languageCode = "ko";

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { TimeStamp, GeoPoint } = firebase.firestore;
// export { TimeStamp, GeoPoint };

// if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true });
