<template>
	<div class="home">
		<h1>Developer page</h1>
		<router-link to="simplemode">simplemode</router-link><br />
		<router-link to="detailsmode">detailsmode</router-link><br />
		<router-link to="payment">payment</router-link><br />
		<router-link to="payment-clear">payment-clear</router-link><br />
		<router-link to="payment-error">payment-error</router-link><br />
		<NumberCounter :number="Number(n)"></NumberCounter>
		<input type="number" v-model="n" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberCounterVue from "../components/NumberCounter.vue";
export default Vue.extend({
	data() {
		return {
			n: 25565,
		};
	},
	components: {
		NumberCounter: NumberCounterVue,
	},
});
</script>

<style lang="scss" scoped></style>
