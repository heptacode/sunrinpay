<template>
	<div id="app">
		<router-view class="router" />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import "@/main.scss";
#app {
	width: 100%;
	height: 100%;
}
.router {
	height: 100%;
	overflow: hidden;
}
</style>
