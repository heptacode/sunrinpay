import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/DB";

const event = require("vue-analytics").event;

Vue.use(Vuex);

// const setTodosRef = firestoreAction(({ bindFirestoreRef, unbindFirestoreRef }, { ref }) => {
// 	// this will unbind any previously bound ref to 'todos'
// 	bindFirestoreRef("todos", ref);
// 	// you can unbind any ref easily
// 	// unbindFirestoreRef("user");
// 	console.log("lorem ipsum");
// });

export default new Vuex.Store({
	state: {
		all: {
			test: "A",
		},
	},
	mutations: vuexfireMutations,
	// mutations: {
	// s	//	event("mutation", "setUserToken", "userToken", state.userToken);
	// },
	actions: {
		bindTodos: firestoreAction(({ bindFirestoreRef }) => {
			return bindFirestoreRef("all", db.collection("all"));
		}),
	},
	modules: {},
});
