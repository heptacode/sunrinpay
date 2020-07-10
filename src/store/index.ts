import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/analytics";
import axios from "axios";

import { db, log, transaction } from "@/DB";

const event = require("vue-analytics").event;

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		balance: 0 as number,
	},
	mutations: {},
	actions: {
		async GET_BALANCE({ commit, state }, data): Promise<boolean | number> {
			event("action", "GET_BALANCE", "getBalance", data);
			try {
				const docRef = await db.collection("accounts").doc(firebase.auth().currentUser!.uid);

				let snapshot = await docRef.get();
				state.balance = snapshot.data()!.balance;
				return state.balance;
			} catch (err) {
				log("error", `CREATE_ORDER : ${err}`);
				return false;
			}
		},
		async SEND_MONEY({ commit, state }, data): Promise<boolean | string> {
			event("action", "SEND_MONEY", "sendMoney", data);
			const docRef = await db.collection("accounts").doc(firebase.auth().currentUser!.uid);

			try {
				// 보내는 사람 도큐먼트 가져오기
				let snapshot = await docRef.get();

				// state 잔액 갱신
				state.balance = snapshot.data()!.balance;
				if (state.balance - data.amount > 0) return `잔액이 ${Math.abs(state.balance - data.amount)}원 부족합니다.`;

				// 보내는 사람 잔액 차감
				await docRef.update({
					balance: state.balance - data.amount,
				});

				// 받는 사람 도큐멘트의 uid 조회
				let query = await db
					.collection("accounts")
					.where("email", "==", data.recipient)
					.get();

				// 받는 사람  도큐먼트 가져오기
				let recipientDocRef = await db.collection("accounts").doc(query[0].doc.id);
				let recipientSnapshot = await recipientDocRef.get();

				// 받는 사람 잔액 조회
				recipientSnapshot.data()!.balance;

				// 받는 사람 잔액 추가
				await recipientDocRef.update({
					balance: recipientSnapshot.data()!.balance + data.amount,
				});

				// state 잔액 갱신
				snapshot = await docRef.get();
				state.balance = snapshot.data()!.balance;

				return true;
			} catch (err) {
				log("error", `SEND_MONEY : ${err}`);
				return false;
			}
		},
		async CREATE_ORDER({ commit, state }, data): Promise<boolean> {
			event("action", "CREATE_ORDER", "createOrder", data);
			try {
				await db
					.collection("orders")
					.doc(data.orderID)
					.set({ id: data.orderID, itemList: data.itemList });
				return true;
			} catch (err) {
				log("error", `CREATE_ORDER : ${err}`);
				return false;
			}
		},
		async CHECKOUT({ commit, state }, data): Promise<boolean | string> {
			event("action", "CHECKOUT", "checkout", data);
			const docRef = await db.collection("accounts").doc(firebase.auth().currentUser!.uid);

			let snapshot = await docRef.get();
			const newBalance = snapshot.data()!.balance - data.price;
			if (newBalance >= 0) {
				// 결제 가능
				try {
					await docRef.update({ balance: newBalance });
					await transaction({ price: data.price });
					return true;
				} catch (err) {
					log("error", `결제 후 잔고 업데이트 실패 : ${err}`);
					return false;
				}
			} else {
				// 결제 불가
				log("info", `잔액 부족 : ${Math.abs(newBalance)}원`);
				return `잔액이 ${Math.abs(newBalance)}원 부족합니다.`;
			}
		},
		async CHECKOUT_KAKAOPAY({ commit, state }, data) {
			event("action", "CHECKOUT_KAKAOPAY", "checkout_kakaopay", data);
			try {
				let result = await axios.post("https://kl9h2eg0hk.execute-api.ap-northeast-2.amazonaws.com/default/relayPayment", {
					item_name: data.item_name,
					quantity: data.quantity,
					total_amount: data.total_amount,
					vat_amount: data.vat_amount,
					tax_free_amount: data.tax_free_amount,
				});
				return result.data;
			} catch (err) {
				return console.dir(err);
			}
		},
	},
	modules: {},
});
