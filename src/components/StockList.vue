<template>
	<div class="stocklist">
		<div class="stocklist__list" ref="searchList">
			<ul v-for="fl in getFilterList" :key="fl.consonant" :ref="`searchItem_${fl.consonant}`">
				<h2>{{ fl.consonant }}</h2>
				<li
					class="stocklist__list__item"
					v-for="(item,idx) in fl.list"
					:key="item.name+idx"
					@click="addItem(item)"
				>
					<div>
						<h3>{{ item.name }}</h3>
						<p>재고 {{ item.quantity }}</p>
					</div>
					<div>
						<h4>{{Number(item.price).numberFormat()}}원</h4>
					</div>
				</li>
			</ul>
		</div>
		<div
			class="stocklist__tip"
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
		<div class="stocklist__tiptext" v-if="currentConsonant">{{currentConsonant}}</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { PropType } from "vue";
import { StockItem } from "../schema";

interface FilterConsonantItem {
	consonant: string;
	list: StockItem[];
}
@Component
export default class StockList extends Vue {
	currentConsonant: string = "";
	@Prop({ type: Array as PropType<StockItem[]> }) data:
		| StockItem[]
		| undefined;
	get getFilterList(): FilterConsonantItem[] {
		let result: FilterConsonantItem[] = [];
		this.data!.forEach(item => {
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
	moveScroll(consonant: string) {
		let searchList: HTMLElement = this.$refs.searchList as HTMLElement;
		let el: HTMLElement = this.$refs[
			`searchItem_${consonant}`
		][0] as HTMLElement;
		if (searchList && el) {
			searchList.scrollTo(0, el.offsetTop);
		}
	}
	addItem(item: StockItem) {
		this.$emit("add-item", item);
	}
}
</script>

<style lang="scss" scoped>
.stocklist {
	width: 100%;
	height: 100%;

	background-color: $primary-color;

	.stocklist__list {
		width: 100%;
		height: 100%;

		padding: 30px 50px;

		overflow-y: auto;

		position: relative;

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

		.stocklist__list__item {
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
	.stocklist__tip {
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
	.stocklist__tiptext {
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
</style>
