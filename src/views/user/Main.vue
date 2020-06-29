<template>
	<div class="main">
		<h2 class="main__title">테스트님, 환영합니다</h2>
		<div class="main__account" :class="{'isRotate':isRotate,'isRotateReverse':!isRotate}">
			<p class="main__account__info" v-if="!isDelayRotate">
				내지갑
				<br />1-181-0240
			</p>
			<p class="main__account__qr" v-else>
				<QRcode data="test" class="qr"></QRcode>
				<span class="content">
					<h3>선린인터넷고등학교매점</h3>
					<p>+821072078667</p>
				</span>
			</p>
			<h3 class="main__account__money" v-if="!isDelayRotate">25,565원</h3>
			<p class="main__account__action" @click="toggleRotate">
				<span>송금하기</span>
				<span>내 QR 확인하기</span>
			</p>
		</div>
		<div class="main__log">
			<h2>송금 및 결제 내역</h2>
			<ul class="main__log__list">
				<li class="main__log__list__item" v-for="idx in 10" :key="idx">
					<div class="left">
						<h3>선린 인터넷 고등학교 매점</h3>
						<p>철근 530g 외 10개</p>
					</div>
					<div class="right">
						<p class="result">
							-1,800원
							<br />내 지갑(*0240)
						</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import QRcode from "../../components/QRcode.vue";

@Component({
	components: {
		QRcode
	}
})
export default class Main extends Vue {
	isRotate: boolean = false;
	isDelayRotate: boolean = false;
	toggleRotate() {
		this.isRotate = !this.isRotate;
		setTimeout(() => {
			this.isDelayRotate = this.isRotate;
		}, 500);
	}
}
</script>

<style lang="scss" scoped>
.main {
	padding: 25px;

	overflow-y: auto;

	.main__title {
		font-size: $small-normal-size;
		margin-top: 10px;
		margin-bottom: 30px;
	}
	.main__account {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 30vh;

		background-color: $primary-color;
		border-radius: 8px;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

		padding: 25px;

		overflow: hidden;

		.main__account__info {
			height: 1.5em;
			font-size: $small-size;
		}
		.main__account__qr {
			flex: 1;
			overflow: hidden;

			margin-bottom: 20px;

			display: flex;
			justify-content: center;
			align-items: center;
			.qr {
				height: 80%;
			}
			.content {
				margin-left: 20px;
				h3 {
					font-size: $small-up-size;
				}
			}
		}
		.main__account__money {
			font-size: $normal-size;
			text-align: center;
		}
		.main__account__action {
			height: 1.5em;
			font-size: $small-size;
			text-align: center;

			display: flex;
			justify-content: space-around;
		}

		&.isRotate {
			animation: rotate 1s linear;
		}

		&.isRotateReverse {
			animation: rotateReverse 1s linear;
		}

		@keyframes rotate {
			0% {
				transform: rotateY(0);
			}
			50% {
				transform: rotateY(90deg);
			}
			100% {
				transform: rotateY(0);
			}
		}
		@keyframes rotateReverse {
			0% {
				background-color: red !important;
				transform: rotateY(0);
			}
			50% {
				transform: rotateY(-90deg);
			}
			100% {
				transform: rotateY(0);
			}
		}
	}
	.main__log {
		h2 {
			font-size: $small-size;
			opacity: 0.6;
			margin-top: 20px;
			margin-bottom: 15px;
		}
		.main__log__list {
			.main__log__list__item {
				display: flex;
				justify-content: space-between;

				padding: 10px 0;

				border-bottom: 1px solid #fcfeff;
				.left {
					flex: 1;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					h3 {
						font-size: $small-size;
					}
				}
				.right {
					.result {
						display: flex;
						justify-content: flex-end;
						align-items: flex-end;
						text-align: right;
					}
				}
			}
		}
	}
}
</style>