<template>
	<div class="setting">
		<div class="setting__content">
			<div class="setting__content__v">
				<div class="setting__content__title">
					<div>
						<h2><input class="editable" type="text" value="선린인터넷고등학교 매점" /></h2>
						<p><input class="editable" type="text" value="서울특별시 용산구 원효로97길 33-4" /></p>
					</div>
					<div>
						<i class="iconify" data-icon="mdi-edit"></i>
					</div>
				</div>
				<div class="setting__content__map">
					대충 지도
				</div>
				<h3>영업 시간</h3>

				<div class="setting__content__time">
					<p>
						<span>월~금</span>
						<span>07:30~16:00</span>
						<span>
							<i class="iconify" data-icon="mdi-delete"></i>
						</span>
					</p>
					<p>
						<span>월~금</span>
						<span>07:30~16:00</span>
						<span>
							<i class="iconify" data-icon="mdi-delete"></i>
						</span>
					</p>
					<p class="add">+ 영업 시간 추가하기</p>
				</div>
			</div>
			<div class="setting__content__v">
				<h3>매출 관리 지갑</h3>
				<div class="setting__content__account">
					<div class="qr">[QR]</div>
					<div>
						<h2><input class="editable" type="text" value="+123456789 (사업자)" /></h2>
						<p>잔액 123456789원</p>
					</div>
				</div>
				<h3>재고 관리 모드</h3>
				<div class="setting__content__stock">
					<label>
						<input type="radio" name="stock" value="detailed" />
						<span></span>
						<div class="content">
							<h4>상세 모드 (기본)</h4>
							<p>바코드를 인식시켜 제품을 계산할 수 있고, 재고와 매출 관리가 동시에 가능합니다.</p>
						</div>
					</label>
					<label>
						<input type="radio" name="stock" value="simple" />
						<span></span>
						<div class="content">
							<h4>간편 모드</h4>
							<p>가격만 입력하면 바로 결제가 가능해 빠르고 편리합니다. 재고 관리 메뉴가 비활성화됩니다.</p>
						</div>
					</label>
				</div>
				<h3>결제 수단</h3>
				<div class="setting__content__pay">
					<label>
						<input type="radio" name="payment" value="sunrinpay" checked disabled />
						<span></span>
						<div class="content">
							<h4>Sunrin Pay</h4>
							<p>빠르고 편리한 Sunrin Pay를 이용합니다. 카카오페이와 호환됩니다.</p>
						</div>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Setting extends Vue {}
</script>

<style lang="scss">
.setting {
	padding: 30px;
	.setting__content {
		padding: 30px;
		width: 100%;
		height: 100%;

		background-color: $content-color;

		border-radius: 24px;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

		display: flex;
		h3 {
			font-size: $small-size;
			color: $gray-text-color;
			margin-bottom: 20px;
		}
		label {
			display: flex;
			align-items: center;
			margin-bottom: 20px;

			span {
				margin-right: 10px;
			}
			.content {
				font-size: $small-up-size;
				h4 {
				}
				p {
					font-size: 0.6em;
				}
			}
		}
		.setting__content__v {
			flex: 1;
			&:nth-child(1) {
				margin-right: 30px;
			}
		}
		.setting__content__title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			h2 {
				font-size: $small-normal-size;
			}
		}
		.setting__content__map {
			height: 300px;
		}
		.setting__content__time {
			p {
				display: flex;
				justify-content: space-between;

				border-bottom: 1px solid $gray-text-color;
				padding: 10px 0;

				font-size: $small-up-size;
			}
			.add {
				color: $gray-text-color;
			}
		}
		.setting__content__account {
			display: flex;
			align-items: center;
			h2 {
				font-size: $small-normal-size;
			}
			p {
			}
			.qr {
				margin-right: 20px;
			}
			margin-bottom: 40px;
		}
		.setting__content__stock {
			margin-bottom: 40px;
		}
		.setting__content__pay {
		}
	}
}
</style>
