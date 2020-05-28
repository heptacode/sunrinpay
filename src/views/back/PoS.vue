<template>
	<div class="pos">
		<div class="pos__viewpager">
			<ViewPager :tab="['바코드 읽기', '상품 선택하여 계산', '상품 수동 입력']">
				<template v-slot:tab0>
					<div class="pos__viewpager__barcodescanner">
						<BarcodeScanner></BarcodeScanner>
					</div>
				</template>
				<template v-slot:tab1>
					<div class="pos__viewpager__search" ref="searchList">
						<ul v-for="fl in getFilterList" :key="fl.consonant" :ref="`searchItem_${fl.consonant}`">
							<h2>{{ fl.consonant }}</h2>
							<li class="pos__viewpager__search__item" v-for="item in fl.list" :key="item.name">
								<div>
									<h3>{{ item.name }}</h3>
									<p>재고 {{ item.count }}</p>
								</div>
								<div>
									<h4>5,700원</h4>
								</div>
							</li>
						</ul>
					</div>
					<div class="pos__viewpager__search__tip">
						<span
							v-for="consonant in getConsonantList"
							:key="consonant"
							@click="moveScroll(consonant)"
						>{{ consonant }}</span>
					</div>
				</template>
				<template v-slot:tab2>상품 수동 입력</template>
			</ViewPager>
		</div>
		<div class="pos__content">
			<ul class="pos__content__list">
				<li class="pos__content__list__item" v-for="idx in 20" :key="idx">
					<p class="name">(빙그레)메로나메론맛</p>
					<p class="count">×1</p>
					<p class="price">14,700원</p>
					<i class="delete material-icons">delete_forever</i>
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

	created() {}

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
}
</script>

<style lang="scss" scoped>
.pos {
	display: flex;

	flex-direction: row;
	.pos__viewpager {
		flex: 1 1 50%;

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
			scroll-behavior: smooth;
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

			span {
				font-size: 0.7em;
				flex: 1;

				display: flex;
				justify-content: center;
				align-items: center;
			}
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
				}
				.price {
					flex: 3;
					text-align: right;
				}
				.delete {
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
