<template>
	<div class="receipt">
		<div class="receipt__wrap">
			<div class="receipt__title">
				<img src="../../assets/Sunrin Pay Logo.svg" class="receipt__title__image" />
				<div>
					<h1>선린인터넷고등학교 매점</h1>
					<p>서울특별시 뭐시기</p>
					<p>사업자 123456789</p>
				</div>
			</div>
			<hr />
			<div class="receipt__list">
				<div class="receipt__list__item" v-for="item in list" :key="item.name">
					<div>
						<p>{{item.name}}</p>
						<p>123456789</p>
					</div>
					<div class="quantity">
						<p>X{{item.quantity}}</p>
						<p v-if="item.discount">할인 적용</p>
					</div>
					<div>
						<p class="line" v-if="item.discount">{{item.quantity * item.price}}</p>
						<p>{{(item.quantity * item.price)*((100-item.discount)/100)}}</p>
					</div>
				</div>
			</div>
			<div class="receipt__total">
				<h3>결제 금액</h3>
				<p>10,000</p>
			</div>
			<hr />
			<div class="receipt__result">
				<p>
					<img src="../../assets/Sunrin Pay Logo.svg" /> 결제 내역
				</p>
				<p>
					Andy0414(pjh8667@gmail.com)
					<br />Sunrin Pay 지갑으로 대금 지불
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import QRcode from "../components/QRcode.vue";
import NumberCounterVue from "vue-roller";

import { Vue, Component } from "vue-property-decorator";

@Component
export default class Receipt extends Vue {
	list = [
		{ name: "할인가", price: 10000, discount: 10, quantity: 3 },
		{ name: "정가", price: 10000, discount: 0, quantity: 3 }
	];
}
</script>

<style lang="scss" scoped>
.receipt {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	background-color: $content-color;

	display: flex;
	justify-content: center;
	.receipt__wrap {
		width: 100%;
		max-width: 720px;
	}
	.receipt__title {
		display: flex;
		.receipt__title__image {
			width: 100px;
			margin-right: 20px;
		}
		div {
			padding: 20px;
			h1 {
				font-size: $small-normal-size;
			}
		}
	}
	.receipt__list {
		display: flex;
		flex-direction: column;

		width: 100%;
		.receipt__list__item {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin-top: 20px;

			div {
				display: flex;
				flex-direction: column;
			}
			div:nth-child(2),
			div:nth-child(3) {
				text-align: right;

				p {
					display: flex;
					align-items: center;
					justify-content: flex-end;

					height: 100%;
					&.line {
						text-decoration: line-through;
					}
				}

				p:nth-child(2) {
					font-weight: bold;
				}
			}
			.quantity p {
				display: flex;
				justify-content: center !important;
			}
		}
	}
	.receipt__total {
		padding: 30px 0;
		display: flex;
		justify-content: space-between;

		font-weight: bold;
		h3 {
			font-size: $small-up-size;
		}
		p {
			font-size: $small-up-size;
		}
	}
	.receipt__result {
		margin-top: 10px;
		p:nth-child(1) {
			padding: 20px 0;
			img {
				height: 1.5em;
			}
			display: flex;
			align-items: center;
		}
	}
}
</style>
