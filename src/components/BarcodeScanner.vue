<template>
	<div class="barcodescanner">
		<button @click="acceptCamera">Camera</button>
		<v-quagga
			:onDetected="a"
			:readerSize="readerSize"
			:aspectRatio="{min:1,max:2}"
			:readerTypes="renderTypes"
			v-if="isOnCamera"
		></v-quagga>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import VueQuagga from "vue-quaggajs";
Vue.use(VueQuagga);
export default Vue.extend({
	data() {
		return {
			readerSize: {
				width: 640,
				height: 480
			},
			renderTypes: [
				"code_128_reader",
				"ean_reader",
				"ean_8_reader",
				"code_39_reader",
				"code_39_vin_reader",
				"code_93_reader"
			],
			isOnCamera: false
		};
	},
	methods: {
		a(data) {
			console.log(data);
			alert(data);
		},
		acceptCamera() {
			var handleSuccess = (stream: MediaStream) => {
				console.log("clear");
				this.isOnCamera = true;
			};

			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then(handleSuccess);
		}
	}
});
</script>

<style lang="scss" scoped>
.barcodescanner {
}
</style>