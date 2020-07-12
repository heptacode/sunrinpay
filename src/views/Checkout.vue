<template>
	<div class="detailsmode">
		<div class="detailsmode__content">
			<ul class="detailsmode__content__prices">
				<div class="detailsmode__content__prices__item">
					<p>금액</p>
					<h2><NumberCounter text="12900" :isNumberFormat="true" defaultChar="0"></NumberCounter>원</h2>
				</div>
				<div class="detailsmode__content__prices__item">
					<p>할인된 금액</p>
					<h2><NumberCounter text="900" :isNumberFormat="true" defaultChar="0"></NumberCounter>원</h2>
				</div>
				<div class="detailsmode__content__prices__item total">
					<p>결제하실 금액</p>
					<h2><NumberCounter text="12000" :isNumberFormat="true" defaultChar="0"></NumberCounter>원</h2>
				</div>
			</ul>
			<ul class="detailsmode__content__list">
				<li class="detailsmode__content__list__item" v-for="idx in 10" :key="idx">
					<p class="name">(빙그레)메로나메론맛</p>
					<p class="count">×1</p>
					<p class="price">14,700원</p>
				</li>
			</ul>
		</div>
		<div class="detailsmode__actions">
			<PaymentButton class="detailsmode__actions__btn" paymentName="Kakao Pay" @click="checkoutWithKakaoPay"></PaymentButton>
			<PaymentButton class="detailsmode__actions__btn"></PaymentButton>
		</div>
	</div>
</template>

<script lang="ts">
import PaymentButton from "@/components/PaymentButton.vue";
import CashButton from "@/components/CashButton.vue";
import NumberCounter from "vue-roller";

import { Vue, Component } from "vue-property-decorator";

import isMobile from "@/lib/isMobile";

@Component({
	components: {
		PaymentButton,
		CashButton,
		NumberCounter,
	},
})
export default class Checkout extends Vue {
	async checkoutWithKakaoPay() {
		let res = await this.$store.dispatch("CHECKOUT_KAKAOPAY", {
			item_name: "초코파이",
			quantity: 1,
			total_amount: 2200,
			vat_amount: 0,
			tax_free_amount: 0,
			price: 1000,
		});
		if (isMobile()) {
			// 모바일
			window.open(res.next_redirect_mobile_url);
		} else {
			window.open(res.next_redirect_pc_url);
		}
	}
}
</script>

<style lang="scss" scoped>
.detailsmode {
	padding: 80px;
	display: flex;
	flex-direction: column;

	.detailsmode__content {
		flex: 1;
		display: flex;

		overflow-y: hidden;
		.detailsmode__content__prices {
			flex: 3;

			position: relative;

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			&::after {
				content: "";
				position: absolute;
				right: 0;
				top: 5%;

				width: 1px;
				height: 90%;

				background-color: $gray-text-color;
			}
			.detailsmode__content__prices__item {
				color: $gray-text-color;
				p {
					font-size: $small-normal-size;
				}
				h2 {
					display: flex;
					align-items: center;
					font-size: $small-large-size;
				}
			}
			.detailsmode__content__prices__item.total {
				color: $text-color;
				p {
					font-size: $normal-size;
				}
				h2 {
					font-size: $large-size;
				}
			}
		}
		.detailsmode__content__list {
			flex: 7;
			margin-left: 20px;
			overflow-y: scroll;
			.detailsmode__content__list__item {
				font-size: $small-normal-size;
				width: 100%;

				padding: 10px;

				display: flex;
				justify-content: space-between;

				.name {
					flex: 5;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.count {
					flex: 1;
				}
				.price {
					flex: 4;
					text-align: right;
				}
				&:hover {
					background-color: $select-color;
				}
			}
		}
	}
	.detailsmode__actions {
		display: flex;
		height: 160px;

		margin-top: 80px;
		.detailsmode__actions__btn {
			flex: 1;
			height: 100%;
			&:nth-child(1) {
				margin-right: 100px;
			}
		}
	}
}
@media all and (max-aspect-ratio: 4/3) {
	.detailsmode {
		padding: 60px;
		.detailsmode__content {
			.detailsmode__content__prices {
				flex: 5;
			}
			.detailsmode__content__list {
				flex: 5;
				.detailsmode__content__list__item {
					font-size: 1rem;
				}
			}
		}
		.detailsmode__actions {
			font-size: 0.9rem;
			.detailsmode__actions__btn {
				&:nth-child(1) {
					margin-right: 20px;
				}
			}
		}
	}
}

@media all and (max-aspect-ratio: 1/1) {
	.detailsmode {
		.detailsmode__content {
			flex-direction: column-reverse;
			.detailsmode__content__prices {
				flex: 1;

				align-items: center;

				flex-direction: row;
				flex-wrap: wrap;

				&::after {
					display: none;
				}
				.detailsmode__content__prices__item {
					display: none;
				}
				.detailsmode__content__prices__item.total {
					display: flex;
					justify-content: space-between;
					align-items: center;
					p {
						font-size: $small-size;
					}
					h2 {
						font-size: $small-normal-size;
					}
					width: 100%;
					text-align: center;
				}
			}
			.detailsmode__content__list {
				margin-left: 0;
				margin-bottom: 20px;
			}
		}
		.detailsmode__actions {
			font-size: 0.75rem;
			.detailsmode__actions__btn {
				&:nth-child(1) {
					margin-right: 30px;
				}
			}
		}
	}
}
@media all and (max-aspect-ratio: 3/4) {
	.detailsmode {
		.detailsmode__actions {
			height: auto;
			flex-direction: column-reverse;
			margin-top: 30px;
			.detailsmode__actions__btn {
				padding: 10px 0;
				&:nth-child(1) {
					margin-right: 0;
					margin-top: 30px;
				}
			}
		}
	}
}
</style>
