<template>
	<div class="sendmoney">
		<form action="javascript:void(0)" @submit="generateQR">
			<input type="number" v-model="amount" min="1" max="300000" minlength="1" maxlength="6" required />
			<NumberCounter :text="amount.toString()" :isNumberFormat="true" defaultChar="0"></NumberCounter>원
			<input type="text" v-model="accountNo" placeholder="계좌번호" minlength="6" required />
			<button type="submit">QR 생성</button>
		</form>
		<br />
		<QRcode v-if="qrData" :data="qrData" class="qr"></QRcode>
	</div>
</template>

<script lang="ts">
import QRcode from "../components/QRcode.vue";
import NumberCounterVue from "vue-roller";

import { Vue, Component } from "vue-property-decorator";

@Component({
	components: {
		QRcode,
		NumberCounter: NumberCounterVue,
	},
})
export default class SendMoney extends Vue {
	amount: number = 0;
	bank: string = "";
	accountNo: string = "";
	qrData: string = "";

	generateQR() {
		this.qrData = `supertoss://send?amount=${this.amount}&bank=신한은행&accountNo=${this.accountNo}`;
	}
}
</script>

<style lang="scss" scoped>
.sendmoney {
	display: flex;
	.qr {
		width: 200px;
		height: 200px;
	}
}
</style>
