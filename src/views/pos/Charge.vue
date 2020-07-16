<template>
	<div class="charge">
		<form action="javascript:void(0)" @submit="chargeMoney">
			<input type="text" placeholder="email" v-model="email" :disabled="isLoading" />
			<input type="text" placeholder="money" v-model="money" :disabled="isLoading" />
			<button type="submit" :disabled="isLoading">충전</button>
		</form>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class Charge extends Vue {
	email: string = "";
	money: string = "";
	isLoading: boolean = false;

	async chargeMoney() {
		this.isLoading = true;
		try {
			await this.$store.dispatch("CHARGE", {
				email: this.email,
				price: this.money
			});
		} catch (err) {}
		this.isLoading = false;
	}
}
</script>

<style lang="scss" scoped>
.charge {
	max-width: 480px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	form {
		text-align: center;
	}
	input {
		margin-bottom: 20px;
	}
}
</style>
