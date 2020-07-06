<template>
	<div class="createstock">
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
}
</style>
