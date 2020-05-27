<template>
	<div class="pos">
		<div class="pos__viewpager">
			<ViewPager :tab="['바코드 읽기','상품 선택하여 계산','상품 수동 입력']">
				<template v-slot:tab0>
					<div class="pos__viewpager__barcodescanner">
						<BarcodeScanner></BarcodeScanner>
					</div>
				</template>
				<template v-slot:tab1>
					<ul class="pos__viewpager__search">
						<ul v-for="fl in getFilterList" :key="fl.consonant">
							<h2>{{fl.consonant}}</h2>
							<li class="pos__viewpager__search__item" v-for="item in fl.list" :key="item.name">
								<div>
									<h3>{{item.name}}</h3>
									<p>재고 {{item.count}}</p>
								</div>
								<div>
									<h4>5,700원</h4>
								</div>
							</li>
						</ul>
					</ul>
				</template>
				<template v-slot:tab2>상품 수동 입력</template>
			</ViewPager>
		</div>
		<div class="pos__list"></div>
	</div>
</template>

<script lang="ts">
import ViewPagerVue from "../../components/ViewPager.vue";
import BarcodeScannerVue from "../../components/BarcodeScanner.vue";

import { Vue, Component } from "vue-property-decorator";

interface FilterConsonantItem {
	consonant: string;
	list: any[];
}

@Component({
	components: {
		ViewPager: ViewPagerVue,
		BarcodeScanner: BarcodeScannerVue
	}
})
export default class PoS extends Vue {
	list: any[] = [
		{
			name: "가나다",
			count: 55
		},
		{
			name: "가오리",
			count: 44
		},
		{
			name: "가나",
			count: 33
		},
		{
			name: "라마바",
			count: 22
		},
		{
			name: "사아자",
			count: 11
		},
		{
			name: "abc",
			count: 5
		},
		{
			name: "def",
			count: 2
		}
	];

	created() {
		console.log(this.getFilterList);
	}

	get getFilterList(): any[] {
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
		return result;
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
}
</script>

<style lang="scss" scoped>
.pos {
	display: flex;
	.pos__viewpager {
		flex: 5;

		.pos__viewpager__barcodescanner {
			display: flex;
			justify-content: center;
			align-items: center;

			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		.pos__viewpager__search {
			background-color: $primary-color;

			width: 100%;
			height: 100%;

			padding: 30px 50px;

			overflow-y: auto;
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

				padding: 20px 40px;

				border-radius: 24px;
				box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

				background-color: white;
				color: black;

				margin-bottom: 20px;
			}
		}
	}
	.pos__list {
		flex: 6;
	}
}
</style>