<template>
	<transition-group
		tag="span"
		name="numbercounter"
		class="numbercounter"
		:enter-class="getActiveClass+'-enter'"
		:leave-to-class="getActiveClass+'-leave-to'"
	>
		<span
			v-for="(i, idx) in getNumberString"
			:key="getIndex(i,idx)"
			class="numbercounter__digits"
			:class="{'no-transition':isNaN(i)}"
			:style="{ top: !isNaN(i) ? `-${(direction == 'top' ? (9-i) : i) * 100}%` : `0%`}"
		>
			<span v-for="n in  (!isNaN(i) ? 10 : 0)" :key="n">{{ direction == 'top' ? 10-n : n-1 }}</span>
			<span v-if="isNaN(i)">{{i}}</span>
		</span>
	</transition-group>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PaymentButton extends Vue {
	@Prop({ default: 0 }) number: number | undefined;
	@Prop({ default: "top" }) direction: string | undefined;

	isStarted: boolean = false;

	mounted() {
		setTimeout(() => {
			this.isStarted = true;
		}, 100);
	}

	getIndex(n: string, idx: number): string {
		if (n == ",") return n + idx;
		let reg = this.getNumberString.substring(0, idx + 1).match(/,/gi);
		return (idx - (reg ? reg!.length : 0)).toString();
	}

	get getActiveClass() {
		return this.direction == "top" ? "numbercounter-top" : "numbercounter";
	}
	get getNumberString(): string {
		if (this.number) {
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
		} else {
			return "0";
		}
	}
}
</script>

<style lang="scss" scoped>
.numbercounter-leave-active,
.numbercounter-enter-active {
	transition: top 0.75s, opacity 0.75s;
}
.numbercounter-leave-active {
	position: absolute !important;
}
.numbercounter-move {
	transition: 0.75s;
}
.numbercounter-enter {
	opacity: 0;
	top: 100% !important;
}
.numbercounter-top-enter {
	opacity: 0;
	top: -1000% !important;
}
.numbercounter-enter-to {
	opacity: 1;
}
.numbercounter-leave {
	opacity: 1;
}
.numbercounter-leave-to {
	opacity: 0;
	top: 100% !important;
}
.numbercounter-top-leave-to {
	opacity: 0;
	top: -1000% !important;
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
		transition: top 0.75s, opacity 0.75s;
		position: relative;
		display: inline-flex;
		flex-direction: column;
		span {
			flex: 1;
			white-space: nowrap;
			line-height: 1.5em;
		}
		&.no-transition {
			transition: none !important;
		}
	}
}
</style>
