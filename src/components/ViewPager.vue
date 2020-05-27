<template>
	<div class="viewpager">
		<ul class="viewpager__tabhost">
			<li
				class="viewpager__tabhost__item"
				:class="{'selected': idx == selectedIdx}"
				v-for="(tab,idx) in tab"
				@click="selectIdx(idx)"
				:key="tab"
			>{{tab}}</li>
			<div
				class="viewpager__tabhost__bar"
				:class="{'no-transition': isMoveStarted}"
				:style="{'width':`${100/tab.length}%`,'left':`calc(${100/tab.length*selectedIdx}% + ${movePosition/tab.length}px)`}"
			></div>
		</ul>
		<div
			class="viewpager__fragments__wrapper"
			@mousedown="moveStart"
			@touchstart="moveStart"
			@mousemove="moveUpdate"
			@touchmove="moveUpdate"
			@mouseup="moveStop"
			@mouseout="moveForceStop"
			@touchend="moveStop"
		>
			<ul
				class="viewpager__fragments"
				:class="{'no-transition': isMoveStarted}"
				:style="{'width':`${tab.length*100}%`,'left':`calc(-${selectedIdx*100}% - ${movePosition}px)`}"
			>
				<li class="viewpager__fragments__content" v-for="(tab,idx) in tab" :key="tab">
					<slot :name="`tab${idx}`"></slot>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
	props: {
		tab: { type: Array as PropType<string[]>, default: ["TAB"] }
	},
	data() {
		return {
			selectedIdx: 0,
			isMoveStarted: false,
			mouseStartPostiion: 0,
			mouseEndPosition: 0,
			movePosition: 0
		};
	},
	methods: {
		selectIdx(idx): void {
			this.selectedIdx = idx;
		},
		moveStart(e: TouchEvent | MouseEvent) {
			let x = 0;
			if (e instanceof TouchEvent) x = e.touches[0].clientX;
			else x = e.x;
			this.mouseStartPostiion = x;
			this.isMoveStarted = true;
		},
		moveUpdate(e: TouchEvent | MouseEvent) {
			if (this.isMoveStarted) {
				let x = 0;
				if (e instanceof TouchEvent) x = e.touches[0].clientX;
				else x = e.x;

				this.movePosition = this.mouseStartPostiion - x;
				this.mouseEndPosition = x;
			}
		},
		moveForceStop() {
			if (this.isMoveStarted) {
				this.mouseStartPostiion = 0;
				this.mouseEndPosition = 0;
				this.movePosition = 0;
				this.isMoveStarted = false;
			}
		},
		moveStop(e: TouchEvent | MouseEvent) {
			if (this.isMoveStarted) {
				let gap = 0;
				if (e instanceof TouchEvent) {
					gap = this.mouseStartPostiion - this.mouseEndPosition;
				} else {
					gap = this.mouseStartPostiion - e.x;
				}
				if (gap > 100 && this.tab.length - 1 > this.selectedIdx)
					this.selectedIdx++;
				if (gap < 100 && 0 < this.selectedIdx) this.selectedIdx--;

				this.moveForceStop();
			}
		}
	}
});
</script>

<style lang="scss" scoped>
.viewpager {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: grey;

	display: flex;
	flex-direction: column;

	-webkit-user-select: none;

	.viewpager__tabhost {
		cursor: pointer;

		position: relative;

		display: flex;
		align-items: center;
		background-color: $primary-color;
		.viewpager__tabhost__item {
			flex: 1;

			position: relative;

			padding: 20px;

			font-size: $small-size;
			font-weight: bold;
			text-align: center;
		}
		.viewpager__tabhost__bar {
			position: absolute;

			bottom: 0;
			left: 0;

			height: 5px;

			background-color: white;
			transition: left 0.2s;
			&.no-transition {
				transition: none;
			}
		}
	}
	.viewpager__fragments__wrapper {
		flex: 1;

		touch-action: none;

		position: relative;
	}
	.viewpager__fragments {
		position: absolute;

		transition: left 0.2s;
		&.no-transition {
			transition: none;
		}

		height: 100%;
		display: flex;
		.viewpager__fragments__content {
			flex: 1;
			display: inline-block;
			width: 100%;
			height: 100%;
		}
	}
}
</style>