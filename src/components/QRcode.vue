<template>
	<img class="qrcode" :src="qrdata" alt="qrcode" />
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import QRCode from "qrcode";
export default Vue.extend({
	props: {
		data: { type: String as PropType<string>, default: "" },
	},
	created() {
		this.QRgenerate();
	},
	data() {
		return {
			qrdata: "" as string,
			options: {
				errorCorrectionLevel: "H",
				margin: 0,
				scale: 15,
				type: "image/png",
				quality: 1,
				color: {
					dark: "#FFFFFF",
					light: "#00000000",
				},
			} as QRCode.QRCodeOptions,
		};
	},
	watch: {
		data(value) {
			this.QRgenerate();
		},
	},
	methods: {
		QRgenerate(): void {
			QRCode.toDataURL(this.data, this.options, (err, url) => {
				this.qrdata = url;
			});
		},
	},
});
</script>

<style lang="scss" scoped>
</style>
