import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
import "firebase/analytics";

import { db, log, transaction } from "@/DB";

const event = require("vue-analytics").event;

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	// mutations: {
	// event("mutation", "setUserToken", "userToken", state.userToken);
	// },
	actions: {
		async PAY({ commit, state }, data) {
			const doc = db.collection("accounts").doc(firebase.auth().currentUser!.uid);
			const snapshot = await doc.get();
			const newBalance = snapshot.data()!.balance - data.price;
			if (newBalance >= 0) {
				// 결제 가능
				await doc
					.update({ balance: newBalance })
					.then(() => transaction({ price: data.price }))
					.catch(err => log("error", `결제 후 잔고 업데이트 실패 : ${err}`));
				return newBalance;
			} else {
				// 결제 불가
				log("info", `잔액 부족 : ${newBalance * -1}원`);
				return `잔액이 ${newBalance * -1}원 부족합니다.`;
			}
		},
	},
	modules: {},
});
