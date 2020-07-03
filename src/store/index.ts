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
	actions: {
		async CREATE_ORDER({ commit, state }, data) {
			event("action", "CREATE_ORDER", "createOrder", data);
		},
		async CHECKOUT({ commit, state }, data) {
			event("action", "CHECKOUT", "checkout", data);
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
				log("info", `잔액 부족 : ${Math.abs(newBalance)}원`);
				return `잔액이 ${Math.abs(newBalance)}원 부족합니다.`;
			}
		},
	},
	modules: {},
});
