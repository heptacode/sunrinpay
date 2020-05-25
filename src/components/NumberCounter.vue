<template>
	<transition-group tag="span" name="numbercounter" class="numbercounter">
		<span
			v-for="(i, idx) in getNumberString"
			:key="getIndex(i,idx)"
			:class="{'numbercounter__digits':i!=',','numbercounter__digits__ap':i==','}"
			:style="{ top: i != ',' ? `-${i * 100}%` : `0%`}"
		>
			<span v-for="n in  i != ',' ? 10 : 0" :key="n">{{ n - 1 }}</span>
			<span v-if="i==','">,</span>
		</span>
	</transition-group>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
	props: {
		number: { type: Number as PropType<number>, default: 0 }
	},
	data() {
		return {
			isStarted: false
		};
	},
	mounted() {
		setTimeout(() => {
			this.isStarted = true;
		}, 100);
	},
	methods: {
		getIndex(n: string, idx: number): string {
			if (n == ",") return n + idx;
			let reg = this.getNumberString.substring(0, idx + 1).match(/,/gi);
			return (idx - (reg ? reg!.length : 0)).toString();
		}
	},
	computed: {
		getNumberString(): string {
			let numberFormatter = new Intl.NumberFormat();
			if (this.isStarted) return numberFormatter.format(this.number);
			else {
				let zeroString = [...Array(this.number.toString().length)]
					.map(() => "1")
					.join("");
				return numberFormatter
					.format(Number(zeroString))
					.replace(/1/gi, "0");
			}
		}
	}
});
</script>

<style lang="scss" scoped>
.numbercounter-leave-active,
.numbercounter-enter-active {
	transition: 1s;
}
.numbercounter-leave-active {
	position: absolute !important;
}
.numbercounter-move {
	transition: 1s;
}
.numbercounter-enter {
	opacity: 0;
	top: 0 !important;
}
.numbercounter-enter-to {
	opacity: 1;
}
.numbercounter-leave {
	opacity: 1;
}
.numbercounter-leave-to {
	opacity: 0;
	top: 0 !important;
}
.numbercounter {
	position: relative;
	height: 1.5em;

	overflow: hidden;

	display: inline-block;
	mask-image: linear-gradient(
		0deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(0, 0, 0, 1) 25%,
		rgba(0, 0, 0, 1) 75%,
		rgba(255, 255, 255, 0) 100%
	);
	-webkit-mask-image: linear-gradient(
		0deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(0, 0, 0, 1) 25%,
		rgba(0, 0, 0, 1) 75%,
		rgba(255, 255, 255, 0) 100%
	);
	.numbercounter__digits {
		height: 15em;
		transition: 1s;
		position: relative;
		display: inline-flex;
		flex-direction: column;
		span {
            flex: 1;
			white-space: nowrap;
			line-height: 1.5em;
		}
	}
}
</style>
