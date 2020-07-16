<template>
	<div class="setting">
		<div class="setting__content">
			<div class="setting__content__v">
				<div class="setting__content__title">
					<div>
						<h2>
							<input class="editable" type="text" value="선린인터넷고등학교 매점" ref="name" v-model="name" @change="update('name')" />
						</h2>
						<p>
							<input class="editable" type="text" value="서울특별시 용산구 원효로97길 33-4" ref="address" v-model="address" @change="update('address')" />
						</p>
					</div>
					<div>
						<i class="iconify" data-icon="mdi-edit"></i>
					</div>
				</div>
				<div class="setting__content__map">대충 지도</div>
				<h3>영업 시간</h3>

				<div class="setting__content__time" ref="timeset">
					<p v-for="(item, idx) in timeset" :key="idx">
						<input type="text" v-model="item.range" @change="update('timeset')" />
						<input type="text" v-model="item.time" @change="update('timeset')" />
						<span @click="removeTimesetItem(idx)" class="remove">
							<i class="iconify" data-icon="mdi-delete"></i>
						</span>
					</p>
					<p class="add" @click="addTimesetItem">+ 영업 시간 추가하기</p>
				</div>
			</div>
			<div class="setting__content__v">
				<h3>매출 관리 지갑</h3>
				<div class="setting__content__account">
					<QRcode data="test" class="qr"></QRcode>
					<div>
						<h2>
							<input class="editable" type="text" value="+123456789 (사업자)" />
						</h2>
						<p>잔액 123456789원</p>
					</div>
				</div>
				<h3>재고 관리 모드</h3>
				<div class="setting__content__stock">
					<label>
						<input type="radio" name="stock" value="detailed" v-model="mode" />
						<span></span>
						<div class="content">
							<h4>상세 모드 (기본)</h4>
							<p>바코드를 인식시켜 제품을 계산할 수 있고, 재고와 매출 관리가 동시에 가능합니다.</p>
						</div>
					</label>
					<label>
						<input type="radio" name="stock" value="simple" v-model="mode" />
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
import { Vue, Component, Watch } from "vue-property-decorator";
import QRcode from "../../components/QRcode.vue";

@Component({
	components: {
		QRcode,
	},
})
export default class Setting extends Vue {
	name: string = "";
	address: string = "";

	mode: string = "detailed";
	timeset: { range: string; time: string }[] = [];

	@Watch("mode")
	changeMode() {
		this.update("mode");
	}
	@Watch("timeset")
	changeTimeset() {
		this.update("timeset");
	}
	async created() {
		let data = await this.$store.dispatch("GET_SETTING");
		this.name = data.name;
		this.address = data.address;
		this.mode = data.mode;
		this.timeset = data.timeset;
	}
	async update(_key: string) {
		console.log(_key);
		let result = await this.$store.dispatch("UPDATE_SETTING", {
			key: _key,
			value: this[_key],
		});
		if (result) {
			let el: any = this.$refs[_key];
			if (el) {
				el.classList.add("update__success");
				setTimeout(() => el.classList.remove("update__success"), 1000);
			}
		}
	}

	addTimesetItem() {
		this.timeset.push({
			range: "요일",
			time: "시간대",
		});
	}
	removeTimesetItem(idx: number) {
		this.timeset.splice(idx, 1);
	}
}
</script>

<style lang="scss" scoped>
.update__success {
	background-color: rgba(60, 134, 123, 0.5) !important;
}
.update__error {
	background-color: rgba(194, 40, 28, 0.5) !important;
}
input {
	transition-duration: 0.3s;
}
.setting {
	padding: 30px;
	.setting__content {
		padding: 40px;
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
			transition-duration: 0.3s;
			p {
				display: flex;
				justify-content: space-between;

				border-bottom: 1px solid $gray-text-color;
				padding: 10px 0;

				font-size: $small-up-size;
			}
			.remove {
				cursor: pointer;
			}
			.add {
				color: $gray-text-color;
				cursor: pointer;
			}

			input {
				border-bottom: none;
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
				height: 100px;
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
