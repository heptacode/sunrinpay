import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/analytics";
import axios from "axios";

import { db, log, transaction } from "@/DB";
import { query } from "vue-analytics";

const event = require("vue-analytics").event;

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		balance: 0 as number,
		transactions: [] as any,
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
		async GET_TRANSACTIONS({ commit, state }, data): Promise<any> {
			event("action", "GET_TRANSACTIONS", "getTransactions", data);
			try {
				let querySnapshot = await db
					.collection("transactions")
					.where("uid", "==", firebase.auth().currentUser!.uid)
					.get();
				state.transactions = [];
				querySnapshot.forEach((doc) => {
					state.transactions.push(doc.data());
					// console.log(doc.id, ": ", doc.data().timestamp.seconds);
				});
				// console.log(state.transactions[0].type);
				return true;
			} catch (err) {
				await log("error", `GET_TRANSACTIONS : ${err}`);
				return false;
			}
		},
		async SEND_MONEY({ commit, state }, data): Promise<string> {
			event("action", "SEND_MONEY", "sendMoney", data);
			if (firebase.auth().currentUser!.email == data.recipient) return "본인에게 송금할 수 없습니다.";
			const docRef = await db.collection("accounts").doc(firebase.auth().currentUser!.uid);
			try {
				// 받는 사람 도큐먼트의 uid 조회
				let recipientQuerySnapshot = await db
					.collection("accounts")
					.where("email", "==", data.recipient)
					.get();
				if (!recipientQuerySnapshot.docs[0]) return "계정이 존재하지 않습니다.";

				// 보내는 사람 도큐먼트 가져오기
				let snapshot = await docRef.get();

				if (snapshot.data()!.balance - data.amount < 0) return `잔액이 ${Math.abs(snapshot.data()!.balance - data.amount)}원 부족합니다.`;

				// 보내는 사람 잔액 차감
				await docRef.update({
					balance: snapshot.data()!.balance - data.amount,
				});

				// 받는 사람  도큐먼트 가져오기
				let recipientDocRef = await db.collection("accounts").doc(recipientQuerySnapshot.docs[0].id);
				let recipientSnapshot = await recipientDocRef.get();

				// 받는 사람 잔액 증감
				await recipientDocRef.update({
					balance: recipientSnapshot.data()!.balance + data.amount,
				});

				// state 잔액 갱신
				snapshot = await docRef.get();
				state.balance = snapshot.data()!.balance;

				return `${data.recipient}님에게 ${data.amount}원을 보냈습니다.`;
			} catch (err) {
				log("error", `SEND_MONEY : ${err}`);
				return "오류가 발생하였습니다.";
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
				await log("error", `CREATE_ORDER : ${err}`);
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
					await transaction({
						type: "일반 결제",
						data: data.transactionData,
						totalPrice: data.totalPrice,
					});
					return true;
				} catch (err) {
					await log("error", `결제 후 잔고 업데이트 실패 : ${err}`);
					return false;
				}
			} else {
				// 결제 불가
				await log("info", `잔액 부족 : ${Math.abs(newBalance)}원`);
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
				if (result) {
					await transaction({
						type: "카카오페이 결제",
						data: data.transactionData,
						totalPrice: data.totalPrice,
					});
				}
				return result.data;
			} catch (err) {
				return console.dir(err);
			}
		},
		// FIXME: data.email 사용
		async CHARGE({ commit, state }, data): Promise<boolean> {
			event("action", "CHARGE", "charge", data);
			const docRef = await db.collection("accounts").doc(firebase.auth().currentUser!.uid);

			let snapshot = await docRef.get();
			const newBalance = snapshot.data()!.balance + data.price;

			try {
				await docRef.update({ balance: newBalance });
				await transaction({
					data: "충전",
					totalPrice: data.totalPrice,
				});
				return true;
			} catch (err) {
				await log("error", `충전 실패 : ${err}`);
				return false;
			}
		},
	},
	modules: {},
});
