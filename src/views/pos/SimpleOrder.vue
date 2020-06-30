<template>
	<div class="simplepos">
		<div class="simplepos__content">
			<div class="simplepos__content__total">
				<p>결제 요청 금액</p>
				<h2>
					<NumberCounter :text="getTotal" :isNumberFormat="true" defaultChar="0"></NumberCounter>
				</h2>
			</div>
			<div class="simplepos__content__hr"></div>
			<div class="simplepos__content__numpad">
				<div
					v-for="idx in 9"
					:key="idx"
					class="simplepos__content__numpad__item"
					@click="appendTotalStr(idx)"
				>{{ idx }}</div>
				<div class="simplepos__content__numpad__item"></div>
				<div class="simplepos__content__numpad__item" @click="appendTotalStr(0)">0</div>
				<div class="simplepos__content__numpad__item">
					<i class="iconify" data-icon="mdi-backspace" @click="removeTotalStr"></i>
				</div>
			</div>
		</div>
		<PaymentRequireButton class="simplepos__paymentbtn"></PaymentRequireButton>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PaymentRequireButtonVue from "../../components/PaymentRequireButton.vue";
import NumberCounterVue from "vue-roller";

@Component({
	components: {
		PaymentRequireButton: PaymentRequireButtonVue,
		NumberCounter: NumberCounterVue
	}
})
export default class SimpleOrder extends Vue {
	totalString: string = "";

	get getTotal() {
		return Number(this.totalString);
	}
	appendTotalStr(str: string | number) {
		this.totalString = this.totalString + str;
	}
	removeTotalStr() {
		this.totalString = this.totalString.substring(
			0,
			this.totalString.length - 1
		);
	}
}
</script>

<style lang="scss">
.simplepos {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.simplepos__content__total {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding-bottom: 20px;

		p {
			font-size: $normal-size;
		}
		h2 {
			display: flex;
			align-items: center;
			font-size: $large-size;
		}
	}
	.simplepos__content__hr {
		width: 90%;
		height: 1px;

		background-color: $text-color;
		margin: 0 auto;
	}
	.simplepos__content {
		padding: 50px 60px;
		width: 100%;
		max-width: 50%;
		background-color: $content-color;
		border-radius: 24px;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	}
	.simplepos__content__numpad {
		width: 100%;
		max-width: 50%;

		margin: 0 auto;
		margin-top: 40px;

		display: flex;
		flex-wrap: wrap;

		.simplepos__content__numpad__item {
			flex: 1 33%;
			width: 1.5em;
			height: 1.5em;

			display: flex;
			justify-content: center;
			align-items: center;

			font-size: $large-size;
			i {
				font-size: 0.7em;
				color: $gray-text-color;
			}
		}
	}
	.simplepos__paymentbtn {
		margin-top: 30px;

        width: 50vw;
	}
}
</style>
