<template>
	<transition-group tag="span" name="numbercounter" class="numbercounter">
		<span
			v-for="(i, idx) in getNumberString"
			:key="1 + idx"
			class="numbercounter__digits"
			:style="{ top: `-${i * 100}%` }"
		>
			<span v-for="n in 10" :key="n">{{ n - 1 }}</span>
		</span>
	</transition-group>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
	props: {
		number: { type: Number as PropType<number>, default: 0 },
	},
	data() {
		return {
			isStarted: false,
		};
	},
	mounted() {
		setTimeout(() => {
			this.isStarted = true;
		}, 500);
	},
	computed: {
		getNumberString(): string {
			if (this.isStarted) return this.number.toString();
			else
				return [...Array(this.number.toString().length)]
					.map(() => "0")
					.join("");
		},
	},
});
</script>

<style lang="scss" scoped>
.numbercounter-leave-active,
.numbercounter-enter-active {
	transition: 1.5s;
}
.numbercounter-leave-active {
	position: absolute !important;
}
.numbercounter-move {
	transition: 0.5s;
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
	font-size: 2em;
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
		transition: 1.5s;
		position: relative;
		display: inline-flex;
		flex-direction: column;
		span {
			white-space: nowrap;
			line-height: 1.5em;
		}
	}
}
</style>
