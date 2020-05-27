<template>
	<button class="paymentbtn">
		<h2 class="paymentbtn__title">Sunrin Pay 결제</h2>
		<p class="paymentbtn__content">pay 호환</p>
	</button>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PaymentButton extends Vue {}
</script>

<style lang="scss" scoped>
.paymentbtn {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.paymentbtn__title {
		font-size: $normal-size;
		font-weight: bold;
		word-break: keep-all;
	}
	.paymentbtn__content {
		font-size: $small-up-size;
		word-break: keep-all;
	}
}
</style>
