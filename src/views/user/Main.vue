<template>
	<div class="main">
		<h2 class="main__title">테스트님, 환영합니다</h2>
		<div class="main__account">
			<p class="main__account__info">
				내지갑
				<br />1-181-0240
			</p>
			<h3 class="main__account__money">25,565원</h3>
			<p class="main__account__action">송금하기</p>
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
@Component
export default class Main extends Vue {}
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

		.main__account__info {
			height: 1.5em;
			font-size: $small-size;
		}
		.main__account__money {
			font-size: $normal-size;
			text-align: center;
		}
		.main__account__action {
			height: 1.5em;
			font-size: $small-size;
			text-align: center;
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