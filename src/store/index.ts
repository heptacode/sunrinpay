import Vue from "vue";
import Vuex from "vuex";

import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/DB";
import { database } from "firebase";

const event = require("vue-analytics").event;

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		accounts: [],
	},
	mutations: { ...vuexfireMutations },
	// mutations: {
	// event("mutation", "setUserToken", "userToken", state.userToken);
	// },
	actions: {
		bindTodos: firestoreAction(async ({ bindFirestoreRef }) => {
			return await bindFirestoreRef("accounts", db.collection("accounts"));
		}),
		unbindCountDocument: firestoreAction(({ unbindFirestoreRef }) => {
			unbindFirestoreRef("accounts");
		}),
		async PAY({ commit, state }, data) {
			let snapshot = await db
				.collection("accounts")
				.where("idToken", "==", data.idToken)
				.get();
			snapshot.forEach(document => {
				let newBalance = document.data().balance - data.price;
				if (newBalance >= 0) {
					// 결제 가능
					db.collection("accounts")
						.doc(document.id)
						.update({ balance: newBalance })
						.catch(() => {
							// 결제 실패
							console.log("오류가 발생했습니다.");
							return false;
						});
					return newBalance;
				} else {
					// 결제 불가
					return `잔액이 ${newBalance * -1}원 부족합니다.`;
				}
			});
			return;
		},
	},
	modules: {},
});
