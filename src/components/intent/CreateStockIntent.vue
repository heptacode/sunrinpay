<template>
	<div class="createstock">
		<div class="createstock__popup">
			<input type="text" placeholder="이름" />
		</div>
		<!-- TODO: 디자인 필요 -->
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class CreateStock extends Vue {}
</script>

<style lang="scss" scoped>
.createstock {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	background-color: rgba(0, 0, 0, 0.2);

	z-index: 1000;

	display: flex;
	justify-content: center;
	align-items: center;

	.createstock__popup {
		background-color: $content-color;

		padding: 30px;

		min-width: 400px;
		height: 300px;

        border-radius: 25px;

		input {
			width: 100%;
			background: none;
			border: none;
			outline: none;
			border-bottom: 1px solid white;
		}
	}
}
</style>
