<template>
	<div class="sendmoney">
		<h2>TOSS 송금 QR 생성</h2>
		<form action="javascript:void(0)" @submit="generateQR">
			{{bank}}
			<input type="tel" v-model="amount" minlength="1" maxlength="6" required />
			<NumberCounter :text="amount.toString()" :isNumberFormat="true" defaultChar="0"></NumberCounter>원
			<div class="sendmoney__bank" :class="{'active':isShowBankList}">
				<span @click="selectBank('NH농협')">
					<i class="iconify" data-icon="mdi-bank"></i> NH 농협1
				</span>
				<span @click="bank = '신한은행'">
					<i class="iconify" data-icon="mdi-bank"></i> 신한은행
				</span>
				<span>
					<i class="iconify" data-icon="mdi-bank"></i> NH 농협3
				</span>
				<span>
					<i class="iconify" data-icon="mdi-bank"></i> NH 농협4
				</span>
				<span>
					<i class="iconify" data-icon="mdi-bank"></i> NH 농협5
				</span>
				<span>
					<i class="iconify" data-icon="mdi-bank"></i> NH 농협6
				</span>
				<span>
					<i class="iconify" data-icon="mdi-bank"></i> NH 농협7
				</span>
				<span>
					<i class="iconify" data-icon="mdi-bank"></i> NH 농협8
				</span>
				<span>
					<i class="iconify" data-icon="mdi-bank"></i> NH 농협9
				</span>
				<span>
					<i class="iconify" data-icon="mdi-bank"></i> NH 농협10
				</span>
			</div>
			<input
				type="text"
				v-model="accountNo"
				placeholder="계좌번호"
				minlength="6"
				required
				@focus="showBankList"
			/>
			<button type="submit">QR 생성</button>
			<button type="button" @click="showBankList(true)">은행 다시 선택</button>
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
		NumberCounter: NumberCounterVue
	}
})
export default class SendMoney extends Vue {
	amount: number = 0;
	bank: string = "";
	accountNo: string = "";
	qrData: string = "";

	isShowBankList: boolean = false;

	showBankList(important?: boolean) {
		if (!this.bank || important) this.isShowBankList = true;
	}
	hiddenBankList() {
		this.isShowBankList = false;
	}

	selectBank(bank: string) {
		this.bank = bank;
		this.hiddenBankList();
	}

	generateQR() {
		this.qrData = `supertoss://send?amount=${this.amount}&bank=${this.bank}&accountNo=${this.accountNo}`;
	}
}
</script>

<style lang="scss" scoped>
.sendmoney {
	max-width: 720px;
	form {
		width: 100%;
		.sendmoney__bank {
			position: fixed;
			max-width: 720px;
			left: 50%;
			transform: translateX(-50%);

			width: 100%;
			height: 80%;

			bottom: -80%;

			padding: 25px;
			border-radius: 25px 25px 0 0;

			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;

			background-color: $content-color;

			overflow-y: scroll;

			transition: 0.5s;

			span {
				flex: 1 1 30%;
				margin: 20px;
				padding: 30px;
				border-radius: 20px;
				background-color: $background-color;

				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				height: fit-content;

				.iconify {
					font-size: 2em;
				}
			}

			&.active {
				bottom: 0% !important;
			}
		}
	}
	.qr {
		width: 200px;
		height: 200px;
	}
}
</style>
