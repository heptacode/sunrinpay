<template>
	<div class="paymentclear">
		<i class="material-icons paymentclear__icon">check_circle_outline</i>
		<div class="paymentclear__content">
			<h2>결제가 완료되었습니다!</h2>
			<p>25,655원이 결제되었습니다.<br />이용해주셔서 감사합니다</p>
		</div>
		<div class="paymentclear__action">
			<i class="material-icons">receipt</i>
			<p>
				영수증 인쇄
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.paymentclear {
	color: white;
	padding: 50px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	.paymentclear__icon {
		font-size: 15rem;
	}
	.paymentclear__content {
		h2 {
			font-size: $large-size;
			text-align: center;
		}
		p {
			font-size: $normal-size;
			text-align: center;
		}
	}
	.paymentclear__action {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		p {
			font-size: $small-size;
		}
		i {
			font-size: $small-normal-size;
		}
	}
}
@media all and (max-aspect-ratio: 1/1) {
	.paymentclear {
		.paymentclear__content {
			font-size: 0.9em;
			h2 {
				white-space: nowrap;
			}
			p {
				word-break: keep-all;
				br {
					display: none;
				}
			}
		}
	}
}
@media all and (max-aspect-ratio: 3/4) {
	.paymentclear {
		.paymentclear__content {
			font-size: 0.6em;
		}
	}
}
</style>
