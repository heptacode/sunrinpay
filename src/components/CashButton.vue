<template>
	<button class="cashbtn">
		<h2 class="cashbtn__title">현금 결제</h2>
		<p class="cashbtn__content">현금영수증 발급</p>
	</button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.cashbtn {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: $disable-color;
	font-size: $normal-size;
	.cashbtn__title {
		font-weight: bold;
		word-break: keep-all;
	}
	.cashbtn__content {
		font-size: 0.6em;
		word-break: keep-all;
	}
}
</style>
