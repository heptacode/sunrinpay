<template>
	<div class="charge">
		<input type="text" placeholder="email" />
		<input type="text" placeholder="money" />
		<button>충전</button>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class Charge extends Vue {}
</script>

<style lang="scss" scoped>
.charge {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 480px;

    input{
        margin-bottom: 20px;
    }
}
</style>
