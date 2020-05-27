<template>
	<div class="simplemode">
		<div class="simplemode__content">
			<p>결제하실 금액</p>
			<h2>
				<NumberCounter :number="25565"></NumberCounter>원
			</h2>
		</div>
		<div class="simplemode__content2">
			<p>어떤 수단을 이용하시겠어요?</p>
		</div>
		<div class="simplemode__actions">
			<PaymentButton class="simplemode__actions__btn"></PaymentButton>
			<CashButton class="simplemode__actions__btn"></CashButton>
		</div>
	</div>
</template>

<script lang="ts">
import PaymentButtonVue from "@/components/PaymentButton.vue";
import CashButtonVue from "@/components/CashButton.vue";
import NumberCounterVue from "@/components/NumberCounter.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {
		PaymentButton: PaymentButtonVue,
		CashButton: CashButtonVue,
		NumberCounter: NumberCounterVue
	}
})
export default class SimpleMode extends Vue {}
</script>

<style lang="scss" scoped>
.simplemode {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	.simplemode__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		p {
			font-size: $normal-size;
		}
		h2 {
			display: flex;
			align-items: center;
			font-size: $large-size;
		}
	}
	.simplemode__content2 {
		font-size: $normal-size;
	}
	.simplemode__actions {
		width: 90%;
		height: 300px;
		display: flex;

		margin-bottom: 50px;
		.simplemode__actions__btn {
			flex: 1;
			height: auto;
			margin: 0 40px;
		}
	}
}
@media all and (max-aspect-ratio: 1/1) {
	.simplemode {
		.simplemode__content {
			margin-top: 10%;
		}
		.simplemode__content2 {
			display: none;
		}
		.simplemode__actions {
			height: auto;
			flex-direction: column-reverse;

			margin-bottom: 30px;
			font-size: 0.9rem;
			.simplemode__actions__btn {
				height: 200px;
				margin: 0 20px;
				margin-top: 30px;
			}
		}
	}
}
</style>
