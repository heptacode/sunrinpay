<template>
	<div class="payment">
		<QRcode class="payment__qrcode" data="https://github.com/"></QRcode>
		<div class="payment__content">
			<h2>Sunrin Pay 결제</h2>
			<p>QR 코드를 통해 접속하여,<br />결제를 진행해주세요.</p>
			<p class="payment__content__expirationtime">2:55</p>
		</div>
		<div class="payment__actions">
			<div class="payment__actions__btn">
				<i class="material-icons">close</i>
				<p>취소하기</p>
			</div>
			<div class="payment__actions__btn">
				<i class="material-icons">hourglass_full</i>
				<p>시간 연장</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import QRcodeVue from "../components/QRcode.vue";
export default Vue.extend({
	components: {
		QRcode: QRcodeVue,
	},
});
</script>

<style lang="scss" scoped>
.payment {
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 20px;

	.payment__qrcode {
		width: 100%;
		max-width: 400px;
	}
	.payment__content {
		height: 400px;

		margin-left: 150px;

		display: flex;
		flex-direction: column;

		h2 {
			font-size: $large-size;
		}
		p {
			font-size: $normal-size;
			margin-top: 10px;
			white-space: nowrap;
		}
		p.payment__content__expirationtime {
			flex: 1;

			display: flex;
			align-items: flex-end;

			font-size: $large-size;
			font-weight: bold;
		}
	}
	.payment__actions {
		position: fixed;
		bottom: 0;
		left: 0;

		width: 100%;
		height: 200px;

		display: flex;
		justify-content: center;
		align-items: center;

		.payment__actions__btn {
			padding: 10px;
			margin: 0 60px;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			font-weight: bold;
			font-size: $small-size;
			i {
				margin-bottom: 5px;
				font-size: $small-normal-size;
			}
		}
	}
}
@media all and (max-aspect-ratio: 4/3) {
	.payment {
		.payment__qrcode {
			max-width: 350px;
		}
		.payment__content {
			height: 350px;
			font-size: 0.8rem;
			margin-left: 50px;
		}
	}
}
@media all and (max-aspect-ratio: 1/1) {
	.payment {
		overflow-y: auto !important;
		padding: 40px;

		flex-direction: column;
		justify-content: space-between;
		.payment__qrcode {
			margin-top: 20px;
		}
		.payment__content {
			height: fit-content;
			margin-left: 0;
			font-size: 0.7rem;

			h2,
			p {
				text-align: center;
			}
			p.payment__content__expirationtime {
				flex: 0;
				display: inline-block;
			}
		}

		.payment__actions {
			position: relative;
			height: auto;
			.payment__actions__btn {
				margin: 0 10px;
			}
		}
	}
}
</style>
