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
		async GET_BALANCE({ commit, state }, data) {
			event("action", "GET_BALANCE", "getBalance", data);
			try {
				let doc = await db
					.collection("accounts")
					.doc(firebase.auth().currentUser!.uid)
					.get();
				state.balance = doc.data()!.balance;
				return state.balance;
			} catch (err) {
				log("error", `CREATE_ORDER : ${err}`);
				return false;
			}
		},
		async CREATE_ORDER({ commit, state }, data) {
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
		async CHECKOUT({ commit, state }, data) {
			event("action", "CHECKOUT", "checkout", data);
			let doc = db.collection("accounts").doc(firebase.auth().currentUser!.uid);
			let snapshot = await doc.get();
			const newBalance = snapshot.data()!.balance - data.price;
			if (newBalance >= 0) {
				// 결제 가능
				try {
					await doc.update({ balance: newBalance }).then(() => transaction({ price: data.price }));
					return newBalance;
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
			return await axios.post(
				"https://kapi.kakao.com/v1/payment/ready",
				{
					cid: "TC0ONETIME",
					partner_order_id: 1,
					partner_user_id: 1,
					item_name: data.item_name,
					quantity: data.quantity,
					total_amount: data.total_amount,
					vat_amount: data.vat_amount,
					tax_free_amount: data.tax_free_amount,
					approval_url: "https://sunrinpay.web.app/",
					fail_url: "https://sunrinpay.web.app/",
					cancel_url: "https://sunrinpay.web.app/",
				},
				{
					headers: {
						Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_ADMIN_KEY}`,
						"Content-type": "application/x-www-form-urlencoded;charset=utf-8",
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
		},
	},
	modules: {},
});
