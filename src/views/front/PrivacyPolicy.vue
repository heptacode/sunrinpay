<template>
	<article></article>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PrivacyPolicy extends Vue {}
</script>

<style scoped>
::selection {
	background-color: rgba(39, 49, 66, 0.2);
}
::-webkit-scrollbar {
	display: block;
	width: 10px;
}
::-webkit-scrollbar-track {
	background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background: #777;
}
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
em {
	color: #9cb2cd;
}
strong {
	color: #538fff;
}
circles {
	cursor: help;
}
</style>
