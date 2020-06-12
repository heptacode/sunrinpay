import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/DB";

const event = require("vue-analytics").event;

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {
		// event("mutation", "setUserToken", "userToken", state.userToken);
	},
	actions: {},
	modules: {},
});
