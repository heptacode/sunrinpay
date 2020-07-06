<template>
	<div class="sendmoney">
		<h2>TOSS 송금 QR 생성</h2>
		<form action="javascript:void(0)" @submit="generateQR">
			<input type="number" v-model="amount" min="1" max="300000" minlength="1" maxlength="6" required />
			<NumberCounter :text="amount.toString()" :isNumberFormat="true" defaultChar="0"></NumberCounter>원
			<div class="sendmoney__bank">
				<div>
					<span @click="bank = 'NH농협'"><i class="iconify" data-icon="mdi-bank"></i> NH 농협1</span>
					<span @click="bank = '신한은행'"><i class="iconify" data-icon="mdi-bank"></i> 신한은행</span>
					<span><i class="iconify" data-icon="mdi-bank"></i> NH 농협3</span>
				</div>
				<div>
					<span><i class="iconify" data-icon="mdi-bank"></i> NH 농협4</span>
					<span><i class="iconify" data-icon="mdi-bank"></i> NH 농협5</span>
					<span><i class="iconify" data-icon="mdi-bank"></i> NH 농협6</span>
				</div>
				<div>
					<span><i class="iconify" data-icon="mdi-bank"></i> NH 농협7</span>
					<span><i class="iconify" data-icon="mdi-bank"></i> NH 농협8</span>
					<span><i class="iconify" data-icon="mdi-bank"></i> NH 농협9</span>
				</div>
			</div>
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
		this.qrData = `supertoss://send?amount=${this.amount}&bank=${this.bank}&accountNo=${this.accountNo}`;
	}
}
</script>

<style lang="scss" scoped>
.sendmoney {
	// display: flex;
	form {
		width: 100%;
		.sendmoney__bank {
			display: flex;
			flex-direction: column;
			background-color: #1f2026;
			width: 100%;
			// justify-content: space-between;
			div {
				justify-content: space-between;
				align-items: center;
			}
		}
	}
	.qr {
		width: 200px;
		height: 200px;
	}
}
</style>
