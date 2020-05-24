<template>
	<div id="app">
		<router-view id="router" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss">
@import "@/main.scss";
#app {
	width: 100%;
	height: 100%;
}
#router {
	height: 100%;
	overflow: hidden;
}
</style>
