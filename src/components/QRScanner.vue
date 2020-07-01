<template>
	<div class="qrscanner">
		<qrcode-stream @decode="onDecode"></qrcode-stream>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
@Component({
	components: {
		QrcodeStream
	}
})
export default class QRScanner extends Vue {}
</script>

<style lang="scss" scoped>
</style>
