<template>
	<div class="sendmoney">
		<div class="sendmoney__contentbox">
			<h2>TOSS 송금 QR 생성</h2>
			<p><NumberCounter :text="getTotal" :isNumberFormat="true" defaultChar="0"></NumberCounter>원</p>
		</div>
		<form action="javascript:void(0)" @submit="generateQR">
			<div v-if="!bank" class="sendmoney__numpad">
				<div v-for="idx in 9" :key="idx" class="sendmoney__numpad__item" @click="appendTotalStr(idx)">{{ idx }}</div>
				<div class="sendmoney__numpad__item"></div>
				<div class="sendmoney__numpad__item" @click="appendTotalStr(0)">0</div>
				<div class="sendmoney__numpad__item">
					<span @click="removeTotalStr">
						<i class="iconify" data-icon="mdi-backspace"></i>
					</span>
				</div>
			</div>
			<div class="sendmoney__bank" :class="{ active: isShowBankList }">
				<div class="sendmoney__bank__title">은행 선택</div>
				<span @click="selectBank('NH농협')"><i class="iconify" data-icon="mdi-bank"></i>NH 농협</span>
				<span @click="selectBank('KB국민')"><i class="iconify" data-icon="mdi-bank"></i>KB국민</span>
				<span @click="selectBank('신한')"><i class="iconify" data-icon="mdi-bank"></i>신한</span>
				<span @click="selectBank('우리')"><i class="iconify" data-icon="mdi-bank"></i>우리</span>
				<span @click="selectBank('하나')"><i class="iconify" data-icon="mdi-bank"></i>하나</span>
				<span @click="selectBank('IBK기업')"><i class="iconify" data-icon="mdi-bank"></i>IBK기업</span>
				<span @click="selectBank('SC제일')"><i class="iconify" data-icon="mdi-bank"></i>SC제일</span>
				<span @click="selectBank('씨티')"><i class="iconify" data-icon="mdi-bank"></i>씨티</span>
				<span @click="selectBank('KDB산업')"><i class="iconify" data-icon="mdi-bank"></i>KDB산업</span>
				<span @click="selectBank('SBI저축은행')"><i class="iconify" data-icon="mdi-bank"></i>SBI저축은행</span>
				<span @click="selectBank('새마을')"><i class="iconify" data-icon="mdi-bank"></i>새마을</span>
				<span @click="selectBank('대구')"><i class="iconify" data-icon="mdi-bank"></i>대구</span>
				<span @click="selectBank('광주')"><i class="iconify" data-icon="mdi-bank"></i>광주</span>
				<span @click="selectBank('우체국')"><i class="iconify" data-icon="mdi-bank"></i>우체국</span>
				<span @click="selectBank('신협')"><i class="iconify" data-icon="mdi-bank"></i>신협</span>
				<span @click="selectBank('전북')"><i class="iconify" data-icon="mdi-bank"></i>전북</span>
				<span @click="selectBank('경남')"><i class="iconify" data-icon="mdi-bank"></i>경남</span>
				<span @click="selectBank('부산')"><i class="iconify" data-icon="mdi-bank"></i>부산</span>
				<span @click="selectBank('수협')"><i class="iconify" data-icon="mdi-bank"></i>수협</span>
				<span @click="selectBank('제주')"><i class="iconify" data-icon="mdi-bank"></i>제주</span>
				<span @click="selectBank('저축은행')"><i class="iconify" data-icon="mdi-bank"></i>저축은행</span>
				<span @click="selectBank('신림조합')"><i class="iconify" data-icon="mdi-bank"></i>신림조합</span>
				<span @click="selectBank('케이뱅크')"><i class="iconify" data-icon="mdi-bank"></i>케이뱅크</span>
				<span @click="selectBank('카카오뱅크')"><i class="iconify" data-icon="mdi-bank"></i>카카오뱅크</span>
				<span @click="selectBank('HSBC')"><i class="iconify" data-icon="mdi-bank"></i>HSBC</span>
				<span @click="selectBank('중국공상')"><i class="iconify" data-icon="mdi-bank"></i>중국공상</span>
				<span @click="selectBank('JP모간')"><i class="iconify" data-icon="mdi-bank"></i>JP모간</span>
				<span @click="selectBank('도이치')"><i class="iconify" data-icon="mdi-bank"></i>도이치</span>
				<span @click="selectBank('BNP파리바')"><i class="iconify" data-icon="mdi-bank"></i>BNP파리바</span>
				<span @click="selectBank('BOA')"><i class="iconify" data-icon="mdi-bank"></i>BOA</span>
				<span @click="selectBank('중국건설')"><i class="iconify" data-icon="mdi-bank"></i>중국건설</span>
			</div>
			<button v-if="!bank" type="button" @click="showBankList(true)">승인</button>
			<div v-else class="sendmoney__input">
				<div @click="showBankList(true)">
					<input type="text" :value="bank || '은행 선택'" readonly /><span class="chevron_down"><i class="iconify" data-icon="mdi-chevron-down"></i></span>
				</div>
				<input type="tel" v-model="accountNo" placeholder="계좌번호" minlength="6" required @keydown="qrData = ''" />
				<button v-if="accountNo" type="submit">QR 생성</button>
			</div>
			<br />
			<QRcode v-if="qrData && accountNo" :data="qrData" class="qr"></QRcode>
		</form>
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
	totalString: string = "";

	isShowBankList: boolean = false;

	get getTotal() {
		return this.totalString;
	}
	appendTotalStr(str: string | number) {
		this.totalString = this.totalString + str;
	}
	removeTotalStr() {
		this.totalString = this.totalString.substring(0, this.totalString.length - 1);
	}

	showBankList(important?: boolean) {
		if (!this.bank || important) this.isShowBankList = true;
	}

	selectBank(bank: string) {
		this.bank = bank;
		this.isShowBankList = false;
	}

	generateQR() {
		this.qrData = `supertoss://send?amount=${this.amount}&bank=${this.bank}&accountNo=${this.accountNo}`;
	}
}
</script>

<style lang="scss" scoped>
.sendmoney {
	max-width: 720px;
	text-align: center;
	.sendmoney__contentbox {
		margin-top: 30px;
		h3 {
			font-size: $small-up-size;
		}
		p {
			display: flex;
			justify-content: center;
			font-size: $large-size;
		}
	}
	.sendmoney__input {
		max-width: 720px;
		div {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			.chevron_down {
				padding: 10px 0;
				border-bottom: 1px solid $text-color;
			}
		}
		input {
			margin-top: 10px;
		}
		input[type="text"] {
			cursor: pointer;
			margin-top: 10px;
		}
	}
	button {
		margin-top: 20px;
	}
	form {
		width: 100%;
		.sendmoney__numpad {
			width: 100%;
			max-width: 50%;

			margin: 0 auto;
			margin-top: 40px;

			display: flex;
			flex-wrap: wrap;

			.sendmoney__numpad__item {
				flex: 1 33%;
				width: 1.5em;
				height: 1.5em;

				display: flex;
				justify-content: center;
				align-items: center;

				font-size: $large-size;
				i {
					font-size: 0.7em;
					color: $gray-text-color;
				}
			}
		}
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
			box-shadow: 0 -6px 10px rgba(10, 10, 10, 0.3);

			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;

			background-color: $content-color;

			overflow-y: scroll;

			transition: 0.5s;

			z-index: 10;

			.sendmoney__bank__title {
				flex: 1 1 100%;
				margin-left: 10px;
				text-align: left;
			}

			span {
				cursor: pointer;

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
