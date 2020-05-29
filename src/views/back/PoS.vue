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
					<div class="pos__viewpager__search" ref="searchList">
						<ul v-for="fl in getFilterList" :key="fl.consonant" :ref="`searchItem_${fl.consonant}`">
							<h2>{{ fl.consonant }}</h2>
							<li
								class="pos__viewpager__search__item"
								v-for="(item,idx) in fl.list"
								:key="item.name+idx"
								@click="appendSelectedItem(item)"
							>
								<div>
									<h3>{{ item.name }}</h3>
									<p>재고 {{ item.count }}</p>
								</div>
								<div>
									<h4>{{item.money.numberFormat()}}원</h4>
								</div>
							</li>
						</ul>
					</div>
					<div
						class="pos__viewpager__search__tip"
						ref="search_tip"
						@touchmove="touchSearchTip"
						@touchend="currentConsonant = ''"
					>
						<span
							v-for="consonant in getConsonantList"
							:key="consonant"
							@click="moveScroll(consonant)"
						>{{ consonant }}</span>
					</div>
					<div class="pos__viewpager__search__tiptext" v-if="currentConsonant">{{currentConsonant}}</div>
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
			<button class="pos__content__okbtn">
				<h2>계산 완료</h2>
				<p>고객에게 결제를 요청합니다.</p>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import ViewPagerVue from "../../components/ViewPager.vue";
import BarcodeScannerVue from "../../components/BarcodeScanner.vue";

import randomWords from "random-words";

import { Vue, Component } from "vue-property-decorator";

interface FilterConsonantItem {
	consonant: string;
	list: PoSItem[];
}
interface PoSItem {
	name: string;
	barcode?: string;
	count: number;
	money: number;
}
@Component({
	components: {
		ViewPager: ViewPagerVue,
		BarcodeScanner: BarcodeScannerVue
	}
})
export default class PoS extends Vue {
	// 테스트 데이터 (상품 목록)
	list: PoSItem[] = randomWords(100).map(word => {
		return {
			name: word,
			count: Math.floor(Math.random() * 100),
			money: Math.floor(Math.random() * 10000)
		};
	});
	// 선택된 목록
	selectedList: PoSItem[] = [];
	// 현 스크롤 위치 (터치 전용)
	currentConsonant: string = "";

	created() {
		// 테스트 데이터
		this.list.push({
			name: "마스크",
			count: 5,
			money: 1500,
			barcode: "8809453880519"
		});
		this.list.push({
			name: "박종훈 학생증",
			count: 4,
			money: 500,
			barcode: "S2180146"
		});
	}

	get getFilterList(): FilterConsonantItem[] {
		let result: FilterConsonantItem[] = [];
		this.list.forEach(item => {
			let consonant = this.getConsonant(item.name);
			let idx = result.findIndex(item => item.consonant == consonant);
			if (idx == -1) {
				result.push({
					consonant: consonant,
					list: [item]
				});
			} else {
				result[idx].list.push(item);
			}
		});
		return result.sort((a, b) =>
			a.consonant < b.consonant ? -1 : a.consonant > b.consonant ? 1 : 0
		);
	}

	get getConsonantList(): string[] {
		return this.getFilterList.map(item => item.consonant);
	}

	getConsonant(word: string): string {
		const f: string[] = [
			"ㄱ",
			"ㄲ",
			"ㄴ",
			"ㄷ",
			"ㄸ",
			"ㄹ",
			"ㅁ",
			"ㅂ",
			"ㅃ",
			"ㅅ",
			"ㅆ",
			"ㅇ",
			"ㅈ",
			"ㅉ",
			"ㅊ",
			"ㅋ",
			"ㅌ",
			"ㅍ",
			"ㅎ"
		];
		let uni: number = word.charCodeAt(0) - 44032;
		let fn: number = Math.floor(uni / 588);
		return f[fn] || word[0].toUpperCase();
	}

	moveScroll(consonant: string) {
		let searchList: HTMLElement = this.$refs.searchList as HTMLElement;
		let el: HTMLElement = this.$refs[
			`searchItem_${consonant}`
		][0] as HTMLElement;
		if (searchList && el) {
			searchList.scrollTo(0, el.offsetTop);
		}
	}
	touchSearchTip(e: TouchEvent) {
		let el: HTMLDivElement = this.$refs.search_tip as HTMLDivElement;
		let height = el.clientHeight - 40;

		let y = e.touches[0].clientY - el.getBoundingClientRect().y;

		let idx = Math.floor(y / (height / this.getConsonantList.length)) - 1;

		if (idx >= 0 && idx < this.getConsonantList.length) {
			this.currentConsonant = this.getConsonantList[idx];
			this.moveScroll(this.getConsonantList[idx]);
		}
	}
	appendSelectedItem(item: PoSItem) {
		let idx = this.selectedList.findIndex(i => i.name == item.name);
		if (idx == -1) {
			let copyObject = Object.assign({}, item);
			copyObject.count = 1;
			this.selectedList.push(copyObject);
		} else this.selectedList[idx].count++;
	}
	removeSelectItem(item: PoSItem) {
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

	plusItemCount(item: PoSItem) {
		item.count++;
	}
	minousItemCount(item: PoSItem) {
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
		.pos__viewpager__search {
			position: relative;

			background-color: $primary-color;

			width: 100%;
			height: 100%;

			padding: 30px 50px;

			overflow-y: auto;
			/* scroll-behavior: smooth; */
			&::-webkit-scrollbar {
				display: none;
			}
			h2 {
				margin: 20px 0;

				&:first-child {
					margin-top: 0;
				}
			}
			h2,
			h3 {
				font-size: $small-normal-size;
			}
			h4 {
				font-size: $small-up-size;
			}

			.pos__viewpager__search__item {
				display: flex;
				justify-content: space-between;
				align-items: center;

				padding: 15px 30px;

				border-radius: 24px;
				box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

				background-color: white;
				color: black;

				margin-bottom: 20px;
			}
		}
		.pos__viewpager__search__tip {
			position: absolute;
			top: 20px;
			left: 20px;

			padding: 20px 0;

			width: 20px;
			height: calc(100% - 40px);

			border-radius: 16px;
			background-color: rgba(0, 0, 0, 0.15);

			display: flex;
			align-items: center;
			flex-direction: column;

			z-index: 50;

			span {
				width: 100%;
				font-size: 0.7em;
				flex: 1;

				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.pos__viewpager__search__tiptext {
			position: absolute;
			left: 50%;
			top: 50%;

			display: flex;
			justify-content: center;
			align-items: center;

			width: 1.5em;
			height: 1.5em;

			transform: translateX(-50%) translateY(-50%);
			background-color: rgba(0, 0, 0, 0.15);

			font-size: $large-size;

			z-index: 50;
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
		.pos__content__okbtn {
			border-radius: 24px;
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
			background-color: #ffffff;
			color: #246088;

			h2 {
				font-size: $normal-size;
				font-weight: bold;
				word-break: keep-all;
			}
			p {
				font-size: $small-up-size;
				word-break: keep-all;
			}
		}
	}
}
</style>
