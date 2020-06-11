<template>
	<div class="pos">
		<div class="pos__viewpager">
			<ViewPager :tab="['바코드 읽기', '상품 선택하여 계산', '상품 수동 입력']">
				<template v-slot:tab0>
					<div class="pos__viewpager__barcodescanner">
						<BarcodeScanner :onDetected="onDetected"></BarcodeScanner>
					</div>
				</template>
				<template v-slot:tab1>
					<StockList :data="list" @add-item="appendSelectedItem"></StockList>
				</template>
				<template v-slot:tab2>상품 수동 입력</template>
			</ViewPager>
		</div>
		<div class="pos__content">
			<ul class="pos__content__list">
				<li class="pos__content__list__item" v-for="item in selectedList" :key="item.name">
					<p class="name">{{item.name}}</p>
					<div class="count">
						<button class="count__action count__action__minous" @click="minousItemCount(item)">-</button>
						<p>×{{item.count}}</p>
						<button class="count__action count__action__plus" @click="plusItemCount(item)">+</button>
					</div>
					<p class="price">{{item.money.numberFormat()}}</p>
					<i class="delete material-icons" @click="removeSelectItem(item)">delete_forever</i>
				</li>
			</ul>
			<PaymentRequireButton></PaymentRequireButton>
		</div>
	</div>
</template>

<script lang="ts">
import ViewPagerVue from "../../components/ViewPager.vue";
import BarcodeScannerVue from "../../components/BarcodeScanner.vue";

import randomWords from "random-words";

import { Vue, Component } from "vue-property-decorator";
import StockListVue from "../../components/StockList.vue";
import { StockItem } from "../../schema";
import PaymentRequireButtonVue from "../../components/PaymentRequireButton.vue";

@Component({
	components: {
		ViewPager: ViewPagerVue,
		BarcodeScanner: BarcodeScannerVue,
		StockList: StockListVue,
		PaymentRequireButton: PaymentRequireButtonVue
	}
})
export default class PoS extends Vue {
	// 테스트 데이터 (상품 목록)
	list: StockItem[] = randomWords(100).map(word => {
		return {
			name: word,
			count: Math.floor(Math.random() * 100),
			price: Math.floor(Math.random() * 10000)
		};
	});
	// 선택된 목록
	selectedList: StockItem[] = [];
	// 현 스크롤 위치 (터치 전용)
	currentConsonant: string = "";

	created() {
		// 테스트 데이터
		this.list.push({
			name: "마스크",
			count: 5,
			price: 1500,
			barcode: "8809453880519"
		});
		this.list.push({
			name: "박종훈 학생증",
			count: 4,
			price: 500,
			barcode: "S2180146"
		});
	}

	appendSelectedItem(item: StockItem) {
		let idx = this.selectedList.findIndex(i => i.name == item.name);
		if (idx == -1) {
			let copyObject = Object.assign({}, item);
			copyObject.count = 1;
			this.selectedList.push(copyObject);
		} else this.selectedList[idx].count++;
	}
	removeSelectItem(item: StockItem) {
		this.selectedList.splice(
			this.selectedList.findIndex(i => i.name == item.name),
			1
		);
	}
	onDetected(result: string) {
		let idx = this.list.findIndex(item => item.barcode == result);
		if (idx != -1) {
			let beep = new Audio(require("@/assets/beep.mp3"));
			beep.play();
			this.appendSelectedItem(this.list[idx]);
		}
	}

	plusItemCount(item: StockItem) {
		item.count++;
	}
	minousItemCount(item: StockItem) {
		item.count--;
		if (item.count <= 0) this.removeSelectItem(item);
	}
}
</script>

<style lang="scss" scoped>
.pos {
	display: flex;

	flex-direction: row;
	.pos__viewpager {
		flex: 1 1 50%;
		color: white;

		.pos__viewpager__barcodescanner {
			display: flex;
			justify-content: center;
			align-items: center;

			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	}
	.pos__content {
		flex: 1 1 50%;

		display: flex;
		flex-direction: column;

		overflow-y: scroll;

		padding: 50px;
		box-sizing: border-box !important;
		.pos__content__list {
			flex: 1;
			overflow-y: auto;
			margin-bottom: 50px;
			.pos__content__list__item {
				display: flex;
				justify-content: space-between;
				font-size: $small-up-size;

				padding: 10px;

				.name {
					flex: 5;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.count {
					flex: 1;

					display: flex;
					justify-content: center;
					align-items: center;

					.count__action {
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: rgba(88, 88, 88, 0.25);
					}
					.count__action__plus {
						width: 50px;
						height: 50px;

						margin-left: 20px;
					}
					.count__action__minous {
						width: 50px;
						height: 50px;

						margin-right: 20px;
					}
				}
				.price {
					flex: 3;
					text-align: right;
				}
				.delete {
					cursor: pointer;

					display: flex;
					justify-content: center;
					align-items: center;

					color: red;
					font-size: 1.1em;

					margin-left: 20px;
				}
			}
		}
	}
}
</style>
