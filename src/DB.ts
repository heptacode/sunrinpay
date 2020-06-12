import firebase from "firebase/app";
import "firebase/firestore";

import credentials from "@/../credentials";

export const db = firebase.initializeApp(credentials.firebaseConfig).firestore();
firebase.auth().languageCode = "ko";

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { TimeStamp, GeoPoint } = firebase.firestore;
// export { TimeStamp, GeoPoint };

// if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true });
